const express = require("express");
const { sendAMessege, getMessage } = require("../controllers/message.controller");
const {auth , authorize} = require("../middleware/auth")
const router = express.Router();

router.post("/" , auth,sendAMessege)
router.get("/:conversetionId" , getMessage)
module.exports = router;
