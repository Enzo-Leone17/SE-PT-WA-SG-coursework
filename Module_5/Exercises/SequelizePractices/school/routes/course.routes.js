const express = require("express");
const router = express.Router();
const courseContoller = require("../controllers/course.controller");


router.get("/:id/enrollments",  courseContoller.getEnrollmentByCourseID);
router.post("/", courseContoller.createCourse);

module.exports = router;