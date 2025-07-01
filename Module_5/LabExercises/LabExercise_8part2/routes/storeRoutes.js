//Using express routing
const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");

router.get("/allProducts", storeController.getAllProducts);
router.get("/filter", storeController.filter);
router.get("/search", storeController.search);

module.exports = router;