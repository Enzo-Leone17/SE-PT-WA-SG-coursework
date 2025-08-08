"use strict";
let Models = require("../models");

const getAllLikes = async (req, res) => {
  try {
    let likes = await Models.Like.find({});
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLike = async (req, res) => {
  try {
    let like = await new Models.Like(req.body).save();
    res.json(like);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLikeByID = async (req, res) => {
  try {
    let like = await Models.Like.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(like);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLikeByID = async (req, res) => {
  try {
    let like = await Models.Like.findByIdAndDelete(req.params.id);
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
