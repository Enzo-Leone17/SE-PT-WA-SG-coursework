//Using express routing
const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const authMiddleware = require("../middleware/authMiddleware");



router.get("/:specialty",  authMiddleware, doctorController.getDoctorsBySpecialty);
router.get("/",  authMiddleware, doctorController.getAllDoctors);
router.get("/specialties/listUnique",  authMiddleware, doctorController.getUniqueDoctorSpecialties);

module.exports = router;