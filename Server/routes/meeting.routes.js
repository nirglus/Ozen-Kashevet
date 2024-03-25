const { Router } = require("express");
const { createMeeting, getMeeting, updateMeeting } = require("../controllers/meeting.controller");

const router = Router();

router.post("/", createMeeting);
router.get("/", getMeeting);
router.patch("/:id", updateMeeting)

module.exports = router;