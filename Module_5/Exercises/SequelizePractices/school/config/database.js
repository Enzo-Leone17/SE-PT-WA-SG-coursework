// Setting up the database connection
const { Sequelize } = require('sequelize');

//#region Sensitive information
const sequelize = new Sequelize('university', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
//#endregion

module.exports = sequelize;