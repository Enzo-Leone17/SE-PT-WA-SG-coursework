//Using express routing
const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middleware/authMiddleware");



router.get("/:id/services",  appointmentController.getServicesByAppointmentID);
router.get("/:id/invoice",  appointmentController.getInvoiceByAppointmentID);
router.get("/search", appointmentController.searchAppointments);
router.put("/:id/cancel", appointmentController.cancelAppointment);
router.put("/:id/reschedule", appointmentController.rescheduleAppointment);
router.post("/", appointmentController.createAppointmentWithServices);

module.exports = router;