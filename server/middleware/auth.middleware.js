import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import jwt from "jsonwebtoken"
import User  from "../models/User.model.js"


export const verifyJWT= asyncHandler(async(req,_,next)=>{
    try {
            const cookies = req.headers.cookie.split(';');

            // Loop through the cookies to find the accessToken
            let accessToken;
            cookies.forEach(cookie => {
            const [key, value] = cookie.trim().split('=');
            if (key === 'accessToken') {
                accessToken = value;
            }
            });

        console.log(accessToken);
        const token= accessToken
        
        // console.log(req.body)
        // console.log(token)
        // console.log(cookie)
        if(!token) {
            throw new ApiError(401, "Unauthorised request")
        }
    
        const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401 ,"Invalid Access Token")
        }
    
        req.user= user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})