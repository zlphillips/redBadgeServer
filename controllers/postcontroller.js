let express = require('express')
let router = express.Router();
let sequelize = require("../db");
let PostModel = sequelize.import("../models/posts")

let validateSession = require('../middleware/validate-session')

//New Post
router.post('/new-post', validateSession, (req, res) => {
    let media = req.body.post.media;
    let owner = req.body.user.username;
    let description = req.body.post.desription;
    let datePosted = req.body.post.datePosted; 
    let likes = req.body.post.likes;

PostModel
    .create({
        media: media,
        description: description,
        datePosted: datePosted,
        likes: likes,
        owner: owner
    })
    .then (databaseData => {
        res.json({
            data: databaseData,
        });  
    });
});

//Get All Posts
router.get('/all-posts', validateSession, (req, res) => {
    PostModel.findAll()
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
router.put('./:id', validateSession, (req, res) => {
    if (!req.errors) {
        PostModel.update(req.body.post, {where: {owner: req.user.id, id: req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})

//Delete post 
router.delete('./:id', validateSession, (req, res) => {
    if (!req.errors){
        PostModel.destroy({where: { owner: req.user.id, id: req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})


module.exports = router