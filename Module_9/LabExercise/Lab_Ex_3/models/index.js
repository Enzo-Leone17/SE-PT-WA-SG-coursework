'use strict';

const { Sequelize, DataTypes } = require("sequelize");
// Sequelize is a package that abstracts out the need to write
// SQL queries, relying instead on their models to do it for you
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, DataTypes); 
db.Post = require("./post")(sequelize, DataTypes);
db.Comment = require("./comment")(sequelize, DataTypes); 
db.Like = require("./like")(sequelize, DataTypes);

db.User.hasMany(db.Post, { foreignKey: "user_id" });
db.Post.belongsTo(db.User, { foreignKey: "user_id" });

db.User.hasMany(db.Comment, { foreignKey: "user_id" });
db.Comment.belongsTo(db.User, { foreignKey: "user_id" });

db.Post.hasMany(db.Comment, { foreignKey: "post_id" });
db.Comment.belongsTo(db.Post, { foreignKey: "post_id" });

db.User.hasMany(db.Like, { foreignKey: "user_id" });
db.Like.belongsTo(db.User, { foreignKey: "user_id" });

db.Post.hasMany(db.Like, { foreignKey: "post_id" });
db.Like.belongsTo(db.Post, { foreignKey: "post_id" });

module.exports = db;