import mongoose from "mongoose"
import User from "../models/User.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


const generateAccessAndRefreshTokens= async(userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken= user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken= refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken,refreshToken}
    } catch(error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const signup = asyncHandler(async(req,res)=>{
    const {name, email, password}= req.body;
    if(
        [name,email, password].some((field)=>
        field?.trim()==="" )
    ){
        throw new ApiError(400, "All fields are mandatory")
    }

    const existedUser= await User.findOne({
        $or: [{email}, {name}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or name already exists")
    }

    const user=await User.create({
        name,
        email,
        password
    })

    const createdUser= await User.findById(user._id).select(
        "-password "
    ) 

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

const signin= asyncHandler(async(req,res)=>{
    const {name, email,password}= req.body

    if(!(name && password)){
        throw new ApiError(400, "Username and password is required")
    }

    const user= await User.findOne({
        $or: [{name}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid= await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }
    const {accessToken, refreshToken}= await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options= {
        httpOnly:true,
        secure:false,
        SameSite : 'None',
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser, accessToken,refreshToken
            },
            "User logged in successfully"
        )
    )
})
const googleAuth= async(req,res,next)=>{
     try {
        const user=await User.findOne({email:req.body.email})
        if(user){
            const {accessToken, refreshToken}= await generateAccessAndRefreshTokens(user._id)
            res
            .cookie("access_token", accessToken, {
              httpOnly: true,
            })
            .status(200)
            .json(user._doc);
        }
        else{    
            const newUser= new User({
                ...req.body, 
                fromGoogle:true,
            });
            const savedUser = await newUser.save();
            const {accessToken, refreshToken}= await generateAccessAndRefreshTokens(savedUser._id)
            res
            .cookie("access_token", accessToken, {
            httpOnly: true,
            })
            .status(200)
            .json(savedUser._doc);
            }
     } catch (error) {
        next(error)
     }
}
export {signup, signin,generateAccessAndRefreshTokens,googleAuth}