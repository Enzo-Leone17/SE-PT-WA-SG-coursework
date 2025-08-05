//require models
const {
  Appointment,
  Doctor,
  Patient,
  Service,
  AppointmentService,
} = require("../models");

const { Sequelize } = require("sequelize");

module.exports = {
  createCompleteCheckin: async (req) => {
     const { patient, appointment, services } = req.body;
    const t = await sequelize.transaction();
    try {
      const newPatient = await Patient.create(patient, { transaction: t });

      const newAppointment = await Appointment.create(
        {
          ...appointment,
          patient_id: newPatient.id,
          is_deleted: false,
        },
        { transaction: t }
      );

      const serviceItems = services.map((s) => ({
        appointment_id: newAppointment.id,
        service_id: s.service_id,
        quantity: s.quantity,
        is_deleted: false,
      }));
      await AppointmentService.bulkCreate(serviceItems, { transaction: t });

      const totalAmount = services.reduce(
        (sum, s) => sum + s.price * s.quantity,
        0
      );
      await Invoice.create(
        {
          appointment_id: newAppointment.id,
          total_amount: totalAmount,
          payment_status: "Unpaid",
          is_deleted: false,
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json({ message: "Complete check-in created" });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
};
