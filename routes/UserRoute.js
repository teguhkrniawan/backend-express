import express from "express"
import {
    getUser,
    getUserId,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/UserController.js'

const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUserId);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router
