const express = require("express");
const messages = require("./routes/message.routes");
const room = require("./routes/room.routes")
const user = require("./routes/user.routes");
const meeting = require("./routes/meeting.routes");

const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/v1/messages" , messages);
app.use("/api/v1/room" , room);
app.use("/api/v1/users", user);
app.use("/api/v1/meetings", meeting);



module.exports = {app}