module.exports = function (sequelize, DataTypes) {
    return sequelize.define('post', {
      media: {
        type: DataTypes.BLOB,
        allowNull: true
      },
      description: DataTypes.STRING,
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    });
  };