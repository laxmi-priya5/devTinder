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
            res.cookie("token", token, {
            httpOnly: true,
            secure: true,        // REQUIRED (HTTPS)
            sameSite: "None",    // REQUIRED (cross-site)
            expires: new Date(Date.now() + 8 * 3600000),
            });

           
            res.send(user);
            
         }else{
            throw new Error("invalid credentials");
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
        const savedUser = await user.save();
        const token = await savedUser.getjwt(); //method from user model
            res.cookie("token",token, {
               expires:new Date(Date.now()+8*3600000)
                });
           
            // res.send(user);
        res.json({message:"user added successfully", data:savedUser});
   }catch(error){
    // res.status(400).send("error in adding user");
     res.status(400).send("ERROR:"+ error.message);
   }

})

authRouter.post("/logout" , (req,res)=>{
   try{
     res
    .cookie("token",null,{expires:new Date(Date.now())})
    .send("logout successful");
   }catch(err){
      res.status(400).send("ERROR:"+ err.message);
   }
    
})

module.exports = {authRouter};