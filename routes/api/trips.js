//multer
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path")
let Trip = require('../../models/Trips')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images/');
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req,file,cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null,true);}
    else{
      cb(null, false);
    }

  }
const express = require('express');
const router = express.Router();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();
// require('dotenv').config();
// const port = process.env.PORT || 8082;
// app.use(cors());
// app.use(express.json());
let upload = multer({storage, fileFilter });

// routes/api/trips.js


router.route('/').post( upload.single('photo'),(req, res) => {
 const photo = req.body.photo;
 const user = req.body.user;
 const location = req.body.location;
 const date = req.body.date;
 const notes = req.body.notes;
 const value = req.body.value;
 const quality = req.body.quality;
 const departing = req.body.departing;
 const fileName = req.file.filename
 const tripData = {
  photo,
  user,
  location,
  date,
  notes,
  value,
  quality,
  departing,
  fileName
 }
  Trip.create(tripData)
    .then(trip => res.json({ msg: 'Trip added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this trip' }));
});

router.route('/rec').get((req,res)=>{
  Trip.find()
  .then(trip => res.json(trip))
  .catch(err=>res.status(400).json('Error: ' + err));
})
// @route GET api/trips/test
// @description tests trips route
// @access Public
router.get('/test', (req, res) => res.send('trip route testing!'));

// @route GET api/trips
// @description Get all trips
// @access Public
router.get('/', (req, res) => {
  Trip.find()
    .then(trips => res.json(trips))
    .catch(err => res.status(404).json({ notripsfound: 'No Trips found' }));
});

// @route GET api/trips/:id
// @description Get single trip by id
// @access Public
router.get('/:id', (req, res) => {
  Trip.findById(req.params.id)
    .then(trip => res.json(trip))
    .catch(err => res.status(404).json({ notripfound: 'No Trip found' }));
});

// @route GET api/trips
// @description add/save trip
// @access Public
router.get('/', (req, res) => {
  Trip.find()
    .then(trips => res.json(trips))
    .catch(err => res.status(404).json({ notripsfound: 'No Trips found' }));
});

// @route GET api/trips/:id
// @description Update trip
// @access Public
router.put('/:id', upload.single('photo'), (req, res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body)
    .then(trip => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/trips/:id
// @description Delete trip by id
// @access Public
router.delete('/:id', (req, res) => {
  Trip.findByIdAndRemove(req.params.id, req.body)
    .then(trip => res.json({ mgs: 'Trip entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a trip' }));
});

module.exports = router;