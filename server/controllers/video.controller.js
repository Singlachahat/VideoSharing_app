import { asyncHandler } from "../utils/AsyncHandler.js";
import Video  from "../models/Video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/User.model.js"

export const addVideo = asyncHandler(async(req,res,next)=>{
    const newVideo = new Video({userId: req.user.id , ...req.body});
    try {
        const savedVideo= await newVideo.save()
        res.status(200)
        .json(savedVideo)
    }
     catch (error) {
        next(error)
    }
})

export const updateVideo = asyncHandler(async(req,res,next)=>{
    try {
        const video= await Video.findById(req.params.id)
        if(!video){
            return next(new ApiError(404, "Video not found"))
        }
        if(req.user.id=== video.userId){
            const updatedVideo= await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                {new: true}
            );
            res.status(200)
            .json(updatedVideo)
        }
        else{
            return next(new ApiError(403, "You can update only your video"))
        }
    } catch (error) {
        next(error)
    }
})

export const deleteVideo = asyncHandler(async(req,res,next)=>{
    try {
        const video= await Video.findById(req.params.id)
        if(!video){
            return next(new ApiError(404, "Video not found"))
        }
        if(req.user.id=== video.userId){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200)
            .json("the video has been deleted")
        }
        else{
            return next(new ApiError(403, "You can delete only your video"))
        }
    } catch (error) {
        next(error)
    }
})

export const getVideo = asyncHandler(async(req,res,next)=>{
    try {
        const video= await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
})

export const addView = asyncHandler(async(req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,
            {
                $inc:{views:1}
            }
        )
        res.status(200).json("The view has been increased")
    } catch (error) {
        next(error)
    }
})

export const random = asyncHandler(async(req,res,next)=>{
    try {
        const videos= await Video.aggregate([{
            $sample: {size:40}
        }])
        res.status(200).json(new ApiResponse(videos))
    } catch (error) {
        next(error)
    }
})

export const trend = asyncHandler(async(req,res,next)=>{
    try {
        const videos= await Video.find().sort(
            {
                views:-1 
            }
        )
        res.status(200).json(new ApiResponse(videos))
    } catch (error) {
        next(error)
    }
})

export const sub = asyncHandler(async(req,res,next)=>{
    try {
        const user= await User.findById(req.user.id)
        const subscribedChannels= user.subscribedUsers

        const list = await Promise.all(
            subscribedChannels.map(async(channelId)=>{
                return await Video.find({userId: channelId})
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        next(error)
    }
})

export const getByTag = asyncHandler(async(req,res,next)=>{
    const tags= req.query.tags.split(",")
    try {
        const videos= await Video.find({tags: {$in: tags}}).limit(20)
        res.status(200).json(new ApiResponse(videos))
    } catch (error) {
        next(error)
    }
})
 
export const search = asyncHandler(async(req,res,next)=>{
    const query= req.query.q
    //console.log(tags)
    try {
        const videos= await Video.find({title:{
            $regex: query, $options:"i"
        }}).limit(40)
        res.status(200).json(new ApiResponse(videos))
    } catch (error) {
        next(error)
    }
})

