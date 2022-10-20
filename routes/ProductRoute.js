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

router.get('/products', verifyUser, getProduct);
router.get('/products/:id', verifyUser, getProductId);
router.post('/products', verifyUser, createProduct);
router.patch('/products/:id', verifyUser, updateProduct);
router.delete('/products/:id', verifyUser, deleteProduct);

export default router
