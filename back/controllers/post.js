const mongoose = require("mongoose");
const fs = require('fs');
const Post = require("../models/post");
const user = require("../models/user");
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

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  const post = new Post({
    posterId: req.body.posterId,
    message: req.body.message,
    imageUrl: req.body.imageUrl
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "",
  });

  post
    .save()
    .then(() => res.status(201).json(post))
    .catch((err) => console.log(err));
};

exports.modifyPost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("ID inconnu: " + req.params.id);
  }

  if (
    ObjectId.isValid(req.params.id) ||
    user.role === user.roles.administrator
  ) {
    const updatedRecord = {
      message: req.body.message,
    };
    Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log(err);
      }
    );
  }
};

exports.deletePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("ID inconnu: " + req.params.id);
  }

  if (ObjectId.isValid(req.params.id) || user.role === user.roles.administrator)
    Post.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.status(200).json({ message: "Post supprimé !" });
      else console.log(err);
    });
};

exports.likePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("ID inconnu: " + req.params.id);
  }

  Post.findOne(req.params.id).then((post) => {
    if (!post)
      return res.status(404).json({ message: "Ce post n'existe pas." });
  });

  if (req.body.like === 1) {
    return res
      .status(500)
      .json({ message: "Post déjà liké par cet utilisateur" });
  } else {
    Post.usersLiked.push(req.body.userId);
    Post.likes++;
  }
};

exports.commentPost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("ID inconnu: " + req.params.id);
  }

  Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          text: req.body.text,
          timestamp: new Date().getTime(),
        },
      },
    },
    { new: true },
    (err, docs) => {
      if (!err) return res.status(201).json(docs);
      else return res.status(400).json(err);
    }
  );
};

exports.editComment = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("ID inconnu: " + req.params.id);
  }

  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        comments: {
          text: req.body.text,
          timestamp: new Date().getTime(),
        },
      },
    },
    { new: true },
    (err, res) => {
      if (!err)
        return res.status(200).json({ message: "Commentaire modifié !" });
      else return res.status(401).json(err);
    }
  );
};

exports.deleteComment = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("ID inconnu: " + req.params.id);
  }
  if (
    ObjectId.isValid(req.params.id) ||
    user.role === user.roles.administrator
  ) {
    Post.findByIdAndDelete(req.params.id, {
      $,
    });
  }
};
