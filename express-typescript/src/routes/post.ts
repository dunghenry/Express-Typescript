import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/auth';
import postController from '../controllers/postController';
router.post('/posts', verifyToken, postController.createPost);

export default router;