import { inMemoryDb } from './inMemoryDb.js';

export const ActivityRepository = {
  findAll: async ({ limit = 20, category }) => {
    let list = [...inMemoryDb.activities];
    if (category && category !== 'all') {
      list = list.filter(a => a.category === category);
    }
    return list.slice(0, Number(limit));
  },

  log: async ({ userId, userName, userRole, action, category, details, ipAddress }) => {
    return inMemoryDb.logActivity(userId, userName, userRole, action, category, details, ipAddress);
  }
};
