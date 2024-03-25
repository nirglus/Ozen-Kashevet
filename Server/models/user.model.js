const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, default: "user", required: true},
    password: {type: String, required: true},
    birth_date: {type: Date, required: true},
    bio: {type: String, required: true},
    gender: {type: String, required: true},
    profileImg: {type: String}
})

const User = mongoose.model("User", userSchema);

module.exports = { User };