import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';
import { authRateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/register', authRateLimiter, validate(validateRegister), AuthController.register);
router.post('/login', authRateLimiter, validate(validateLogin), AuthController.login);
router.get('/profile', authenticateJWT, AuthController.getProfile);
router.put('/profile', authenticateJWT, AuthController.updateProfile);

export default router;
