// Setting up the database connection
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('university', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;