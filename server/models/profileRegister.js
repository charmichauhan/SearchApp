const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({

    FullName: {
        type: String,
        required: true,
    },
    Fathers_Name: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    Address: {
        type: String,
        required: true,
        unique: true
    },
    Occupation: {
        type: String,
    },
    Marital_Status: {
        type: String,
        required: true,
    },
})

var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;