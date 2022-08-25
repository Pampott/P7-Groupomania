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

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  const post = new Post({
      ...postObject,
      imageUrl:  req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "",
      likes : 0,           
      usersLiked : [], 
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

  Post.findById(req.params.id).then((post) => {
    if (!post)
      return res.status(404).json({ message: "Ce post n'existe pas." });
    else {
      if (post.usersLiked.includes(req.body.userId)) {
        post.usersLiked.shift(req.body.userId);
        post.likes--;
        console.log(post);
      } else {
        post.usersLiked.push(req.body.userId);
        post.likes++;
        console.log(post);
        return res.status(200).json({message: "post liké !"})
      }
    }
  });

  
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
          commenterName: req.body.commenterName,
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
