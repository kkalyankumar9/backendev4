const express=require("express")
const bcrypt = require('bcrypt');
const { UserModels } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { Blacklistmodel } = require("../models/blacklist");
const userRoute=express.Router()

userRoute.post("/register",async(req,res)=>{

    const {name,email,gender,password,age,city,is_married}=req.body
 
    try {
        const userdata=await UserModels.find({email})
        if(userdata.length){
           return res.status(400).send({"msg":"User already exist, please login"})
        }else{
            bcrypt.hash(password, 2, async(err, hash) =>{
                // Store hash in your password DB.
                if(err){
                    res.status(400).send({"err":err})
                }else{
                    const data=new UserModels({name,email,gender,password:hash,age,city,is_married})
                    await data.save()
                    console.log(data)
                    res.status(200).send({"msg":"User Register successfully!","data":data})
                }
            });
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModels.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result) =>{
                if(err){
                    res.status(400).send({"msg":"user not found"})
                }else{
                    const token = jwt.sign({ userId:user._id,user:user.name }, 'masai',{expiresIn:"7 days"});
                    res.status(200).send({"msg":"User login successfully!","token":token})

                }
             
            });
        }
        
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})
userRoute.get("/logout",async(req,res)=>{
    try {
        const headers=req.headers.authorization
        if(headers){
            console.log(headers)
            await Blacklistmodel.updateMany({},{$push:{blacklist:[headers]}})
            res.status(200).send({"msg":"logout successfully"})
        }else{
            res.status(400).send({"msg":"please check header"})
        }
        
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

module.exports={userRoute}
