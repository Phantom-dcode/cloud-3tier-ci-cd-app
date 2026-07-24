import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  register: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const result = await AuthService.register(req.body, ip);
      res.status(201).json({
        success: true,
        message: 'Account registered successfully.',
        data: result,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  login: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const result = await AuthService.login(req.body, ip);
      res.json({
        success: true,
        message: 'Login successful.',
        data: result,
      });
    } catch (err) {
      res.status(401).json({ success: false, error: err.message });
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const profile = await AuthService.getProfile(req.user.id);
      res.json({
        success: true,
        data: profile,
      });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const updated = await AuthService.updateProfile(req.user.id, req.body, ip);
      res.json({
        success: true,
        message: 'Profile updated successfully.',
        data: updated,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
};
