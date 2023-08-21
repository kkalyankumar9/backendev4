const mongoose=require("mongoose")
require("dotenv").config()

const connects=mongoose.connect(process.env.url)

module.exports={connects}

