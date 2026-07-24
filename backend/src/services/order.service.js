import { OrderRepository } from '../repositories/order.repository.js';
import { ActivityRepository } from '../repositories/activity.repository.js';

export const OrderService = {
  getOrders: async (queryParams) => {
    return OrderRepository.findAll(queryParams);
  },

  getOrderById: async (id) => {
    const order = await OrderRepository.findById(id);
    if (!order) throw new Error('Order not found.');
    return order;
  },

  createOrder: async (orderData, currentUser, ipAddress) => {
    const order = await OrderRepository.create(orderData);

    await ActivityRepository.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'ORDER_CREATED',
      category: 'order',
      details: `Created new order ${order.orderNumber} ($${order.totalAmount})`,
      ipAddress,
    });

    return order;
  },

  updateOrderStatus: async (id, status, paymentStatus, currentUser, ipAddress) => {
    const updated = await OrderRepository.updateStatus(id, status, paymentStatus);
    if (!updated) throw new Error('Order not found.');

    await ActivityRepository.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'ORDER_STATUS_UPDATED',
      category: 'order',
      details: `Updated order ${updated.orderNumber} status to '${status}'`,
      ipAddress,
    });

    return updated;
  }
};
