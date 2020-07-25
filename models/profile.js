module.exports = function (sequelize, DataTypes) {
    return sequelize.define('profile', {
      profilePic: {
          type: DataTypes.BLOB,
        allowNull: true},
      bio: {
          type: DataTypes.STRING,
        allowNull: true},
      owner: {
        type: DataTypes.INTEGER,
      }
    });
  };