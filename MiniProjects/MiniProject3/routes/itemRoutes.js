//Using express routing
const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");



router.get("/",  itemController.getAllItems);
router.get("/:id", itemController.getItemByID);
router.post("/", itemController.createItem);
router.put("/:id/quantity", itemController.updateItemQuantityByID);
router.put("/:id/typing", itemController.updateItemTypingByID);
router.put("/:id/delete", itemController.deleteItemByID);


module.exports = router;