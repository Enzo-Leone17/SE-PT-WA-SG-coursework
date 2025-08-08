const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/",  userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUserByID);
router.delete("/:id", userController.deleteUserByID);

module.exports = router;