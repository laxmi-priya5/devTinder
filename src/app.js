const express = require("express");

const {connectDB} = require("./config/database");
const {ValidateSignup} = require("./utils/validateSignup");
const app = express();
  
const User = require("./models/user")
const bcrypt = require("bcrypt"); 
app.use(express.json());

app.post("/login",async (req,res)=>{
    const {emailId , password}=req.body;
    try{
         const user = await User.findOne({emailId:emailId});
         if(!user){
            throw new Error("user not found");
         }
         const isPasswordValid = await bcrypt.compare(password ,user.password);
         if(isPasswordValid){
            res.send("login successful");
         }else{
            throw new Error("invalid password");
         }
    }catch(error){
          res.status(400).send("ERROR:" +error.message) 
    }
})
    
app.post("/signup",async (req , res)=>{
    
   
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

app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
           const users = await User.find({emailId:userEmail})
           if(users.length>0){res.send(users);}
           else{res.status(404).send("user not found");}

    } 
    catch{
        res.status(400).send("error in fetching user");
    }

    
})

app.delete("/user",async(req,res)=>{
    const userId = req.body.Id;
    try{
        await User.findByIdAndDelete({_id:userId});
        res.send("user deleted successfully");
    }
    catch{
        res.status(400).send("error in deleting user");
    }
})

app.patch("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    const updateData = req.body;
    try{
       const user =  await User.findOneAndUpdate({emailId:userEmail},updateData,{returnDocument:"before"});
        res.send("user updated successfully");
        console.log(user);
    }
    catch{
        res.status(400).send("error in updating user");
    }
})


connectDB()
.then(()=>{
    console.log("connection established...")
    app.listen(3030 , ()=>console.log('listen to the port'));

})
.catch(()=>console.error("database can't established"))