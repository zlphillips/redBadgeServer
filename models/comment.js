module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
      username: DataTypes.STRING,
      media: DataTypes.BLOB,
      description: DataTypes.STRING,
      datePosted: DataTypes.STRING,
      likes: DataTypes.BOOLEAN
    });
  };