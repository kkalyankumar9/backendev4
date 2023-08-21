const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
        name : String,
        email :String,
        gender : String,
        password :String,
        age: Number,
        city :String,
        is_married : Boolean,
},{
    VersionKey:false
})

const UserModels=new mongoose.model("users",userSchema)

module.exports={UserModels}