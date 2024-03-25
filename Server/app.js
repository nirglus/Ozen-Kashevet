const express = require("express");
const messages = require("./routes/message.routes");
const room = require("./routes/room.routes")
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/v1/messages" , messages);
app.use("/api/v1/room" , room);


module.exports = {app}