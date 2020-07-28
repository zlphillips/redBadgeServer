let express = require('express')
let router = express.Router();
let sequelize = require("../db");
let CommentModel = sequelize.import("../models/comment")

let validateSession = require('../middleware/validate-session')

//New comment
router.post('/new-comment', validateSession, (req, res) => {
    let userId = req.user.id;
    let description = req.body.comment.description;
    let postId = req.body.comment.postId

CommentModel.create({
        description: description,
        userId: userId,
        postId: postId
    })
    .then (databaseData => {
        res.json({
            data: databaseData,
        });  
    });
});

//Get all comments
router.get('/all-comments', validateSession, (req, res) => {
    CommentModel.findAll({where: {comment: req.body.postId}})
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json(err));
});

//Get comment by postId

router.get('/postcomments', validateSession, (req, res) => {
    CommentModel.findAll({where: {postId: req.body.postId}})
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json(err))
})

//Edit comment
router.put('/:id', validateSession, (req, res) => {
    if (!req.errors && (req.user.admin)){
        CommentModel.destroy({where: {id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
        }
        else if (!req.errors){
        CommentModel.destroy({where: {userId: req.user.id, id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})

//Delete comment 
router.delete('/:id', validateSession, (req, res) => {
    if (!req.errors && (req.user.admin)){
        CommentModel.destroy({where: {id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
        }
        else if (!req.errors){
        CommentModel.destroy({where: {userId: req.user.id, id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})


module.exports = router