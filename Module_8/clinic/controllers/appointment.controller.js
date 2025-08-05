//get required service
const appointmentService = require("../services/appointment.service");

module.exports = {
    getServicesByAppointmentID: async (req, res) => {
        try {
            const services = await appointmentService.getServicesByAppointmentID(req, res);
            res.json(services);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getInvoiceByAppointmentID: async (req, res) => {
        try {
            const invoice = await appointmentService.getInvoiceByAppointmentID(req, res);
            res.json(invoice);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    createAppointmentWithServices: async (req, res) => {
        try {
            const newAppointment = await appointmentService.createAppointmentWithServices(req, res);
            res.status(201).json(newAppointment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    searchAppointments: async (req, res) => {
        try {
            const appointments = await appointmentService.searchAppointments(req, res);
            res.json(appointments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    cancelAppointment: async (req, res) => {
        try {
            await appointmentService.cancelAppointment(req, res);
            res.json({ message: "Appointment cancelled and invoice voided" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    rescheduleAppointment: async (req, res) => {
        try {
            await appointmentService.rescheduleAppointment(req, res);
            res.json({ message: "Appointment rescheduled and services updated" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};