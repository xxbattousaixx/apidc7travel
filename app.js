// app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

require('dotenv').config();
// routes
const tripsRouter = require('./routes/api/trips');
const profilesRouter = require('./routes/api/profiles');

// Connect Database
connectDB();
app.use('/images', express.static('images'));
// cors
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/api/trips', (req, res) => res.send('Hello world Trips!'));
app.get('/api/profiles', (req, res) => res.send('Hello world Profiles!'));

// use Routes
app.use('/', tripsRouter);
app.use('/', profilesRouter);


const port = 3100;

app.listen(port, () => console.log(`Server running on port ${port}`));