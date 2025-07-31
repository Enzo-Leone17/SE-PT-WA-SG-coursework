//Using express routing
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");



router.post("/login",  authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);
router.put("/:user_id/changePassword", authController.changePassword);


module.exports = router;