
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "BinLocation",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      item_id: DataTypes.INTEGER,
      storage_type: { type: DataTypes.ENUM("small", "medium", "big"), defaultValue: "small" },
      movement_type: { type: DataTypes.ENUM("slow", "fast"), defaultValue: "fast" },
      max_quantity: { type: DataTypes.INTEGER, defaultValue: 20 },
      is_full: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "bin_locations",
      underscored: true,
      timestamps: true,
    }
  );
};
