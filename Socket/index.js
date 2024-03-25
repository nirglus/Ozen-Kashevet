const io = require("socket.io")(8900, {
    cors:{
        origin:"http://localhost:5173"
    }
});

let users = []

const addUser = (userId ,socketId) =>{
    !users.some(user => user.userId=== userId) &&
    users.push({userId ,socketId})
}

const DisconenctUser = (socketId)=>{
    users = users.filter(user=>user.socketId !== socketId)
}

const getUser = (userId)=>{
    return users.find(user => user.userId === userId)
}
io.on("connection", (socket) => {
    //when connects
    console.log("a user connect");

    //take userId and socketId from users
    socket.on("addUser" , userId=>{
        addUser(userId,socket.id)
        io.emit("getUsers" , users)
    })

    //send and get message
    socket.on("sendMessage" , ({senderId , receiverId , text})=>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text,
        })
    })  

    //when disconects
    socket.on("disconnect" , ()=>{
        console.log("a user disconnect");
        DisconenctUser(socket.id)
        io.emit("getUsers" , users)
    })
})