import User from "../models/User.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/AsyncHandler.js"

export const update= asyncHandler( async(req, res,next)=>{
    if(req.params.id=== req.user.id){
        try {
            const updatedUser= await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
            {
                new: true
            }
        )
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)   
        }
    }
    else {
        return next( new ApiError(403, "You can only update your accout"))
    }
})
export const deleteUser= asyncHandler( async(req, res,next)=>{
    if(req.params.id=== req.user.id){
        try {
            const updatedUser= await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted")
        } catch (error) {
            next(error)   
        }
    }
    else {
        return next( new ApiError(403, "You can delete only your accout"))
    }
})

export const getUser= asyncHandler(async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(err)
    }
})
export const subscribe= asyncHandler(async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers: req.params.id} 
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        });
        res.status(200).json("Subscription successful")
    } catch (error) {
        next(error)
    }

})
export const unsubscribe= asyncHandler(async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers: req.params.id} 
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        });
        res.status(200).json("Unsubscription successful")
    } catch (error) {
        next(error)
    }

})
export const like= asyncHandler(async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }

})
export const dislike= asyncHandler(async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }

})
