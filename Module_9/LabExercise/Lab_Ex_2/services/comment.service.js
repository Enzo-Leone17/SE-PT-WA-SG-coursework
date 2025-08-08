"use strict";
let Models = require("../models");

const getAllComments = async (req, res) => {
  try {
    let comments = await Models.Comment.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    let comment = await new Models.Comment(req.body).save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCommentByID = async (req, res) => {
  try {
    let comment = await Models.Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCommentByID = async (req, res) => {
  try {
    let comment = await Models.Comment.findByIdAndDelete(req.params.id);
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
