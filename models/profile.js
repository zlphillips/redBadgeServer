const { DataTypes } = require('sequelize');
const db = require('../db');

const ProfileModel = db.define('profile', {
  profilePic: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

module.exports = ProfileModel;