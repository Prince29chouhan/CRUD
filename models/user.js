const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true,
        min: 0
    },
    Gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female']
    },
    Mobile_number: {
        type: Number,
        required: true

    }
})


// Name, Age, Gender, Mobile number
const User = mongoose.model('User', userSchema);

module.exports = User;