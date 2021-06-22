const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true 
    },
    lastName: {
        type: String,
        trim: true,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    phone: {
        type: String
    },
    countryCode: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    postalCode: {
        type: Number
    }
})

module.exports = mongoose.model('user',userModel);