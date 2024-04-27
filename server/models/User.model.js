import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    },
    img:{
        type:String
    },
    subscribers:{
        type: Number,
        default:0
    },
    subscribedUsers:{
        type: [String]
    },
    refreshToken:{
        type: String
    }

},{
    timestamps: true
})

//before saving , it will encrypt password
UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password, 10);
    next()
})

//frontend password = encrypted
UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateAccessToken= function(){
    return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        name: this.name  
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
UserSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id: this._id,  
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

export default mongoose.model("User", UserSchema)
