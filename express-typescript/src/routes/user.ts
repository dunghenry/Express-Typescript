import express from 'express';
import userController from './../controllers/userController';
const router = express.Router();
router.get("/users", userController.getAllUsers);
router.post("/users/register", userController.createUser);
router.post("/users/login", userController.login);
export default router;