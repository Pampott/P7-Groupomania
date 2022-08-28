const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', postCtrl.getPosts);

router.post('/', auth, multer, postCtrl.createPost);

router.put('/:id', auth, multer, postCtrl.modifyPost);

router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:id/like', auth, postCtrl.likePost);

router.post('/:id/comment', auth, postCtrl.commentPost);

router.delete('/:id/comment', auth, postCtrl.deleteComment);

module.exports = router;