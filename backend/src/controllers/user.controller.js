import { UserService } from '../services/user.service.js';

export const UserController = {
  getUsers: async (req, res, next) => {
    try {
      const result = await UserService.getUsers(req.query);
      res.json({
        success: true,
        data: result.users,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },

  createUser: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const user = await UserService.createUser(req.body, req.user, ip);
      res.status(201).json({
        success: true,
        message: 'User created successfully.',
        data: user,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const user = await UserService.updateUser(req.params.id, req.body, req.user, ip);
      res.json({
        success: true,
        message: 'User updated successfully.',
        data: user,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      await UserService.deleteUser(req.params.id, req.user, ip);
      res.json({
        success: true,
        message: 'User deleted successfully.',
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
};
