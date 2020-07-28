let express = require('express')
let app = express();
let router = express.Router();
let sequelize = require("../db");
let PostModel = sequelize.import("../models/posts")
let validateSession = require('../middleware/validate-session')
const myurl = 'mongodb://localhost:27017/redBadgeServer';
const fs = require("fs")
const mongoose = require("mongoose");
mongoose.connect(myurl)



//multer upload
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })
  




//New Post
router.post('/new-post', validateSession, upload.single('quotes'), (req, res) => {
    let media = req.body.post.media;
    console.log('hello:', req.body)
    let description = req.body.post.description;
    // let likes = req.body.post.likes;
    let owner = req.user.id

PostModel.create({
        media: media,
        description: description,
        // likes: likes,
        userId: owner
    })
    .then (databaseData => {
        res.json({
            data: databaseData,
        });  
    });
});

//Get All Posts
router.get('/all-posts', validateSession, (req, res) => {
    PostModel.findAll({order:[['createdAt','DESC']]})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err));
});

//Get current user's posts
router.get('/my-posts', validateSession, (req, res) => {
    PostModel.findAll({ where: {owner: req.user.id}})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err));
});

//Get one post
router.get('/:id', validateSession, (req, res) => {
    PostModel.findOne({where: {id: req.params.id}})
})

//Edit post
router.put('/:id', validateSession, (req, res) => {
    if (!req.errors && (req.user.admin)){
        PostModel.update({where: {id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
        }
    else if(!req.errors) {
        PostModel.update(req.body.post, {where: {userId: req.user.id, id: req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})

//Delete post 
router.delete('/:id', validateSession, (req, res) => {
    if (!req.errors && (req.user.admin)){
        PostModel.destroy({where: {id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
        }
        else if (!req.errors){
        PostModel.destroy({where: {userId: req.user.id, id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})


module.exports = router
