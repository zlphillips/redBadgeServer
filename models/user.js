module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
      firstName: {
        type: DataTypes.STRING,
      allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordhash: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  };