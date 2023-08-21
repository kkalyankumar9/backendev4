const jwt = require('jsonwebtoken');
const { Blacklistmodel } = require('../models/blacklist');

const auth=async(req,res,next)=>{
    const headers=req.headers.authorization
    try {
        if(headers){
        const blacklisttoken=await Blacklistmodel.find({blacklist:{$in:headers}})
        if(blacklisttoken.length>0){
         return  res.send({"msg":"Please Login again!!"})
        }
        jwt.verify(headers,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId
                req.body.user=decoded.user
                next()
            }else{
                res.status(400).send({"err":"please login again"})
            }
        })
        }
        
    } catch (error) {
        
    }


}
module.exports={auth}