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
        if(!userId){
         DisconenctUser(socket.id)
        }else
        {
            addUser(userId,socket.id)
            io.emit("getUsers" , users)
        }
    })

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, message_content }) => {
        const user = getUser(receiverId);
        if (user?.socketId) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                message_content,
            });
        } else {
            console.log("cant send");
            // Handle case where receiver is not found, maybe send an error message
        }
    });

    //when disconects
    socket.on("disconnect" , ()=>{
        console.log("a user disconnect");
        DisconenctUser(socket.id)
        io.emit("getUsers" , users)
    })
})