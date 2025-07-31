//Using express routing
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.get("/",  taskController.getAllTasks);
router.get("/:id", taskController.getTaskByID);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTaskByID);
router.put("/:id/delete", taskController.deleteTaskByID);



module.exports = router;