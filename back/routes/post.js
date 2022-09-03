const express = require('express');
const router = express.Router();
const postController = require('../controllers/post')
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', auth, postController.getPosts);

router.post('/', auth, multer, postController.createPost);

router.put('/:id', auth, multer, postController.modifyPost);

router.delete('/:id', auth, postController.deletePost);

router.patch('/:id/like', auth, postController.likePost);

module.exports = router;