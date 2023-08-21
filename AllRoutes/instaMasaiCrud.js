const express=require("express")
const { InstaModels } = require("../models/instaMasaiModel")
const { auth } = require("../middleWare/auth")

const instaMasai=express.Router()
instaMasai.get("/posts",auth,async(req,res)=>{


    try {
        
        const data=await InstaModels.find({userId:req.body.userId})
        res.status(200).send(data)
        
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})
instaMasai.post("/posts/add",auth,async(req,res)=>{
    
    try {
        const data=new InstaModels(req.body)
        await data.save()
        res.status(200).send({"msg":"Data posted Successfully",data:data})
        
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})

instaMasai.patch("/posts/update/:id",auth,async(req,res)=>{
    const {id}=req.params
    const data=await InstaModels.findOne({_id:id})
    try {
        if(data.userId!==req.body.userId){
            res.status(400).send({"msg":"please check id"})
        }else{
           const data= await InstaModels.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"Data updated Successfully","data":data})

        }
       
        
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})
instaMasai.delete("/posts/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
    const data=await InstaModels.findOne({_id:id})
    try {
        if(data.userId!==req.body.userId){
            res.status(400).send({"msg":"please check id"})
        }else{
           const data= await InstaModels.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":`Data deleted Successfully id:${id}`,"data":data})

        }
       
        
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})


module.exports={instaMasai}
