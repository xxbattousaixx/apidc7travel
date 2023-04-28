// app.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
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
// routes
const tripsRouter = require('./routes/api/trips');
// Connect Database
connectDB();
app.use('/images', express.static('images'));
// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/api/trips', (req, res) => res.send('Hello world!'));
// use Routes
app.use('/', tripsRouter);

const port = 3100;

app.listen(port, () => console.log(`Server running on port ${port}`));