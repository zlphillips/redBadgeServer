let express = require('express')
let router = express.Router();
let sequelize = require("../db");
let ProfileModel = sequelize.import("../models/profile")
let validateSession = require('../middleware/validate-session')


//New Profile
router.post('/new-profile', validateSession, (req, res) => {
    let userId = req.user.id;
    let profilePic = req.body.profile.profilePic;
    let bio = req.body.profile.bio;

ProfileModel
    .create({
        userId: userId,
        profilePic: profilePic,
        bio: bio
    })
    .then (databaseData => {
        res.json({
            data: databaseData,
        });  
    });
});

//Get All Profiles
router.get('/all-profiles', validateSession, (req, res) => {
    ProfileModel.findAll()
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json(err));
});

//Current user's profile
router.get('/my-profile', validateSession, (req, res) => {
    console.log(req.user.id)
    ProfileModel.findAll({where: {userId: req.user.id}})
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json(err));
});

//Get one profile
router.get('/:id', validateSession, (req, res) => {
    ProfileModel.findOne({where: {id: req.params.id}})
})

//Edit Profile
router.put('/:id', validateSession, (req, res) => {
    if(!req.errors && (req.user.admin)){
        ProfileModel.destroy({where: {id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
        }
        else if (!req.errors){
        ProfileModel.destroy({where: {userId: req.user.id, id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})

//Delete profile
router.delete('/:id', validateSession, (req, res) => {
    if(!req.errors && (req.user.admin)){
        ProfileModel.destroy({where: {id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
        }
        else if (!req.errors){
        ProfileModel.destroy({where: {userId: req.user.id, id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})

module.exports = router;