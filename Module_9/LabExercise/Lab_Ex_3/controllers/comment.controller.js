const commentService = require("../services/comment.service");

const getAllComments = async (req, res) => {
    try {
        let comments = await commentService.getAllComments(req, res);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createComment = async (req, res) => {
    try {
        let comment = await commentService.createComment(req, res);
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCommentByID = async (req, res) => {
    try {
        let comment = await commentService.updateCommentByID(req, res);
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCommentByID = async (req, res) => {
    try {
        let comment = await commentService.deleteCommentByID(req, res);
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllComments,
    createComment,
    updateCommentByID,
    deleteCommentByID,
};