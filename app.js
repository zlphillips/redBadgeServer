require('dotenv').config();
var express = require('express');
var app = express();
const client = require("./mongo")
var user = require("./controllers/usercontroller")
var post = require("./controllers/postcontroller")
var profile = require("./controllers/profilecontroller")
var comment = require("./controllers/commentcontroller")
var multer = require("./controllers/multercontroller")
var sequelize = require('./db');

// sequelize.sync({force: true});
sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));
app.use('/redBadge/user', user);
app.use('/redBadge/post', post)
app.use('/redBadge/profile', profile)
app.use('/redBadge/comment', comment)
app.use('/redBadge/multer', multer)
app.listen(process.env.PORT, function () {
  console.log(`${process.env.PORT}`);
});



//multer code


