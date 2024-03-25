const { TherapistSchedule } = require("../models/therapistSchedule.model");

const getTherapistSchedule = async(req, res) =>{
    const id = req.params;
    try {
        const schedule = await TherapistSchedule.findOne({_id: id});
        res.send({data: schedule});
    } catch (error) {
        res.status(400).send("Error");
    }
}

const createTherapistSchedule = async(req, res) =>{

}