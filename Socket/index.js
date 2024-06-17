const {io} = require("./config/index")

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
    console.log("A user has connected");
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
            console.log("Failed to send message");
            // Handle case where receiver is not found, maybe send an error message
        }
    });

    //when disconects
    socket.on("disconnect" , ()=>{
        console.log("A user has disconnected");
        DisconenctUser(socket.id)
        io.emit("getUsers" , users)
    })
})