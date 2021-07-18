const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const { boolean } = require('joi');

const advertisementModel = new Schema({
  title: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'admin'
  },
  dailyBudget: {
    type: Number
  },
  totalBudget: {
    type: Number
  },
  start: {
    type: String
  },
  end: {
    type: String
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

module.exports = mongoose.model('advertisement', advertisementModel);