const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
    .catch((err) => res.status(500).json({err}));
};

exports.modifyPost = async (req, res) => {
  //Récupération du userId via le token :
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  const id = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Ce post n'existe pas." });
  }

  await Post.findById(id)
  .then((post) => {
      User.findById(userId)
        .then((currentUser) => {
          if (currentUser.id === post.posterId || currentUser.role === 2) {
            const newPost = req.file 
            ? {
              ...req.body,
              id,
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            :
            {
              ...req.body, id
            }
            post.updateOne(newPost)
              .then(res.status(200).json({message: "Post modifié"}))
          }
          else {
            res.status(401).json({message : "Non autorisé."})
          }
      })
  })
  .catch(err => res.status(500).json({error: err}))
};

exports.deletePost = async (req, res, next) => {
  //Récupération du userId via le token :
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  const id = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Ce post n'existe pas." });
  }

  await Post.findById(id)
    .then((post) => {
    User.findById(userId)
      .then((currentUser) => {
      if (post.posterId === currentUser.id || currentUser.role === 2) {
        post.delete()
          .then(res.status(200).json({message : "Post supprimé !"}))
          .catch(err => res.status(500).json({err}))
      } else {
        res.status(401).json({message : "Non autorisé."})
      }
    });
  });
};

exports.likePost = async (req, res) => {
  const id = req.params;
  //Récupération du userId via le token :
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Ce post n'existe pas."});
  }

  await Post.findById(id)
    .then((post) => {
        if (req.body.likes === 1) {
          post.usersLiked.push(userId)
          post.likes++;
          res.status(200).json({message : "Publication likée"})
        } else {
          post.usersLiked.splice(userId, 1);
          post.likes
          res.status(202).json({message : "Retrait du like"})
        }
    })
};
