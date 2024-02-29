// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
 username: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 active: { type: Boolean, required: false, default: false  },
 userid:{type:Number, required:false, default:''}
 
 });
module.exports = mongoose.model('User', userSchema);