const { DataTypes } = require('sequelize');
const db = require('../db');

    const CommentModel = db.define('comment', {
      description: DataTypes.STRING,
      likes: {
          type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    });
    
  module.exports = CommentModel;