module.exports = function (sequelize, DataTypes) {
    return sequelize.define('post', {
      username: DataTypes.STRING,
      media: DataTypes.BLOB,
      description: DataTypes.STRING,
      datePosted: DataTypes.STRING,
      likes: DataTypes.BOOLEAN
    });
  };