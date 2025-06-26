//Using express routing
const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");



router.get("/",  itemController.getAllItems);
router.get("/:id", itemController.getItemByID);


module.exports = router;