module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Item",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      description: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      storage_type: { type: DataTypes.ENUM("small", "medium", "big"), defaultValue: "small" },
      movement_type: { type: DataTypes.ENUM("slow", "fast"), defaultValue: "fast" },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "items",
      underscored: true,
      timestamps: true,
    }
  );
};
