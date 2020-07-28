module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
      description: DataTypes.STRING,
      likes: {
          type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    });
  };