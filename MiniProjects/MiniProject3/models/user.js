module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: {
        type: DataTypes.STRING,
      },
      role: DataTypes.ENUM("manager", "staff"),
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
    } 
  );
    User.associate = function (models) {
    User.hasMany(models.RefreshToken, { foreignKey: "user_id", as: "tokens" });
  };

  return User;
};
