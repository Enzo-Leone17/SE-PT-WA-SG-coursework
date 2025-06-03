const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);

module.exports = router;
