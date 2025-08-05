//get required service
const invoiceService = require("../services/invoice.service");

module.exports = {
    updateInvoiceStatusByID: async (req, res) => {
        try {
            const invoice = await invoiceService.updateInvoiceStatusByID(req, res);
            res.json(invoice);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};