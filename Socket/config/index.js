const io = require("socket.io")(8900, {
    cors:{
        origin:"http://localhost:5173"
    }
});

module.exports = {io}