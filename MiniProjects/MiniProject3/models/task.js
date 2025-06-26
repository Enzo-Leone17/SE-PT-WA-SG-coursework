module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Task",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      manager_id: DataTypes.INTEGER, //manager overseeing the task 
      item_id: DataTypes.INTEGER,
      destination_bin_id: DataTypes.INTEGER,
      status: { type: DataTypes.ENUM("opened", "cancelled", "closed"), defaultValue: "opened" },
      description: { type: DataTypes.TEXT, defaultValue: "No Description provided" },
      require_forklift: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "tasks",
      underscored: true,
      timestamps: true,
    }
  );
};
