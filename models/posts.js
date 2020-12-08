const { DataTypes } = require('sequelize');
const db = require('../db');

    const PostModel = db.define('post', {
      media: {
        type: DataTypes.BLOB,
        allowNull: true
      },
      description: {
        type: DataTypes.CHAR(500),
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
     
    });
  module.exports = PostModel;