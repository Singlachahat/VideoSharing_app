import express from "express"
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"


const router= express.Router()

//create a video
router.post("/", verifyJWT,addVideo)
router.put("/:id", verifyJWT,updateVideo )
router.delete("/:id", verifyJWT,deleteVideo )
router.get("/find/:id", getVideo )
router.put("/view/:id", addView )
router.get("/trend", trend )
router.get("/random", random )
router.get("/sub",verifyJWT, sub)
router.get("/tags", getByTag)
router.get("/search", search)

export default router