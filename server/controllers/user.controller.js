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

export const getUser= (req, res,next)=>{
    
}
export const subscribe= (req, res,next)=>{
    
}
export const unsubscribe= (req, res,next)=>{
    
}
export const like= (req, res,next)=>{
    
}
export const dislike= (req, res,next)=>{
    
}

