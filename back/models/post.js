const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  posterId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  message: { type: String },
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Post", postSchema);
