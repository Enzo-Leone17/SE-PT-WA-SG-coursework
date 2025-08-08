const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.get("/",  postController.getAllPosts);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePostByID);
router.delete("/:id", postController.deletePostByID);

module.exports = router;