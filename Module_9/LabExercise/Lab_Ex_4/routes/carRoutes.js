//using express routing
const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controller");

router.get("/:brand",  carController.getAllCars);


module.exports = router;