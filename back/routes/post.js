import { Router } from 'express';
const router = Router();
import { getPosts, createPost, modifyPost, deletePost, likePost } from '../controllers/post';
import auth from '../middlewares/auth';
import multer from '../middlewares/multer-config';

router.get('/', getPosts);

router.post('/', auth, multer, createPost);

router.put('/:id', auth, multer, modifyPost);

router.delete('/:id', auth, deletePost);

router.post('/:id/like', likePost);
export default router;