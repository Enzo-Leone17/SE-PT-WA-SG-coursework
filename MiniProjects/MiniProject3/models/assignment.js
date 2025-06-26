module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Assignment",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      staff_id: DataTypes.INTEGER,
      task_id: DataTypes.INTEGER,
      status: { type: DataTypes.ENUM("assigned", "in progress", "completed", "cancelled"), defaultValue: "assigned" },
      notes: DataTypes.TEXT,
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "assignments",
      underscored: true,
      timestamps: true,
    }
  );
};
