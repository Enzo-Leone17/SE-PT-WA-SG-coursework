//Using express routing
const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const authMiddleware = require("../middleware/authMiddleware");



router.get("/:id/appointments",  authMiddleware, patientController.getAppointmentsByPatientID);
router.post("/",  patientController.createPatient);

module.exports = router;