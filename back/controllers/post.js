const mongoose = require("mongoose");
const { userId } = require("../middlewares/auth");
const Post = require("../models/post");
const User = require("../models/user");
const ObjectId = mongoose.Types.ObjectId;

exports.getPosts = (req, res, next) => {
  Post.find((err, posts) => {
    if (!err) {
      return res.status(200).json(posts);
    } else {
      return res.status(404).json(err);
    }
  });
};

exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "Une erreur est survenue" });
  }
};
exports.createPost = (req, res, next) => {
  const postObject = req.body;
  const post = new Post({
    ...postObject,
    imageUrl: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "",
    likes: 0,
    usersLiked: [],
    createdAt: new Date().toISOString(),
  });

  post
    .save()
    .then(() => res.status(201).json(post))
    .catch((err) => console.log(err));
};

exports.modifyPost = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Ce post n'existe pas." });
  }
  Post.findById(id).then((post) => {
    const message = req.body.message;
    const userId = req.body.userId;
    let image = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : post.imageUrl;
    let updatedPost = {
      posterId: post.posterId,
      message,
      image,
      _id: id,
    };

    if (post.posterId !== userId) {
      return res.status(401).json({ message: "Utilisateur non-autorisé" });
    }
    if (post.posterId === userId || role === 2) {
      Post.updateOne(post, updatedPost, { new: true })
        .then(console.log(updatedPost))
        .catch((err) => console.log(err));
      //.catch((error) => {return res.status(500).json({ error })});
    }
  });
};

exports.deletePost = (req, res, next) => {
  if (Post.posterId !== req.auth.userId) {
    return res
      .status(401)
      .json({ error: new Error("Utilisateur non-autorisé") });
  }
  if (Post.posterId === req.auth.userId || req.auth.role === 2) {
    Post.findByIdAndDelete(req.params.id, (err) => {
      if (!err) res.status(200).json({ message: "Post supprimé !" });
      else console.log(err);
    });
  }
};

exports.likePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.json({ message: "Utilisateur non identifié" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `Aucun poste existant avec cette id: ${id}` });
    }

    const post = await Post.findById(id);

    const index = post.usersLiked.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.usersLiked.push(req.userId);
      post.likes++;
    } else {
      post.usersLiked.splice(req.userId);
      post.likes--;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
