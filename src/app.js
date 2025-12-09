const express = require("express");

const app = express();

app.use("/hello/2",(req , res)=>{
    res.send("welcome2  from the server");
})

app.use("/hello",(req , res)=>{
    res.send("welcome  from the server");
})



app.use("/test",(req,res)=>{
    res.send("hello hello hello")
})

app.use("/",(req , res)=>{
    res.send("welcome");
})


app.listen(3030 , ()=>console.log('listen to the port'));

