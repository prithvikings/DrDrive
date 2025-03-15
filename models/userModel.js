const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [5, "Username must be at least 5 characters long"],
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "Password must be at least 5 characters long"],
    }
});

module.exports = mongoose.model('User', userSchema);