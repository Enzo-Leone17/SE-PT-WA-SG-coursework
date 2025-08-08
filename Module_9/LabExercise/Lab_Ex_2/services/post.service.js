"use strict";
let Models = require("../models");

const getAllPosts = async (req, res) => {
  try {
    let posts = await Models.Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    let post = await new Models.Post(req.body).save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePostByID = async (req, res) => {
  try {
    let post = await Models.Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePostByID = async (req, res) => {
  try {
    let post = await Models.Post.findByIdAndDelete(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePostByID,
  deletePostByID,
};
