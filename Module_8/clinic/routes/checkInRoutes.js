//Using express routing
const express = require("express");
const router = express.Router();
const checkInController = require("../controllers/checkIn.controller");
const authMiddleware = require("../middleware/authMiddleware");



router.post("/",  checkInController.createCompleteCheckin);

module.exports = router;