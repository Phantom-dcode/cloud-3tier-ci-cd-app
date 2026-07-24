import { inMemoryDb } from './inMemoryDb.js';

export const UserRepository = {
  findAll: async ({ search, role, status, page = 1, limit = 10 }) => {
    let list = [...inMemoryDb.users];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.department && u.department.toLowerCase().includes(q)));
    }
    if (role && role !== 'all') {
      list = list.filter(u => u.role === role);
    }
    if (status && status !== 'all') {
      list = list.filter(u => u.status === status);
    }

    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + Number(limit));

    return {
      users: paginated.map(({ password, ...u }) => u),
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit) || 1,
    };
  },

  findById: async (id) => {
    const u = inMemoryDb.users.find(user => user.id === id);
    if (!u) return null;
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  },

  findByEmailWithPassword: async (email) => {
    return inMemoryDb.users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  },

  create: async (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password,
      role: userData.role || 'user',
      status: userData.status || 'active',
      department: userData.department || 'Engineering',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    inMemoryDb.users.unshift(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  update: async (id, updateData) => {
    const index = inMemoryDb.users.findIndex(u => u.id === id);
    if (index === -1) return null;

    inMemoryDb.users[index] = {
      ...inMemoryDb.users[index],
      ...updateData,
    };

    const { password, ...userWithoutPassword } = inMemoryDb.users[index];
    return userWithoutPassword;
  },

  delete: async (id) => {
    const index = inMemoryDb.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    inMemoryDb.users.splice(index, 1);
    return true;
  },

  updateLastLogin: async (id) => {
    const user = inMemoryDb.users.find(u => u.id === id);
    if (user) {
      user.lastLogin = new Date().toISOString();
    }
  }
};
