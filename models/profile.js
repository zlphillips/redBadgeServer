module.exports = function (sequelize, DataTypes) {
    return sequelize.define('profile', {
      profilePic: DataTypes.BLOB,
      bio: DataTypes.STRING,
    });
  };