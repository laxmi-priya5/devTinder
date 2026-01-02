const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true ,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong enough");
            }
        }
        
    },
    age:{
        type:Number
    },
    gender:{ 
        type:String
    },
    skills:{
        type:[String]
    },
    photoURL:{
        type:String
    },
    about:{
        type:String
    }

},
{
    timestamps:true
},
);

// helper methods
userSchema.methods.validatePassword = async function (passwordInputByUser){ 
     const user = this;  
     const passwordHash = user.password
    const isValid =  await bcrypt.compare(passwordInputByUser ,passwordHash);
    return isValid;
},

userSchema.methods.getjwt = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"dev@tinder");
    return token;
    
} 

module.exports = mongoose.model("User",userSchema);