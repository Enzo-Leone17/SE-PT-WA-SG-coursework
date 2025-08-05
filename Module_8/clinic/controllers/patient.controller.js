//get required service
const patientService = require("../services/patient.service");

module.exports = {
    getAppointmentsByPatientID: async (req, res) => {
        try {
            const appointments = await patientService.getAppointmentsByPatientID(
                req, res
            );
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createPatient : async (req, res) => {
        try {
            const patient = await patientService.createPatient(req, res);
            res.status(201).json(patient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};