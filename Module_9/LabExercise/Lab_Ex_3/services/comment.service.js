
const db = require("../models/index");


const getAllComments = async (req, res) => {
    try {
        const comments = await db.Comment.findAll();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const createComment = async (req, res) => {
    try {
        const newcomment = await db.Comment.create(req.body);
        res.json(newcomment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateCommentByID = async (req, res) => {
    try {
        const updatedcomment = await db.Comment.update(req.body, {
            where: { id: req.params.id },
        });
        res.json("Successfully updated comment id:" + req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteCommentByID = async (req, res) => {
    try {
        const deletedcomment = await db.Comment.destroy({
            where: { id: req.params.id },
        });
        res.json("Successfully deleted comment id:" + req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllComments,
    createComment,
    updateCommentByID,
    deleteCommentByID,
};