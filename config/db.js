const mongoose = require('mongoose');
  const config = require('config');
  const db = config.get('mongoURI');
  
  const connectDB =  () => {
    try {
      mongoose.connect(db);
      const db1 = mongoose.connection;

      db1.once('open', () => {
        console.log('MongoDB connection successful.');
      });
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;

  