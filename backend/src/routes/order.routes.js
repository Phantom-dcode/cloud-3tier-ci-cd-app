import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { authenticateJWT, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { validateOrder } from '../validators/order.validator.js';

const router = Router();

router.use(authenticateJWT);

router.get('/', OrderController.getOrders);
router.get('/:id', OrderController.getOrderById);
router.post('/', validate(validateOrder), OrderController.createOrder);
router.put('/:id/status', authorize('admin', 'manager'), OrderController.updateOrderStatus);

export default router;
