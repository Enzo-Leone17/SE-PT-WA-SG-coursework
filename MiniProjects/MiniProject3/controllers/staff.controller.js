//get required service
const staffService = require("../services/staff.service");

module.exports = {
    getAllStaffs: async (req, res) => {
        try {
            const staffs = await staffService.getAllStaffs(
                req, res
            );
            res.status(200).json(staffs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAssignmentsToStaffID: async (req, res) => {
        try {
            const assignments = await staffService.getAssignmentsToStaffID(
                req, res
            );
            res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAssignmentsToStaffByUserID: async (req, res) => {
        try {
            const assignments = await staffService.getAssignmentsToStaffByUserID(
                req, res
            );
            res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createStaff: async (req, res) => {
        try {
            const newStaff = await staffService.createStaff(req, res);
            res.status(201).json(newStaff);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateStaffByID: async (req, res) => {
        try {
            const updatedStaff = await staffService.updateStaffByID(req, res);
            res.status(200).json(updatedStaff);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    deleteStaffByID: async (req, res) => {
        try {
            const deletedStaff = await staffService.deleteStaffByID(req, res);
            res.status(200).json(deletedStaff);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};