import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { UserRepository } from '../repositories/user.repository.js';

export const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication failed. Bearer token missing.',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await UserRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication failed. User account no longer exists.',
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: `Account access forbidden. Status is currently '${user.status}'.`,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired JWT token.',
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized user.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden access. Requires role [${roles.join(', ')}], but user role is '${req.user.role}'.`,
      });
    }
    next();
  };
};
