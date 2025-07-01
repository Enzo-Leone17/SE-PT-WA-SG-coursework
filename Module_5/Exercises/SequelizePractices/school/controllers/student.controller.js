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
              required: false,
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

exports.getStudentsByQuery = async (req, res) => {
  let queryObj = {};
  if (Object.keys(req.query).length !== 0) {
    if (req.query.full_name) {
      queryObj.full_name = req.query.full_name;
    }
    if (req.query.enrollment_year) {
      queryObj.enrollment_year = req.query.enrollment_year;
    }
    if (req.query.student_id) {
      queryObj.student_id = req.query.student_id;
    }
    try {
      const students = await Student.findAll({
        include: [
          {
            model: Course,
            through: {
              model: Enrollment,
              where: req.query.grade ? { grade: req.query.grade } : {},
              required: req.query.grade !== undefined ? true : false,
            },
            required: req.query.grade !== undefined ? true : false,
            attributes: ["course_id", "course_code", "title"],
          },
        ],
        where: queryObj,
        attributes: ["student_id", "full_name", "enrollment_year"],
      });

      res.json(students);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    this.getAllStudents(req, res);
  }
};

exports.createStudent = async (req, res) => {
  try {
    //dynamic logic for >1 field
    
    const { full_name, enrollment_year } = req.body;

    // Create a new student
    const newStudent = await Student.create({
      full_name,
      enrollment_year,
    });

    if (!newStudent) {
      return res.status(400).json({ error: "Failed to create student" });
    }

    res.status(201).json("New student created successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
