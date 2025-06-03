const express = require("express");
const router = express.Router();
const courseContoller = require("../controllers/course.controller");


router.get("/:id/enrollments",  courseContoller.getEnrollmentByCourseID);

module.exports = router;