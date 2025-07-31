//get required service
const taskService = require("../services/task.service");

module.exports = {
    getAllTasks: async (req, res) => {
        try {
            const tasks = await taskService.getAllTasks(
                req, res
            );
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getTaskByID: async (req, res) => {
        try {
            const task = await taskService.getTaskByID(
                req, res
            );
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createTask: async (req, res) => {
        try {
            const newTask = await taskService.createTask(req, res);
            res.status(201).json(newTask);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateTaskByID: async (req, res) => {
        try {
            const updatedTask = await taskService.updateTaskByID(req, res);
            res.status(200).json(updatedTask);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    deleteTaskByID: async (req, res) => {
        try {
            const deletedTask = await taskService.deleteTaskByID(req, res);
            res.status(200).json(deletedTask);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};