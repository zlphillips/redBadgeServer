var express = require('express')
var router = express.Router();
var sequelize = require("../db");
var UserModel = sequelize.import('../models/user');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
let validateSession = require('../middleware/validate-session')

//Sign Up
router.post('/signup', (req, res) => {  //THIS WORKS
const passwordhash = bcrypt.hashSync(req.body.user.password, 12)
UserModel.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        username: req.body.user.username,
        passwordhash: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(
        function success(user) {
            console.log(`user: ${user.id}`)
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.status(200).json({
                user: user,
                message: 'New User Created',
                sessionToken: token,
            })
        },
        function error(err) { 
            res.send(500, err.message)
        },
    );
});

//Login

router.post('/login', (req, res) => { //THIS WORKS
UserModel.findOne({
    where : { username: req.body.user.username }
}).then(
    function(user) {
        // console.log(user)
        if (user){
            bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                   
                    res.json({
                        user: user,
                        message: "Succesfully Logged In",
                        sessionToken: token,
                    })

                } else {
                    res.status(502).send({message: "Invalid password"});
                }
            });
        } else {
            //invalid login, or typo, or doesn't exist
            res.status(500).send({message: "Invalid Login/ User not found"});
        }
    }
 )
})

//corynne created this component to fetch username in posts
router.get('/username', (req, res) => {
    UserModel.findOne({
        where : {username: req.body.user.username}
    }).then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
})




router.get('/:id', validateSession, (req, res) => {
    UserModel.findOne({where: {id: req.params.id}})
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json(err));
})


module.exports = router;