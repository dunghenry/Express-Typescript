import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/auth';
import postController from '../controllers/postController';
router.get('/posts/total', verifyToken, postController.getAllPosts)
router.post('/posts', verifyToken, postController.createPost);
router.get('/posts/:id', verifyToken, postController.getPost);
router.put('/posts/:id', verifyToken, postController.updatePostAuth);
router.get('/posts', verifyToken, postController.getPostsAuth);
export default router;