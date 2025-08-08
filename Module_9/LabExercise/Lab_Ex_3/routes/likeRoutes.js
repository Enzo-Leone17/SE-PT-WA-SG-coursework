const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like.controller");

router.get("/",  likeController.getAllLikes);
router.post("/", likeController.createLike);
router.put("/:id", likeController.updateLikeByID);
router.delete("/:id", likeController.deleteLikeByID);

module.exports = router;