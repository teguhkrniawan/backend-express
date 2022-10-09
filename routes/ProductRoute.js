import express from "express"
import {
    getProduct,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController.js'
import { verifyUser } from './../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/Products', verifyUser, getProduct);
router.get('/Products/:id', verifyUser, getProductId);
router.post('/Products', verifyUser, createProduct);
router.patch('/Products/:id', verifyUser, updateProduct);
router.delete('/Products/:id', verifyUser, deleteProduct);

export default router
