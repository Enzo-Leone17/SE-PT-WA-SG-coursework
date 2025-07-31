//Using express routing
const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignment.controller");


router.get("/",  assignmentController.getAllAssignments);
router.get("/:id", assignmentController.getAssignmentByID);
router.post("/", assignmentController.createAssignment);
router.put("/:id", assignmentController.updateAssignmentByID);
router.put("/:id/delete", assignmentController.deleteAssignmentByID);


module.exports = router;