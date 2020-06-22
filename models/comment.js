module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
      media:{
      type: DataTypes.BLOB,
      allowNull: true
      },
      description: DataTypes.STRING,
      likes: DataTypes.INTEGER
    });
  };