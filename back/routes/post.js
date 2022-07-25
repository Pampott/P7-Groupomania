const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', postCtrl.getPosts);

router.get('/:id', postCtrl.getOnePost);

router.post('/', multer, postCtrl.createPost);

router.put('/:id', multer, postCtrl.modifyPost);

router.delete('/:id', postCtrl.deletePost);

router.post('/:id/like', postCtrl.likePost);

router.post('/:id/comment', postCtrl.commentPost);

router.put('/:id/comment', postCtrl.editComment);

router.delete('/:id/comment', postCtrl.deleteComment);

module.exports = router;