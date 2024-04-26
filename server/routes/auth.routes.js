import express from "express"
import { signup } from "../controllers/auth.controller.js"

const router= express.Router()


//create a user
router.post("/signup", signup)

//signin
router.post("/signin", )

//google auth
router.post("/google", )

export default router