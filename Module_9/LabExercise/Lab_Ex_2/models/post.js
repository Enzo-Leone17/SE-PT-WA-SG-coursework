const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  title: { type: String, trim: true, required: true},
  description: { type: String, trim: true, required: true },
  image: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("post", postSchema);
