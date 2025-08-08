const post = require("./post");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Comment",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: "posts",
          key: "id",
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "comments",
      timestamps: true,
    }
  );
};
