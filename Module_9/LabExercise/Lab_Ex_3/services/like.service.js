
const db = require("../models/index");


const getAllLikes = async (req, res) => {
    try {
        const likes = await db.Like.findAll();
        res.json(likes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const createLike = async (req, res) => {
    try {
        const newlike = await db.Like.create(req.body);
        res.json(newlike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateLikeByID = async (req, res) => {
    try {
        const updatedlike = await db.Like.update(req.body, {
            where: { id: req.params.id },
        });
        res.json("Successfully updated like id:" + req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteLikeByID = async (req, res) => {
    try {
        const deletedlike = await db.Like.destroy({
            where: { id: req.params.id },
        });
        res.json("Successfully deleted like id:" + req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllLikes,
    createLike,
    updateLikeByID,
    deleteLikeByID,
};