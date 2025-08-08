module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Post",
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "posts",
      timestamps: true,
    }
  );
};
