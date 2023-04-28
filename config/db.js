const mongoose = require('mongoose');
  const config = require('config');
  const db = "mongodb+srv://dcarrassi:8701423@cluster0.7aqzmi1.mongodb.net/?retryWrites=true&w=majority";
  
  const connectDB = async () => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(db);
  
      console.log('MongoDB is Connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;