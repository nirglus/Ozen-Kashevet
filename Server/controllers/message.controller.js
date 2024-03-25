const {Message} = require("../models/message.model")

const sendAMessege = async(req,res)=>{
    const newMessege = new Message( 
        {sender: req.user.id,
        body: req.body.body}
        )
    try{
        const message = await newMessege.save();
        res.status(200).json(message)
    }catch(err){
        res.status(500).json(err)
    }
}
const getMessage = async(req,res)=>{
    try{
        const message = await Message.find({
            room_id: req.params.room_id
        });
        res.status(200).json(message)
    }catch(err){
        res.status(500).json(err)
    }
}
module.exports = {sendAMessege ,getMessage}