
const db = require("../models/index");


const getAllPosts = async (req, res) => {
    try {
        const posts = await db.Post.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const newpost = await db.Post.create(req.body);
        res.json(newpost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updatePostByID = async (req, res) => {
    try {
        const updatedpost = await db.Post.update(req.body, {
            where: { id: req.params.id },
        });
        res.json("Successfully updated post id:" + req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deletePostByID = async (req, res) => {
    try {
        const deletedpost = await db.Post.destroy({
            where: { id: req.params.id },
        });
        res.json("Successfully deleted post id:" + req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    updatePostByID,
    deletePostByID,
};