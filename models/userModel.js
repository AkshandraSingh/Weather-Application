const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    userPhone: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userCity: {
        type: String,
        required: true,
    },
    userGender: {
        type: String,
        default: "male",
    },
    usedPasswords: {
        type: [],
        default: []
    },
    userProfilePic: {
        type: String,
        default: "",
    },
    favoritePlaces: {
        type: [],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

userSchema.set('timestamps', true)

module.exports = mongoose.model('User', userSchema);
