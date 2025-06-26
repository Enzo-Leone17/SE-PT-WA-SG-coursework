module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Staff",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: DataTypes.INTEGER,
      full_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      has_forklift_license: { type: DataTypes.BOOLEAN, defaultValue: false },
      has_punched_in: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "staffs",
      underscored: true,
      timestamps: true,
    }
  );
};
