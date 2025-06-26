module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Manager",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: DataTypes.INTEGER,
      full_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "managers",
      underscored: true,
      timestamps: true,
    }
  );
};
