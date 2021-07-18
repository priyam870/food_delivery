const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminModel = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
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
    password: {
        type: String,
        select: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model('admin', adminModel);