const { Router } = require("express");
const { createTherapistSchedule, getTherapistSchedule, updateTherapistSchedule } = require("../controllers/therapistSchedule.controller");
const router = Router();

router.post("/", createTherapistSchedule);
router.get("/:id", getTherapistSchedule);
router.patch("/:id", updateTherapistSchedule);

module.exports = router;