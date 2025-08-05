//get required service
const doctorService = require("../services/doctor.service");

module.exports = {
    getDoctorsBySpecialty: async (req, res) => {
        try {
            const doctors = await doctorService.getDoctorsBySpecialty(
                req, res
            );
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllDoctors: async (req, res) => {
        try {
            const doctors = await doctorService.getAllDoctors(
                req, res
            );
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getUniqueDoctorSpecialties: async (req, res) => {
        try {
            const specialties = await doctorService.getUniqueDoctorSpecialties(
                req, res
            );
            res.status(200).json(specialties);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};