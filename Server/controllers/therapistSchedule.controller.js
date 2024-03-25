const { TherapistSchedule } = require("../models/therapistSchedule.model");

const getTherapistSchedule = async(req, res) =>{
    const id = req.params;
    try {
        const schedule = await TherapistSchedule({})
    } catch (error) {
        
    }
}