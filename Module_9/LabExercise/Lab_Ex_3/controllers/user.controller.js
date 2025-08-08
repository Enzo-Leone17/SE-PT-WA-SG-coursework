const userService = require("../services/user.service");

const getAllUsers = async (req, res) => {
    try {
        let users = await userService.getAllUsers(req, res);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        let user = await userService.createUser(req, res);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserByID = async (req, res) => {
    try {
        let user = await userService.updateUserByID(req, res);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserByID = async (req, res) => {
    try {
        let user = await userService.deleteUserByID(req, res);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUserByID,
    deleteUserByID,
};