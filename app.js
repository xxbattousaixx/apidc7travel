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

app.get('/api/trips', (req, res) => res.sendFile(path.join(__dirname, '/routes/api/trips.js')));
app.get('/api/profiles', (req, res) => res.sendFile(path.join(__dirname, '/routes/api/profiles.js')));

connectDB();
app.use('/images', express.static('images'));


// cors
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use("/",tripsRouter) 
app.use("/",profilesRouter) 



const port = 3100;

app.listen(port, () => console.log(`Server running on port ${port}`));