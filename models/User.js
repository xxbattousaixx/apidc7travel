// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
 username: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 active: { type: Boolean, required: true, default: false  },
 id:{type:Number, required:true, default:''}
 
 });
module.exports = mongoose.model('User', userSchema);