const mongoose = require("mongoose")

const MessageSchema =new mongoose.Schema(
    {
    room_id:{type: mongoose.Types.ObjectId, ref: "Room"},
    sender:{type:mongoose.Types.ObjectId , ref:"User"},
    message_content:{type:String}
    },
    {timestamps:true}
)
const Message=mongoose.model('Message', MessageSchema)

module.exports={Message}