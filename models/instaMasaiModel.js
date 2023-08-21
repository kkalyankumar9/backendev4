const mongoose=require("mongoose")

const instaSchema=mongoose.Schema({
    title :String,
    body :String,
    device : String,
    no_of_comments : Number,
    userId:String,
    user:String
},{
    VersionKey:false
})

const InstaModels=new mongoose.model("instadata",instaSchema)

module.exports={InstaModels}