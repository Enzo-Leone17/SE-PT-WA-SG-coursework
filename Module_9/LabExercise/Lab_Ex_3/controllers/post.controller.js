const postService = require("../services/post.service");

const getAllPosts = async (req, res) => {
    try {
        let posts = await postService.getAllPosts(req, res);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        let post = await postService.createPost(req, res);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePostByID = async (req, res) => {
    try {
        let post = await postService.updatePostByID(req, res);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePostByID = async (req, res) => {
    try {
        let post = await postService.deletePostByID(req, res);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    updatePostByID,
    deletePostByID,
};