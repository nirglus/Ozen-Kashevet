const mongoose=require('mongoose')

const RoomSchema=new mongoose.Schema({
    members:[{type: mongoose.Types.ObjectId, ref: "User"}]
},
{timestamps:true})



const Room = mongoose.model('Room',RoomSchema)

module.exports={Room}