const express=require("express")
const {  connects } = require("./.db")
const { userRoute } = require("./AllRoutes/userRoute")
const { instaMasai } = require("./AllRoutes/instaMasaiCrud")


const app=express()
app.use(express.json())
app.use("/users",userRoute)
app.use("/",instaMasai)

app.listen(8080,async()=>{
    try {
        await connects
        console.log("DB connected")
        console.log("Server Running port at 8080")
    } catch (error) {
        console.log(error)
    }
})