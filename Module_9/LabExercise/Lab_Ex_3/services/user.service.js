
const db = require("../models/index");


const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await db.User.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateUserByID = async (req, res) => {
    try {
        const updatedUser = await db.User.update(req.body, {
            where: { id: req.params.id },
        });
        res.json("Successfully updated user id:" + req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteUserByID = async (req, res) => {
    try {
        const deletedUser = await db.User.destroy({
            where: { id: req.params.id },
        });
        res.json("Successfully deleted user id:" + req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUserByID,
    deleteUserByID,
};