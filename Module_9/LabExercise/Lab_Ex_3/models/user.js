module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
};
