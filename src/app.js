// require('dotenv').config()
const express = require("express");
require("dotenv").config();

const {connectDB} = require("./config/database");

const app = express();
  
const User = require("./models/user")
const bcrypt = require("bcrypt"); 

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
const {requestRouter} = require("./routers/requestRouter");
const {authRouter} = require("./routers/authRouter");
const {profileRouter} = require("./routers/profileRouter");
const {userRouter} = require("./routers/userRouter");
const cors = require("cors");

app.use(cors({
  origin: [process.env.FRONTEND_URL || "https://dev-tinder-frontend-alpha.vercel.app/" || "http://localhost:3030"], // frontend port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{res.json({message: "Health OK"})})
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter)



// app.get("/user",async(req,res)=>{
//     const userEmail = req.body.emailId;
//     try{
//            const users = await User.find({emailId:userEmail})
//            if(users.length>0){res.send(users);}
//            else{res.status(404).send("user not found");}

//     } 
//     catch{
//         res.status(400).send("error in fetching user");
//     }

    
// })

// app.delete("/user",async(req,res)=>{
//     const userId = req.body.Id;
//     try{
//         await User.findByIdAndDelete({_id:userId});
//         res.send("user deleted successfully");
//     }
//     catch{
//         res.status(400).send("error in deleting user");
//     }
// })

// app.patch("/user",async(req,res)=>{
//     const userEmail = req.body.emailId;
//     const updateData = req.body;
//     try{
//        const user =  await User.findOneAndUpdate({emailId:userEmail},updateData,{returnDocument:"before"});
//         res.send("user updated successfully");
//         console.log(user);
//     }
//     catch{
//         res.status(400).send("error in updating user");
//     }
// })


connectDB()
.then(()=>{
    console.log("connection established...")
    app.listen(3030 , ()=>console.log('listen to the port'));

})
.catch(()=>console.error("database can't established"))
