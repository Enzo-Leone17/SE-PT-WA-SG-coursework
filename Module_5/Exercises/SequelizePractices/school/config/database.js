// Setting up the database connection
const { Sequelize } = require('sequelize');

//using env to store sensitive information
require('dotenv').config();

//#region Sensitive information
const sequelize = new Sequelize('university', process.env.admin, process.env.admin_password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
//#endregion

module.exports = sequelize;