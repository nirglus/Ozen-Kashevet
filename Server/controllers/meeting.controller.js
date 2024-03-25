const {Meeting} = require("../models/meeting.model");

const createMeeting = async(req, res) =>{
    const {date, therapist_id} = req.body;
    try {
        const newMeeting = new Meeting({date, therapist_id});
        await newMeeting.save();
    } catch (error) {
        
    }
}