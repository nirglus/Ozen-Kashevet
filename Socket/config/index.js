const dotenv = require('dotenv');
dotenv.config();

const io = require("socket.io")(8900, {
    cors:{
        origin: process.env.SOCKET_IO_ORIGIN
    }
});
module.exports = {io}