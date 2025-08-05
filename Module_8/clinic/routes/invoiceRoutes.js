//Using express routing
const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");
const authMiddleware = require("../middleware/authMiddleware");


router.put("/:id", invoiceController.updateInvoiceStatusByID);

module.exports = router;