import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router= express.Router()

//update a user
router.put("/:id",verifyJWT, update)

//delete a user
router.delete("/:id",verifyJWT,deleteUser)

//get a user
router.get("/find/:id",getUser)

//subscribe a user
router.put("/sub/:id",verifyJWT,subscribe)

//unsubscribe a user
router.put("/unsub/:id",verifyJWT,unsubscribe)

//like a video
router.put("/like/:videoId",verifyJWT,like)

//unlike a video
router.put("/dislike/:videoId",verifyJWT,dislike)


export default router