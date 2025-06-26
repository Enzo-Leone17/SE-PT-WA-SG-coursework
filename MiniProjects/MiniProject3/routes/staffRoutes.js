//Using express routing
const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff.controller");



router.get("/",  staffController.getAllStaffs);
router.get("/:id/assignments", staffController.getAssignmentsToStaffID);
router.post("/", staffController.createStaff);
router.put("/:id", staffController.updateStaffByID);
router.put("/:id/delete", staffController.deleteStaffByID);

module.exports = router;