const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  posterId: { type: String, required: true },
  message: { type: String },
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  comments: {
    type: [
      {
        commenterId: { type: String },
        text: { type: String },
        timestamp: { type: Number },
      },
    ],
  },
  timestamps: {type: Boolean}
});

module.exports = mongoose.model("Post", postSchema);
