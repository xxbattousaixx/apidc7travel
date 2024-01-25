//multer
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path")
let Profile = require('../../models/Profiles')

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

// routes/api/profiles.js


router.route('/').post( upload.single('photo'),(req, res) => {
 const photo = req.body.photo;
 const userid = req.body.userid;
 const username = req.body.username;

 const location = req.body.location;
 const age = req.body.age;
 const bio = req.body.bio;
 const gender = req.body.gender;
 const fileName =  req.file.filename;
 const profileData = {
  photo,
  userid,
  username,
  location,
  age,
  gender,
  bio,
  trips,
  fileName
 }
  Profile.create(profileData)
    .then(trip => res.json({ msg: 'Profile added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this profile' }));
});

router.route('/rec').get((req,res)=>{
  Profile.find()
  .then(trip => res.json(trip))
  .catch(err=>res.status(400).json('Error: ' + err));
})
// @route GET api/trips/test
// @description tests trips route
// @access Public
router.get('/test', (req, res) => res.send('profile route testing!'));

// @route GET api/trips
// @description Get all trips
// @access Public
router.get('/', (req, res) => {
  Profile.find()
    .then(trips => res.json(trips))
    .catch(err => res.status(404).json({ notripsfound: 'No Profiles found' }));
});

// @route GET api/trips/:id
// @description Get single trip by id
// @access Public
router.get('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(trip => res.json(trip))
    .catch(err => res.status(404).json({ notripfound: 'No Profile found' }));
});

// @route GET api/trips
// @description add/save trip
// @access Public
router.get('/', (req, res) => {
  Profile.find()
    .then(trips => res.json(trips))
    .catch(err => res.status(404).json({ notripsfound: 'No Profiles found' }));
});

// @route GET api/trips/:id
// @description Update trip
// @access Public
router.route('/:id').put( upload.single('photo'), (req, res) => {
  const photo = req.body.photo;
 const userid = req.body.user;
 const location = req.body.location;
 const age = req.body.date;
 const bio = req.body.notes;
 const username = req.body.value;
 const gender = req.body.quality;
 const trips = req.body.departing;
 const fileName = req.file.filename
 const profileData = {
  photo,
  username,
  location,
  age,
  bio,
  userid,
  gender,
  trips,
  fileName
 }
  Profile.findByIdAndUpdate(req.params.id, profileData)
    .then(profile => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/profiles/:id
// @description Delete profile by id
// @access Public
router.delete('/:id', (req, res) => {
  Profile.findByIdAndRemove(req.params.id, req.body)
    .then(profile => res.json({ mgs: 'Profile entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a profile' }));
});

module.exports = router;