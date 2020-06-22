module.exports = function (sequelize, DataTypes) {
    return sequelize.define('profile', {
      profilePic:{ 
      type: DataTypes.BLOB,
      allowNull: true
      },
      bio: DataTypes.STRING,
    });
  };