const express = require("express");

const {connectDB} = require("./config/database");
const app = express();
  
const User = require("./models/user")

app.use(express.json());

    
app.post("/signup",async (req , res)=>{
    
   const user = new User(req.body);
   try{
        await user.save();
        res.send("added successfully");
   }catch(error){
    // res.status(400).send("error in adding user");
     res.status(400).send(error.message);
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
    const userId = req.body.Id;
    const updateData = req.body;
    try{
       const user =  await User.findByIdAndUpdate({_id:userId},updateData,{returnDocument:"before"});
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