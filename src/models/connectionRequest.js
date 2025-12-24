const mongoose = require("mongoose");
const User= require("./user");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not correct status type`
        },
        required:true
    }

},
{
    timestamps:true
}
);

connectionRequestSchema.index({fromUserId:1,toUserId:1})

module.exports = new mongoose.model("connectionRequest",connectionRequestSchema);

