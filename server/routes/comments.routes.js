import express from "express"
import { addComment, deleteComment, getComments } from "../controllers/comment.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router= express.Router();

router.post("/",verifyJWT, addComment) 
router.delete("/:id",verifyJWT, deleteComment) 
router.get("/:videoId", getComments) 


export default router