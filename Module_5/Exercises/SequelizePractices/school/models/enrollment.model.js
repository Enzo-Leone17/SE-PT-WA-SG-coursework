const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Student = require("./student.model");
const Course = require("./course.model");

const Enrollment = sequelize.define(
  "Enrollment",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Student",
        key: "student_id",
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Course",
        key: "course_id",
      },
    },
    grade: {
      type: DataTypes.STRING(2),
    },
    created_at: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "enrollments",
    timestamps: false,
  }
);

module.exports = Enrollment;

//#region Associations

Student.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: "student_id",
  otherKey: "course_id",
});

Student.hasMany(Enrollment, { foreignKey: "student_id" });
Enrollment.belongsTo(Student, { foreignKey: "student_id" });

Course.belongsToMany(Student, {
  through: Enrollment,
  foreignKey: "course_id",
  otherKey: "student_id",
});

Course.hasMany(Enrollment, { foreignKey: "course_id" });
Enrollment.belongsTo(Course, { foreignKey: "course_id" });

//#endregion