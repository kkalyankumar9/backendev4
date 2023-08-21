const mongoose=require("mongoose")
const blacklistSchema=mongoose.Schema({
    blacklist:{type:[String]}
})

const Blacklistmodel=new mongoose.model("blacklistdata",blacklistSchema)

module.exports={Blacklistmodel}