import { inMemoryDb } from '../repositories/inMemoryDb.js';

export const DashboardService = {
  getStats: async () => {
    const orders = inMemoryDb.orders;
    const products = inMemoryDb.products;
    const users = inMemoryDb.users;
    const activities = inMemoryDb.activities;

    const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);
    const totalOrders = orders.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const inventoryCount = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStockItems = products.filter(p => p.stock <= 10).length;

    // Monthly revenue chart aggregation
    const monthlyRevenue = [
      { month: 'Jan', revenue: 14200, orders: 32 },
      { month: 'Feb', revenue: 18500, orders: 45 },
      { month: 'Mar', revenue: 22100, orders: 54 },
      { month: 'Apr', revenue: 19800, orders: 48 },
      { month: 'May', revenue: 27400, orders: 68 },
      { month: 'Jun', revenue: 31200, orders: 75 },
      { month: 'Jul', revenue: totalRevenue || 38900, orders: totalOrders || 82 },
    ];

    // Category distribution
    const categoryMap = {};
    products.forEach(p => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    });
    const categoryDistribution = Object.keys(categoryMap).map(cat => ({
      name: cat,
      value: categoryMap[cat],
    }));

    // Order status counts
    const statusMap = {};
    orders.forEach(o => {
      statusMap[o.status] = (statusMap[o.status] || 0) + 1;
    });
    const orderStatusOverview = Object.keys(statusMap).map(st => ({
      status: st,
      count: statusMap[st],
    }));

    return {
      totalRevenue,
      revenueGrowth: 14.8,
      totalOrders,
      ordersGrowth: 11.2,
      activeUsers,
      usersGrowth: 8.5,
      inventoryCount,
      lowStockItems,
      recentActivities: activities.slice(0, 10),
      monthlyRevenue,
      categoryDistribution: categoryDistribution.length ? categoryDistribution : [
        { name: 'Cloud Solutions', value: 4 },
        { name: 'DevOps & Tooling', value: 3 },
        { name: 'Security', value: 2 },
        { name: 'Database & Storage', value: 2 }
      ],
      orderStatusOverview,
    };
  }
};
