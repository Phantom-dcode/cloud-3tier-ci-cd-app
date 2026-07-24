import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { authenticateJWT, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { validateProduct } from '../validators/product.validator.js';

const router = Router();

router.use(authenticateJWT);

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', authorize('admin', 'manager'), validate(validateProduct), ProductController.createProduct);
router.put('/:id', authorize('admin', 'manager'), ProductController.updateProduct);
router.delete('/:id', authorize('admin'), ProductController.deleteProduct);

export default router;
