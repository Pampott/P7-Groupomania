const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', postCtrl.getPosts);

router.post('/', auth, multer, postCtrl.createPost);

router.put('/:id', auth, multer, postCtrl.modifyPost);

router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:id/like', postCtrl.likePost);

router.post('/:id/comment', postCtrl.commentPost);

router.put('/:id/comment', auth, postCtrl.editComment);

router.delete('/:id/comment', auth, postCtrl.deleteComment);

module.exports = router;