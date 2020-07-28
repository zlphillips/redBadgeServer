module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  });
};