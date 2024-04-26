import mongoose from "mongoose"
import bcrypt from "bcryptjs"

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

export default mongoose.model("User", UserSchema)
