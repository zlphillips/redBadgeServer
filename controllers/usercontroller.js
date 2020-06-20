var express = require('express')
var router = express.Router();
var sequelize = require("../db");
var UserModel = sequelize.import('../models/user');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

//Sign Up
router.post('/signup', (req, res) => {  //THIS WORKS
    var firstName = req.body.user.firstName;
    var lastName = req.body.user.lastName;
    var email = req.body.user.email;
    var userName = req.body.user.username;
    var password = req.body.user.password;

UserModel
    .create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        passwordhash: bcrypt.hashSync(password, 10)
    })
    .then(
        function success(user) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.json({
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
    where : { userName: req.body.user.username }
}).then(
    function(user) {
        if (user){
            bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                if (matches) {
                    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.json({
                        user: user,
                        message: "Succesfully Logged In",
                        sessionToken: token,
                    })

                } else {
                    res.status(502).send({message: "Invalid Password"});
                }
            });
        } else {
            //invalid login, or typo, or doesn't exist
            res.status(500).send({message: "Invalid Login"});
        }
    }
 )
})


module.exports = router;