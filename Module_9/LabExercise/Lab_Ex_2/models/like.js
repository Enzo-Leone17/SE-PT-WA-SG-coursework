const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const likeSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
  has_liked: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("like", likeSchema);
