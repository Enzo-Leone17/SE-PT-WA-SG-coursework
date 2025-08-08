const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");

router.get("/",  commentController.getAllComments);
router.Comment("/", commentController.createComment);
router.put("/:id", commentController.updateCommentByID);
router.delete("/:id", commentController.deleteCommentByID);

module.exports = router;