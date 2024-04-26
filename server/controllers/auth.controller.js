import mongoose from "mongoose"
import User from "../models/User.model.js"
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const signup = async(req,res)=>{
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
}