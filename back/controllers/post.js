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
    .catch((err) => console.log(err));
};

exports.modifyPost = async (req, res) => {
  //Récupération du userId via le token :
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Ce post n'existe pas." });
  }

  await Post.findById(id)
  .then((post) => {
      User.findById(userId)
        .then((currentUser) => {
          if (currentUser === post.posterId || currentUser.role === 2) {
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
  .catch(err => console.log(err))
};

exports.deletePost = async (req, res, next) => {
  //Récupération du userId via le token :
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  const { id } = req.params;
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
