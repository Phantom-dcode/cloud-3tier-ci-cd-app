import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authenticateJWT, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { validateCreateUser, validateUpdateUser } from '../validators/user.validator.js';

const router = Router();

router.use(authenticateJWT);

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', authorize('admin'), validate(validateCreateUser), UserController.createUser);
router.put('/:id', authorize('admin', 'manager'), validate(validateUpdateUser), UserController.updateUser);
router.delete('/:id', authorize('admin'), UserController.deleteUser);

export default router;
