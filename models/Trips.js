// models/Trip.js

const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  location: {
    type: String,
  },
  id:{
    type: Number,
  },
  user: {
    type: String,
  },
  date: {
    type: Date,
  },
  notes: {
    type: String,
  },
  quality: {
    type: Number,
  },
  value: {
    type: Number,
  },
  departing: {
    type: String
  },
  photo: {
    type: String,

  }, fileName: {
    type: String,
    default: ''


  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Trip = mongoose.model('trip', TripSchema);