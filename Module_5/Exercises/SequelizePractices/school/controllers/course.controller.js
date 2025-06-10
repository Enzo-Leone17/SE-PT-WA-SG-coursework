const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");
const Professor = require("../models/professor.model");
const Student = require("../models/student.model");

exports.getEnrollmentByCourseID = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { is_deleted: false, course_id: req.params.id },
      attributes: ["student_id", "course_id", "grade"],
      include: [
        {
          model: Student,
          where: { is_deleted: false },
          required: false,
          attributes: ["student_id", "full_name", "enrollment_year"],
        },
      ],
    });


    enrollments.length > 0
      ? res.json(enrollments)
      : res.status(404).json({ message: "No enrollments found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createCourse = async (req, res) => {
  try {
    const { course_code, title, credit_hours, professor_id } = req.body;
    const newCourse = await Course.create({ course_code, title, credit_hours, professor_id });
    res.status(201).json(`new course ${newCourse.title} of ${newCourse.course_code} created successfully`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};