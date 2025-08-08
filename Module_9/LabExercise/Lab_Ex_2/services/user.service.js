"use strict";
let Models = require("../models");

const getAllUsers = async (req, res) => {
  try {
    let users = await Models.User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    let user = await new Models.User(req.body).save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserByID = async (req, res) => {
  try {
    let user = await Models.User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserByID = async (req, res) => {
  try {
    let user = await Models.User.findByIdAndDelete(req.params.id);
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
