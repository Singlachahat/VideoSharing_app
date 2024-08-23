import express from "express"
import { googleAuth, signup } from "../controllers/auth.controller.js"
import {signin} from "../controllers/auth.controller.js"
const router= express.Router()

//create a user
router.post("/signup", signup)

//signin
router.post("/signin", signin )

//google auth
router.post("/google", googleAuth)

export default router