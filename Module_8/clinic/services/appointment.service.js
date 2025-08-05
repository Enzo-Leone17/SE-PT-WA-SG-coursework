//require models
const {
  Appointment,
  Doctor,
  Patient,
  Service,
  AppointmentService,
  Invoice,
} = require("../models");

const { Sequelize } = require("sequelize");

module.exports = {
  //#region getServicesByAppointmentID
  getServicesByAppointmentID: async (req, res) => {
    try {
      const appointmentID = req.params.id;
      if (!appointmentID || isNaN(Number(appointmentID))) {
        return res
          .status(400)
          .json({ error: "Valid appointment ID is required" });
      }
      console.log(appointmentID);
      const results = await AppointmentService.findAll({
        include: [
          {
            model: Service,
            required: true,
            attributes: [], // hide attributes
          },
        ],
        attributes: [
          [Sequelize.literal("`Service`.`name`"), "serviceName"], // Access the name from the 'services' table
          "quantity",
          [
            Sequelize.literal(
              "SUM(`AppointmentService`.`quantity`) * SUM(`Service`.`price`)"
            ),
            "totalPrice",
          ],
        ],
        where: {
          appointment_id: appointmentID,
        },
        group: ["serviceName", "quantity"],
      });

      return results;
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve services in appointment",
        details: err.message,
      });
    }
  },
  //#endregion

  //#region createAppointmentWithServices
  createAppointmentWithServices: async (req) => {
    const { patient_id, doctor_id, scheduled_at, services } = req.body;
    const t = await sequelize.transaction();
    try {
      const appointment = await Appointment.create(
        {
          patient_id,
          doctor_id,
          scheduled_at,
          status: "Scheduled",
          is_deleted: false,
        },
        { transaction: t }
      );

      const items = services.map((s) => ({
        appointment_id: appointment.id,
        service_id: s.service_id,
        quantity: s.quantity,
        is_deleted: false,
      }));

      await AppointmentService.bulkCreate(items, { transaction: t });
      await t.commit();

      res.status(201).json({
        message: "Appointment created",
        appointment_id: appointment.id,
      });
    } catch (err) {
      await t.rollback();
      res
        .status(500)
        .json({ error: "Failed to create appointment", details: err.message });
    }
  },
  //#endregion
  //#region getInvoiceByAppointmentID
  getInvoiceByAppointmentID: async (req, res) => {
    try {
      const { id } = req.params;

      const invoice = await Invoice.findOne({ where: { appointment_id: id } });
      const items = await AppointmentService.findAll({
        where: { appointment_id: id, is_deleted: false },
        include: Service,
      });

      const services = items.map((item) => ({
        name: item.Service.name,
        qty: item.quantity,
        price: parseFloat(item.Service.price),
      }));

      const total_amount = services.reduce(
        (sum, s) => sum + s.qty * s.price,
        0
      );

      res.json({
        appointment_id: id,
        total_amount,
        status: invoice?.payment_status || "Unpaid",
        services,
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to get invoice", details: err.message });
    }
  },
  //#endregion
  searchAppointments: async (req, res) => {
    try {
      const { doctorName, status, startDate, endDate } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const where = { is_deleted: false };

      if (status) {
        where.status = status;
      }

      if (startDate && endDate) {
        where.scheduled_at = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      }

      const doctorFilter = doctorName
        ? {
            model: Doctor,
            attributes: ["id", "name", "specialty"],
            where: {
              name: { [Op.like]: `%${doctorName}%` },
              is_deleted: false,
            },
          }
        : {
            model: Doctor,
            attributes: ["id", "name", "specialty"],
            where: { is_deleted: false },
          };

      const { count, rows: appointments } = await Appointment.findAndCountAll({
        where,
        include: [
          doctorFilter,
          {
            model: Patient,
            attributes: ["id", "full_name", "dob", "email", "phone"],
          },
        ],
        attributes: ["id", "scheduled_at", "status", "notes"],
        limit,
        offset,
      });

      res.json({
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        appointments,
      });
    } catch (err) {
      res.status(500).json({
        error: "Failed to search appointments",
        details: err.message,
      });
    }
  },
  cancelAppointment: async (req, res) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
      await Appointment.update(
        { status: "Cancelled", is_deleted: true },
        { where: { id }, transaction: t }
      );

      await AppointmentService.update(
        { is_deleted: true },
        { where: { appointment_id: id }, transaction: t }
      );

      await Invoice.update(
        { payment_status: "Voided", is_deleted: true },
        { where: { appointment_id: id }, transaction: t }
      );

      await t.commit();
      res.json({ message: "Appointment cancelled and invoice voided" });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },

  rescheduleAppointment: async (req, res) => {
    const { id } = req.params;
    const { doctor_id, scheduled_at, services } = req.body;
    const t = await sequelize.transaction();
    try {
      await Appointment.update(
        { doctor_id, scheduled_at },
        { where: { id }, transaction: t }
      );

      await AppointmentService.destroy({
        where: { appointment_id: id },
        transaction: t,
      });

      const newServices = services.map((s) => ({
        appointment_id: id,
        service_id: s.service_id,
        quantity: s.quantity,
        is_deleted: false,
      }));

      await AppointmentService.bulkCreate(newServices, { transaction: t });
      await t.commit();

      res.json({ message: "Appointment rescheduled and services updated" });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
};
