// models/Trip.js

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userid: {
    type: Number,
  },
  username: {
    type: String,
  },
  age: {
    type: Number,
  },
  bio: {
    type: String,
  },

  gender: {
    type: String
  },
  location: {
    type: String,
  },
  photo: {
    type: String,

  }, 
  trips:{
    type: Array,
    default: []
  },
  fileName: {
    type: String,
    default: ''
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);