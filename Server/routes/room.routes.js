const express = require("express");
const { newRoom, getRoom, getRoomUsers } = require("../controllers/room.controller");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/" , auth ,newRoom)
router.get("/getRooms" ,auth, getRoom)
router.get("/find/:talkingTo" , auth , getRoomUsers)

module.exports = router;