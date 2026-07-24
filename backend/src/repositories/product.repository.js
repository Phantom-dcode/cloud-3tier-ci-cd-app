import { inMemoryDb } from './inMemoryDb.js';

export const ProductRepository = {
  findAll: async ({ search, category, status, page = 1, limit = 10 }) => {
    let list = [...inMemoryDb.products];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (category && category !== 'all') {
      list = list.filter(p => p.category === category);
    }
    if (status && status !== 'all') {
      list = list.filter(p => p.status === status);
    }

    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + Number(limit));

    return {
      products: paginated,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit) || 1,
    };
  },

  findById: async (id) => {
    return inMemoryDb.products.find(p => p.id === id) || null;
  },

  findBySku: async (sku) => {
    return inMemoryDb.products.find(p => p.sku.toUpperCase() === sku.toUpperCase()) || null;
  },

  create: async (data) => {
    const stock = Number(data.stock) || 0;
    let status = 'in_stock';
    if (stock === 0) status = 'out_of_stock';
    else if (stock <= 10) status = 'low_stock';

    const newProd = {
      id: `prod-${Date.now()}`,
      name: data.name,
      sku: data.sku.toUpperCase(),
      category: data.category,
      price: Number(data.price),
      stock,
      status: data.status || status,
      description: data.description || '',
      createdAt: new Date().toISOString(),
    };
    inMemoryDb.products.unshift(newProd);
    return newProd;
  },

  update: async (id, data) => {
    const index = inMemoryDb.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    let updated = { ...inMemoryDb.products[index], ...data };
    if (data.stock !== undefined) {
      const stock = Number(data.stock);
      if (stock === 0) updated.status = 'out_of_stock';
      else if (stock <= 10) updated.status = 'low_stock';
      else updated.status = 'in_stock';
    }

    inMemoryDb.products[index] = updated;
    return updated;
  },

  delete: async (id) => {
    const index = inMemoryDb.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    inMemoryDb.products.splice(index, 1);
    return true;
  }
};
