const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, default: "user"},
    password: {type: String, required: true},
    birth_date: {type: String, required: true},
    bio: {type: String, required: true},
    gender: {type: String, required: true},
    isOnline: {type: Boolean, default: false},
    profileImg: {type: String}
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = { User };