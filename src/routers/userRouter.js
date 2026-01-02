const express = require("express");
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
         const user = req.user;
         const receivedRequest = await connectionRequest.find({
            toUserId:user._id,
            status:"interested"
         }).populate("fromUserId"," firstName lastName photoURL about "); 

         res.json({
            message:"Received Requests fetched successfully",
            data:receivedRequest,
         })
    }catch(err){
        res.status(400).send("ERROR:"+ err.message);    
    }
})

userRouter.get("/user/connections",userAuth , async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connections = await connectionRequest.find({   
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId toUserId"," firstName lastName photoURL about ");

        // not the whole connection is needed, only the connected user's info is needed
        // so we will map through the connections and get the other user's info who is connected with the loggedInUser
        const data = connections.map((connection)=>{
            if(connection.fromUserId._id.toString()===loggedInUser._id.toString()){
                return connection.toUserId;
            }
            return connection.fromUserId;
        })
        res.json({
            message:"connection established successfully",
            data:data,
        })

    }catch(err){    

    }
})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
         const loggedInUser = req.user;
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 10;
         const skip = (page - 1) * limit;
         const allConnection =await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id} , 
                {toUserId:loggedInUser._id},

            ]
         }).select("fromUserId toUserId");
         
         const blockedUserIds = new Set();
         allConnection.forEach((connection)=>{
            blockedUserIds.add(connection.fromUserId.toString());
            blockedUserIds.add(connection.toUserId.toString());
         })

         const allowedUserId =await User.find({
            $and:[
                {_id:{$nin:Array.from(blockedUserIds)}},
                {_id:{$ne:loggedInUser._id}}
            ]
         }).select("firstName lastName about photoURL")
         .skip(skip)
         .limit(limit);
        console.log("calling backend")
        res.send(allowedUserId);
       
    }catch(err){
        res.status(400).send("ERROR here");
    }
})

module.exports = {
    userRouter, 
}