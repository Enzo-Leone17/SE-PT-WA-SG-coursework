const likeService = require("../services/like.service");

const getAllLikes = async (req, res) => {
    try {
        let likes = await likeService.getAllLikes(req, res);
        res.json(likes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createLike = async (req, res) => {
    try {
        let like = await likeService.createLike(req, res);
        res.json(like);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateLikeByID = async (req, res) => {
    try {
        let like = await likeService.updateLikeByID(req, res);
        res.json(like);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteLikeByID = async (req, res) => {
    try {
        let like = await likeService.deleteLikeByID(req, res);
        res.json(like);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllLikes,
    createLike,
    updateLikeByID,
    deleteLikeByID,
};