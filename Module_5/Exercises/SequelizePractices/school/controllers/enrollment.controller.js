const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");
const Professor = require("../models/professor.model");
const Student = require("../models/student.model");

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { is_deleted: false },
      attributes: ["student_id", "course_id", "grade"],
      include: [
        {
          model: Student,
          where: { is_deleted: false },
          required: false,
          attributes: ["student_id", "full_name", "enrollment_year"],
        },
        {
          model: Course,
          where: { is_deleted: false },
          required: false,
          attributes: ["course_id", "course_code", "title"],
        },
      ],
    });

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
