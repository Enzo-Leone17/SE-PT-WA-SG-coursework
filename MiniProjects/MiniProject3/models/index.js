'use strict';

const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//define database models
db.User = require("./user")(sequelize, DataTypes);
db.Manager = require("./manager")(sequelize, DataTypes);
db.Staff = require("./staff")(sequelize, DataTypes);
db.Task = require("./task")(sequelize, DataTypes);
db.Assignment = require("./assignment")(sequelize, DataTypes);
db.Item = require("./item")(sequelize, DataTypes);
db.BinLocation = require("./bin_location")(sequelize, DataTypes);

//#region Associations

//#region user associations
db.User.hasOne(db.Manager, { foreignKey: "user_id", as: "managerProfile"});
db.Manager.belongsTo(db.User, { foreignKey: "user_id", as: "user"});
db.User.hasOne(db.Staff, { foreignKey: "user_id", as: "staffProfile"});
db.Staff.belongsTo(db.User, { foreignKey: "user_id", as: "user"});
//#endregion

//#region staff <-|-> assignment <-|-> tasks associations
db.Staff.belongsToMany(db.Task, {
  through: db.Assignment,
  foreignKey: "staff_id",
});
db.Task.belongsToMany(db.Staff, {
  through: db.Assignment,
  foreignKey: "staff_id",
});

db.Staff.hasMany(db.Assignment, { foreignKey: "staff_id" });
db.Assignment.belongsTo(db.Staff, { foreignKey: "staff_id" });

db.Task.hasMany(db.Assignment, { foreignKey: "task_id" });
db.Assignment.belongsTo(db.Task, { foreignKey: "task_id" });
//#endregion

//#region manager <-|-> tasks associations
db.Manager.hasMany(db.Task, { foreignKey: "manager_id" });   //can oversee many tasks, not exactly do them :D
db.Task.belongsTo(db.Manager, { foreignKey: "manager_id" });
//#endregion

//#region tasks <-|-> bin <-|-> items associations
db.Task.belongsTo(db.Item, { foreignKey: "item_id" });
db.Task.belongsTo(db.BinLocation, { foreignKey: "destination_bin_id" });

db.Item.hasOne(db.Task, { foreignKey: "item_id" });
db.Item.hasOne(db.BinLocation, { foreignKey: "item_id" });

db.BinLocation.hasOne(db.Task, { foreignKey: "destination_bin_id" });
db.BinLocation.belongsTo(db.Item, { foreignKey: "item_id" });
//#endregion

//#endregion

module.exports = db;
