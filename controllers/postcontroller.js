const { Router } = require("express");
const { ProfileModel } = require("../models");

const PostController = Router();





//New Post
PostController.post('/new-post', (req, res) => {
    try {
        const { media, description, likes } = req.body.profile;
        const userId = req.user.id
        const post = await PostModel.findOne({
          where: {
            id: userId,
          },
        });
        post && description
          ? ProfileModel.create({ 
             media, 
             description, 
             likes,
             createdByUser: userId 
            })
          : res.status(404).json({ message: "User not found" });
        res.status(200).json({
          message: "Profile successfully created",
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: "Failed to make a new profile",
        });
      }
});

//Get All Posts
router.get('/all-posts', (req, res) => {
   try {
       const posts = PostModel.findAll()
       if (posts) {
        res.status(200).json({
          results: posts,
        });
      } else {
        res.status(404).json({
          message: "No posts found for user",
        });
      }
    } catch (e) {
      res.status(500).message({
        message: "Failed to retrieve posts for user",
      });
    }
   });

//Get current user's posts
router.get('/my-posts', validateSession, (req, res) => {
    try {
        const userId = req.user.id
        const posts = await ToDoList.findAll({
          where: {
            createdBy: userId,
          },
        });
        if (lists) {
          res.status(200).json({
            results: posts,
          });
        } else {
          res.status(404).json({
            message: "No posts found for user",
          });
        }
      } catch (e) {
        res.status(500).message({
          message: "Failed to retrieve posts for user",
        });
      }    
});

//Get one post
router.get('/:id', validateSession, (req, res) => {
    PostModel.findOne({where: {id: req.params.id}})
})

//Edit post
router.put('/:id', validateSession, (req, res) => {
    if (!req.errors && (req.user.admin)){
        PostModel.update( req.body.post, {where: {id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
        }
    else if(!req.errors) {
        PostModel.update(req.body.post, {where: {userId: req.user.id, id: req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } 
    else if(!req.errors) {
        PostModel.update(req.body.post)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
    }
    else {
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



PostController.route("/:id")
  .get(async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id
      const found = await PostModel.findOne({
        where: {
          id: postId,
          createdByUser: userId,
        }
      });
      if (postsFound) {
        res.status(200).json({
          result: postsFound.toJSON(),
        });
      } else {
        res.status(404).json({
          message: "Profile not found",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: "Failed to fetch profile",
      });
    }
  })
  .put(async (req, res) => {
    try {
      const { media, description, likes } = req.body.profile;
      const PostToUpdate = await PosteModel.findOne({
        where: {
          id: req.params.id,
          createdByUser: req.user.id,
        },
      });
      if (PostToUpdate && description) {
        PostToUpdate.media = media;
        PostToUpdate.description = description
        PostToUpdate.likes = likes
        await PostToUpdate.save();
        res.status(200).json({
          message: "Successfully updated profile",
        });
      } else {
        res.status(404).json({
          message:
            "Post description missing, post not found, or user unauthorized to edit",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: "Failed update profile",
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const userId = req.user.id
      const PostToRemove = await ProfileModel.findOne({
        where: {
          id: req.params.id,
          createdByUser: userId,
        },
      });
      PostToRemove && (req.user.admin)
        ? PostToRemove.destroy()
        : res.status(404).json({
            message: "Post not found or post does not belong to user",
          });
      res.status(200).json({
        message: "Successfully removed post",
      });
    } catch (e) {
      res.status(500).json({
        message: "Failed to delete post",
      });
    }
  });

module.exports = PostController
