import { OrderService } from '../services/order.service.js';

export const OrderController = {
  getOrders: async (req, res, next) => {
    try {
      const result = await OrderService.getOrders(req.query);
      res.json({
        success: true,
        data: result.orders,
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

  getOrderById: async (req, res, next) => {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.json({ success: true, data: order });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },

  createOrder: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const order = await OrderService.createOrder(req.body, req.user, ip);
      res.status(201).json({
        success: true,
        message: 'Order placed successfully.',
        data: order,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  updateOrderStatus: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const { status, paymentStatus } = req.body;
      const order = await OrderService.updateOrderStatus(req.params.id, status, paymentStatus, req.user, ip);
      res.json({
        success: true,
        message: 'Order status updated successfully.',
        data: order,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
};
