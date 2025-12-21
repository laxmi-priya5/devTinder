const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
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

connectionReequestSchema.index({fromUserId:1,toUserIdd:1})

module.exports = new mongoose.model("connectionRequest",connectionRequestSchema);

