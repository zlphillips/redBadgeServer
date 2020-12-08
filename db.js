const { Sequelize } = require('sequelize');

var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});



module.exports = sequelize;