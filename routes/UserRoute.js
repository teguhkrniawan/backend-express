import express from "express"
import {
    getUser,
    getUserId,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/UserController.js'
import { adminOnly, verifyUser } from "../middleware/AuthMiddleware.js"; // agar middleware nya ada

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUser);
router.get('/users/:id', verifyUser, getUserId);
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router
