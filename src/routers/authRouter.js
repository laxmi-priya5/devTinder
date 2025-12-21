const express = require("express");
const {ValidateSignup} = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/login",async (req,res)=>{ 
    const {emailId , password}=req.body;
    try{
         const user = await User.findOne({emailId:emailId});
         if(!user){
            throw new Error("user not found");
         }
         const isPasswordValid = await user.validatePassword(password);  //method from user model
         if(isPasswordValid){
            const token = await user.getjwt(); //method from user model
            res.cookie("token",token);
            res.send("login successful");
         }else{
            throw new Error("invalid password");
         }
    }catch(error){
          res.status(400).send("ERROR:" +error.message) 
    }
})

authRouter.post("/signup",async (req , res)=>{
    
   
   try{
       
        ValidateSignup(req);  
        
        const {firstName,lastName,emailId,password} = req.body;
        const hassedPassword = await bcrypt.hash(password,10);
        const user = new User({firstName,lastName,emailId,password:hassedPassword});
        await user.save();
        res.send("added successfully");
   }catch(error){
    // res.status(400).send("error in adding user");
     res.status(400).send("ERROR:"+ error.message);
   }

})

authRouter.post("/logout" , (req,res)=>{
    res
    .cookie("token",null,{expires:new Date(Date.now())})
    .send("logout successful");
})

module.exports = {authRouter};