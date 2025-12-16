const express = require("express");

const {connectDB} = require("./config/database");
const app = express();
  
const User = require("./models/user")


const user1 = {
    firstName:"Subha",
    lastname:"Rout",
    emailId:"subha@rout.com",
    password:"laxmi@123"
}
app.post("/signup",async (req , res)=>{
   const user = new User(user1);
   await user.save();
   res.send("added successfully");
})




connectDB()
.then(()=>{
    console.log("connection established...")
    app.listen(3030 , ()=>console.log('listen to the port'));

})
.catch(()=>console.error("database can't established"))