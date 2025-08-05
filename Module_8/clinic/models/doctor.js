module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    "Doctor",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: DataTypes.STRING,
      specialty: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      user_id: DataTypes.INTEGER,
    },
    {
      tableName: "doctors",
      underscored: true,
      timestamps: true,
    }
  );

  Doctor.associate = function (models) {
    Doctor.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return Doctor;
};
