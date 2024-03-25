const {Meeting} = require("../models/meeting.model");

const createMeeting = async(req, res) =>{
    const {date, therapist_id} = req.body;
    try {
        const newMeeting = new Meeting({date, therapist_id});
        await newMeeting.save();
        res.send({data: newMeeting})
    } catch (error) {
        res.status(400).send("Error");
    }
}

const getMeeting = async(req, res) =>{
    const query = req.query;
    try {
        const meeting = await Meeting.findOne(query)
        if(meeting){
            return res.send({data: meeting});
        }
        res.status(401).send("Meeting was not found");
    } catch (error) {
        res.status(400).send("Error");
    }
}

const updateMeeting = async (req, res) => {
    const meetID = req.params.id;
    const { body } = req.body;
    try {
        const meeting = await Meeting.findByIdAndUpdate(meetID, body, { new: true }); 
        res.send({ data: meeting });
    } catch (error) {
        res.status(400).send("Error");
    }
};

module.exports = {createMeeting, getMeeting, updateMeeting}