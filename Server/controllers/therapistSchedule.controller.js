// const { TherapistSchedule } = require("../models/therapistSchedule.model");

// const getTherapistSchedule = async(req, res) =>{
//     const id = req.params;
//     try {
//         const schedule = await TherapistSchedule.findOne({_id: id});
//         res.send({data: schedule});
//     } catch (error) {
//         res.status(400).send("Error");
//     }
// }

// const createTherapistSchedule = async(req, res) =>{
//     const therapistID = req.body.therapistID;
//     try {
//         const newSchedule = new TherapistSchedule({therapist_id: therapistID});
//         res.send({data: newSchedule});
//     } catch (error) {
//         res.status(400).send("Error");
//     } 
// }

// const updateTherapistSchedule = async (req, res) => {
//     const id = req.params.id;
//     const { meetingId } = req.body;

//     try {
//         const updatedSchedule = await TherapistSchedule.findByIdAndUpdate(
//             id,
//             { $push: { meetings: meetingId } },
//             { new: true } 
//         );
//         if (!updatedSchedule) {
//             return res.status(404).send("Therapist Schedule not found");
//         }
//         res.send({ data: updatedSchedule });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("Error");
//     }
// };

// module.exports = {getTherapistSchedule, createTherapistSchedule, updateTherapistSchedule};
