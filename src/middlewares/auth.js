const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async(req,res,next)=>{

    try{
     //read the token
      const {token} = req.cookies;
      if(!token){
        throw new Error ("please login");   
      }

     //verify the token 
     const decodedObj = await jwt.verify(token,"dev@tinder");
     const {_id} = decodedObj;
      //find the user
     const user =await  User.findById(_id);
     if(!user){
        throw new Error("user not found");
     }
     req.user=user;
     next();
    
   }catch(error){
      return   res.status(401).send("Error:"+error.message);
   }
}
module.exports = {
    userAuth,
}