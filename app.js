// app.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();
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

const port = 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));