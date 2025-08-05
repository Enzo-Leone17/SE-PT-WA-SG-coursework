//require models
const {
  Appointment,
  Doctor,
  Patient,
  Service,
  AppointmentService,
} = require("../models");


module.exports = {
  updateInvoiceStatusByID: async (req, res) => {
    try {
      const { id } = req.params;
      const { payment_status, paid_at } = req.body;
      await Invoice.update({ payment_status, paid_at }, { where: { id } });
      res.json({ message: "Invoice updated" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to update invoice", details: err.message });
    }
  },
};
