const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { Router } = require('express')
const { UserModel }  = require('../models')
const { UniqueConstraintError } = require('sequelize/lib/errors');

const userController = Router();



userController.post('/signup', async (req, res) => {
    console.log('yeet');
    let { firstName, lastName, email, username, password  } = req.body.user; // The order of these matters, must be in same order as you would JSON.stringify 
    try {       // try /catch/ is like a .then() .catch() returned by our asynchronous function, except it does NOT return a promise
      await UserModel.create({
        firstName,
        lastName,
        email,
        username,
        password: bcrypt.hashSync(password, 12)
      });
      res.status(201).json({
        message: 'User registered!'
      });
    } catch (e) {
      if (e instanceof UniqueConstraintError) { // new sequelize error that checks if email is already being used
        res.status(409).json({
          message: 'Email already in use.'
        });
      } else {
        res.status(500).json({
          message: 'Failed to register user'
        });
      }
    }
  });


  userController.post('/login', async (req, res) => {
    let { username, password } = req.body.user;
    try {
      let loginUser = await UserModel.findOne({ //setting to login
        where: {
          username
        }
      });
      if (loginUser && await bcrypt.compare(password, loginUser.password)) {
        const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET);
        res.status(200).json({
          message: 'Login succeeded',
          token
        });
      } else {
        res.status(401).json({
          message: 'Login failed'
        });
      }
    } catch (e) {
      res.status(500).json({
        message: 'Error logging in'
      });
    }
  })
  

userController.get('/allusers', (req,res) => {
    UserModel.findAll({order: [["createdAt", "DESC"]]})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err));
})

router.get('/:id', validateSession, (req, res) => {
    UserModel.findOne({where: {id: req.params.id, }})
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json(err));
})



    userController.post('/adminsignup', async (req, res) => {
        console.log('yeet');
        let { firstName, lastName, email, password, admin } = req.body.user;
        try {
          await UserModel.create({
            firstName,
            lastName,
            email,
            username,
            password: bcrypt.hashSync(password, 12),
            admin
          });
          res.status(201).json({
            message: 'Administrative user registered!'
          });
        } catch (e) {
          if (e instanceof UniqueConstraintError) {
            res.status(409).json({
              message: 'Email already in use.'
            });
          } else {
            res.status(500).json({
              message: 'Failed to register administrative user'
            });
          }
        }
      });

module.exports = router;