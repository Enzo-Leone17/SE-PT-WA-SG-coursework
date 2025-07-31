//Using express routing
const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager.controller");

router.get("/",  managerController.getAllManagers);
router.get("/:id", managerController.getManagerByID);
router.get("/user/:id", managerController.getManagerByUserID);
router.post("/", managerController.createManager);
router.put("/:id", managerController.updateManagerByID);
router.put("/:id/delete", managerController.deleteManagerByID);



module.exports = router;