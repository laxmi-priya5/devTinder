const mongoose = require("mongoose");
const validator = require("validator");
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
        required:true
    },
    age:{
        type:Number
    },
    gender:{ 
        type:String
    },
    skills:{
        type:[String]
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",userSchema);