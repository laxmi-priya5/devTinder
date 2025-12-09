const express = require("express");

const app = express();

app.use("/hello",(req , res)=>{
    res.send("welcome  from the server");
})

app.listen(3030 , ()=>console.log('listen to the port'));

