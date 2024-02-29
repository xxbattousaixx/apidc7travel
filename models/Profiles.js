// models/Trip.js

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  age: {
    type: Number,
  },
  bio: {
    type: String,
  },
  id:{
    type: Number,
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
 æctive: {
    type: Boolean,

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