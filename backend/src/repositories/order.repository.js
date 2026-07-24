import { inMemoryDb } from './inMemoryDb.js';

export const OrderRepository = {
  findAll: async ({ search, status, paymentStatus, page = 1, limit = 10 }) => {
    let list = [...inMemoryDb.orders];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(o => o.orderNumber.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q));
    }
    if (status && status !== 'all') {
      list = list.filter(o => o.status === status);
    }
    if (paymentStatus && paymentStatus !== 'all') {
      list = list.filter(o => o.paymentStatus === paymentStatus);
    }

    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + Number(limit));

    return {
      orders: paginated,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit) || 1,
    };
  },

  findById: async (id) => {
    return inMemoryDb.orders.find(o => o.id === id) || null;
  },

  create: async (data) => {
    const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: data.customerName,
      customerEmail: data.customerEmail.toLowerCase(),
      items: data.items,
      totalAmount,
      status: data.status || 'pending',
      paymentStatus: data.paymentStatus || 'paid',
      createdAt: new Date().toISOString(),
    };
    inMemoryDb.orders.unshift(newOrder);
    return newOrder;
  },

  updateStatus: async (id, status, paymentStatus) => {
    const order = inMemoryDb.orders.find(o => o.id === id);
    if (!order) return null;
    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    return order;
  }
};
