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
router.route('/profiles').post( upload.single('photo'),(req, res) => {
 const photo = req.body.photo;
 const username = req.body.username;

 const location = req.body.location;
 const age = req.body.age;
 const bio = req.body.bio;
 const gender = req.body.gender;
 const fileName =  req.file.filename;
 const profileData = {
  photo,
  username,
  location,
  age,
  gender,
  bio,
  fileName
 }
  Profile.create(profileData)
    .then(profile => res.json({ msg: 'Profile added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this profile' }));
});
router.route('/profiles/rec/').get((req,res)=>{
  Profile.find()
  .then(profile => res.json(profile))
  .catch(err=>res.status(400).json('Error: ' + err));
})
// @route GET api/profiles/test
// @description tests profiles route
// @access Public
router.get('/profiles/test/', (req, res) => res.send('profile route testing!'));
// @route GET api/profiles
// @description Get all profiles
// @access Public
router.get('/profiles/', (req, res) => {
  Profile.find()
    .then(profiles => res.json(profiles))
    .catch(err => res.status(404).json({ noprofilesfound: 'No Profiles found' }));
});
// @route GET api/profiles/:id
// @description Get single profile by id
// @access Public
router.get('/profiles/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => res.json(profile))
    .catch(err => res.status(404).json({ noprofilefound: 'No Profile found' }));
});
// @route GET api/profiles
// @description add/save profile
// @access Public
router.get('/profiles/', (req, res) => {
  Profile.find()
    .then(profiles => res.json(profiles))
    .catch(err => res.status(404).json({ noprofilesfound: 'No Profiles found' }));
});

// @route GET api/profiles/:id
// @description Update profile
// @access Public
router.route('/profiles/:id').put( upload.single('photo'), (req, res) => {
  const photo = req.body.photo;
 const location = req.body.location;
 const age = req.body.age;
 const bio = req.body.bio;
 const username = req.body.username;
 const gender = req.body.gender;
 const fileName = req.file.filename
 const profileData = {
  photo,
  username,
  location,
  age,
  bio,
  gender,
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
// router.delete('/profiles/:id', (req, res) => {
//   Profile.findByIdAndRemove(req.params.id, req.body)
//     .then(profile => res.json({ mgs: 'Profile entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'No such a profile' }));
// });

module.exports = router;