//Using express routing
const express = require("express");
const router = express.Router();
const binLocationController = require("../controllers/bin_location.controller");

router.get("/",  binLocationController.getAllBinLocations);
router.get("/:id", binLocationController.getBinLocationByID);
router.post("/", binLocationController.createBinLocation);
router.put("/:id", binLocationController.updateBinLocationByID);
router.put("/:id/delete", binLocationController.deleteBinLocationByID);



module.exports = router;