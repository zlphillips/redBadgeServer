let express = require('express')
let router = express.Router();
let sequelize = require("../db");
let CommentModel = sequelize.import("../models/comment")

let validateSession = require('../middleware/validate-session')

//New comment
router.post('/new-comment', validateSession, (req, res) => {
    let media = req.body.comment.media;
    let owner = req.user.id;
    let description = req.body.comment.description; 

CommentModel.create({
        media: media,
        description: description,
        userId: owner
    })
    .then (databaseData => {
        res.json({
            data: databaseData,
        });  
    });
});

//Get all comments
router.get('/all-comments', validateSession, (req, res) => {
    CommentModel.findAll()
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json(err));
});

//Edit comment
router.put('/:id', validateSession, (req, res) => {
    if (!req.errors && (req.user.admin)){
        CommentModel.destroy({where: {id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
        }
        else if (!req.errors){
        CommentModel.destroy({where: {owner: req.user.id, id:req.params.id}})
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
        CommentModel.destroy({where: {owner: req.user.id, id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})


module.exports = router