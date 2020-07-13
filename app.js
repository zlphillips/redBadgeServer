require('dotenv').config();
var express = require('express');
var app = express();
var user = require("./controllers/usercontroller")
var post = require("./controllers/postcontroller")
var profile = require("./controllers/profilecontroller")
var comment = require("./controllers/commentcontroller")
var sequelize = require('./db');

sequelize.sync();
app.use(express.json());
app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))
app.use(require('./middleware/headers'));
app.use('/redBadge/user', user);
app.use('/redBadge/post', post)
app.use('/redBadge/profile', profile)
app.use('/redBadge/comment', comment)
app.listen(process.env.PORT, function () {
  console.log(`${process.env.PORT}`);
});