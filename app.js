// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();
const port = 3100;
const uri = "mongodb+srv://dcarrassi:8701423@cluster0.7aqzmi1.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open',()=>{console.log('mongo DB success');
});
// routes
const tripsRouter = require('./routes/api/trips');
// Connect Database
app.use('/images', express.static('images'));
// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/api/trips', (req, res) => res.send('Hello world!'));
// use Routes
app.use('/', tripsRouter);


app.listen(port, () => console.log(`Server running on port ${port}`));