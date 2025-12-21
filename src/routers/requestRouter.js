const express = require("express");
const {userAuth} = require("../middlewares/auth");
const requestRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
const { connection } = require("mongoose");
const User = require('../models/user');

requestRouter.post("/request/send/:status/:userId",userAuth,async(req , res)=>{
    try{
         const fromUserId = req.user._id // comes from userAuth middleware
         const toUserId = req.params.userId;
         const status = req.params.status;
         
         const allowedStatus = ["interested","ignored"];
         
         // check to which you send request is that user exist or not  in database
         const toUser = await User.findById(toUserId);
         if(!toUser){
            return res.status(404).send("ERROR:User not found");
         }

         //prevent user from sending request to himself
         if(fromUserId.toString() === toUserId ){
            return res.status(400).send("ERROR:Cannot send request to yourself");
         }

         // restrict status to only "interested" or "ignored" when sending request
         if(!allowedStatus.includes(status)){  
              return res.status(400).send("ERROR: Invalid status type");    
         }

         // check if a request already exists between the two users
         const existingRequest = await connectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
         })
         if(existingRequest){
            return res.status(400).send("ERROR:Request alreay exists");
         }
         const newRequest = new connectionRequest({
            fromUserId,
            toUserId,
            status
         });
         console.log(newRequest);
         const data = await newRequest.save();
         
         res.json({
            message:"Request sent successfully",
            data,
         })
    }catch(err){
        res.status(400).send("ERROR:"+ err.message);
    }
})



module.exports = {requestRouter}; 

//handle case for user not found 
//handle if toUserId and fromUserId is same 
// when check for fromUserId and toUserId then make it compound index to make it faster and do this in model file 