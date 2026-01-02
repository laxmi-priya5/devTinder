const express= require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {ValidateEditProfile} = require("../utils/validation");
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{  
    const user = req.user;

    if(!user){
        throw new Error("user not found");
    }
     res.send(user);
    // res.send("reading cookies");
      }catch(error){ 
        return res.status(401).send("ERROR:"+ error.message);
      }

}) 

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{ 
        if(!ValidateEditProfile(req)){
            throw new Error("invalid fields for edit");
        }
        const user = req.user;
       
        Object.keys(req.body).forEach((key)=>{
            user[key]=req.body[key];
        })
        console.log(user)
        await user.save();
        res.json({
            message:"profile edited successfully",
            user
        });
    

        
    }catch(error){
        res.status(400).send("ERROR:"+ error.message);
    }
})

module.exports={profileRouter};