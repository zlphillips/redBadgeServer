const { Router } = require("express");
const { ProfileModel } = require("../models");

const ProfileController = Router();



//new Profile
ProfileController.post('/newprofile', (req, res) => {

    try {
        const { profilePic, bio } = req.body;
        const userId = req.user.id
        const profile = await ProfileModel.findOne({
          where: {
            id: userId,
          },
        });
        profile && bio
          ? ProfileModel.create({ 
              profilePic, 
              bio, 
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



// get, update and delete all in one this is genius 
ProfileController.route("/:id")
  .get(async (req, res) => {
    try {
      const profileId = req.params.id;
      const found = await ProfileModel.findOne({
        where: {
          id: profileId,
          createdByUser: req.user.id,
        }
      });
      if (found) {
        res.status(200).json({
          result: found.toJSON(),
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
      const { profilePic, bio} = req.body.profile;
      const ProfileToUpdate = await ProfileModel.findOne({
        where: {
          id: req.params.id,
          createdByUser: req.user.id,
        },
      });
      if (ProfileToUpdate && bio) {
        ProfileToUpdate.bio = bio;
        ProfileToUpdate.profilePic = profilePic
        await ProfileToUpdate.save();
        res.status(200).json({
          message: "Successfully updated profile",
        });
      } else {
        res.status(404).json({
          message:
            "Profile bio missing, profile not found, or user unauthorized to edit",
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
      const ProfileToRemove = await ProfileModel.findOne({
        where: {
          id: req.params.id,
          createdByUser: req.user.id,
        },
      });
      ProfileToRemove && (req.user.admin)
        ? ProfileToRemove.destroy()
        : res.status(404).json({
            message: "Profile not found or profile does not belong to user",
          });
      res.status(200).json({
        message: "Successfully removed profile",
      });
    } catch (e) {
      res.status(500).json({
        message: "Failed to interact with profile",
      });
    }
  });



module.exports = ProfileController;