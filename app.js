require('dotenv').config();
var express = require('express');
var app = express();
var user = require("./controllers/usercontroller")  //Throws err saying can't find module './contollers/usercontroller'
var sequelize = require('./db');

sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));
app.use('/redBadge/user', user);
app.listen(process.env.PORT, function () {
  console.log(`${process.env.PORT}`);
});