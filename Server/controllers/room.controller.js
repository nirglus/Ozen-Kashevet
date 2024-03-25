const {Room} = require("../models/Room.model")

//new conv

const newRoom = async(req ,res)=>{
    const newRoom = new Room({
        members:[req.user.id , req.body.reciverId]
    })
    try{
        const savedConverstaion = await newRoom.save();
        res.status(200).json(savedConverstaion)
    }catch(err){
        res.status(500).json(err)
    }
}

const getRoom = async(req,res)=>{
    try{
        const converstaion = await Room.find({
            members: {$in:[req.user.id]}
            
        });
        res.status(200).json(converstaion)
    }catch(err){
        res.status(500).json(err)
    }
}

const getRoomUsers = async(req,res)=>{
    try{
        const converstaion = await Room.findOne({
            members: {$all:[req.user.id , req.params.talkingTo]}
        });
        if(converstaion){
        res.status(200).json(converstaion)
        }else{
            res.status(200).json(false)
        }
        
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports={getRoom , getRoomUsers ,newRoom}