const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");


router.get("/",  enrollmentController.getAllEnrollments);

module.exports = router;