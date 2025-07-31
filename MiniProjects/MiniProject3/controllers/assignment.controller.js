//get required service
const assignmentService = require("../services/assignment.service");

module.exports = {
    getAllAssignments: async (req, res) => {
        try {
            const assignments = await assignmentService.getAllAssignments(
                req, res
            );
            res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAssignmentByID: async (req, res) => {
        try {
            const assignment = await assignmentService.getAssignmentByID(
                req, res
            );
            res.status(200).json(assignment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createAssignment: async (req, res) => {
        try {
            const newAssignment = await assignmentService.createAssignment(req, res);
            res.status(201).json(newAssignment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateAssignmentByID: async (req, res) => {
        try {
            const updatedAssignment = await assignmentService.updateAssignmentByID(req, res);
            res.status(200).json(updatedAssignment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    deleteAssignmentByID: async (req, res) => {
        try {
            const deletedAssignment = await assignmentService.deleteAssignmentByID(req, res);
            res.status(200).json(deletedAssignment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};