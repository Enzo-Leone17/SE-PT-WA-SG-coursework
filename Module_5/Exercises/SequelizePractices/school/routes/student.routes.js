const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.get("/", studentController.getStudentsByQuery);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.createStudent);


module.exports = router;
