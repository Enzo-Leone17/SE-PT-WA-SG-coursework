const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");
const Professor = require("../models/professor.model");
const Student = require("../models/student.model");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      where: { is_deleted: false },
      include: [
        {
          model: Enrollment,
          where: { is_deleted: false },
          required: false,
          include: [
            {
              model: Course,
              where: { is_deleted: false },
              required: true,
              include: [
                {
                  model: Professor,
                  where: { is_deleted: false },
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    });

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findOne({ where: { student_id: id } }); // only looking for attributes inside one table => how can we get fields from other tables

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
