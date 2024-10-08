import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./server/routes/user.routes.js"
import commentRoutes from "./server/routes/comments.routes.js"
import videoRoutes from "./server/routes/videos.routes.js"
import authRoutes from "./server/routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app= express()
dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

const connect=  ()=>{
     mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((err)=>{ 
        throw err;
    })
};

app.use(express.json())
app.use("/api/auth.routes", authRoutes)
app.use("/api/user.routes", userRoutes)
app.use("/api/videos.routes", videoRoutes)
app.use("/api/comments.routes", commentRoutes)
app.use(cookieParser)
app.listen(8800,()=>{
     connect()
    console.log("Connected to server!")
})
