import { asyncHandler } from "../utils/AsyncHandler.js";
import Comment from "../models/Comments.model.js"
import Video from "../models/Video.model.js"
import { ApiError } from "../utils/ApiError.js";

const addComment = asyncHandler(async(req,res,next)=>{
    const newComment= new Comment({...req.body, userId: req.user.id})
    try {
        const savedComment= await newComment.save()
        res.status(200).send(savedComment)
    } catch (error) {
        next(error)
    }
})

const deleteComment = asyncHandler(async(req,res,next)=>{
    try {
        const comment= await Comment.findbyId(req.params.id)
        const video= await Video.findbyId(req.params.id)

        if(req.user.id=== comment.userId || req.user.id===video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been deleted.")
        }
        else{
            return next(new ApiError(403, "you can delete only your comment!"))
        }
    } catch (error) {
        next(error)
    }
})

const getComments = asyncHandler(async(req,res,next)=>{
    try {
        const comments= await Comment.find({videoId: req.params.videoId})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
})

export {addComment,deleteComment,getComments}

