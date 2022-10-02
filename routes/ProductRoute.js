import express from "express"
import {
    getProduct,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController.js'

const router = express.Router();

router.get('/Products', getProduct);
router.get('/Products/:id', getProductId);
router.post('/Products', createProduct);
router.patch('/Products/:id', updateProduct);
router.delete('/Products/:id', deleteProduct);

export default router
