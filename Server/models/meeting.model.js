const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    available: {type: Boolean, default: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    therapist_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, required: true},
}, {timestamps: true})

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = { Meeting };