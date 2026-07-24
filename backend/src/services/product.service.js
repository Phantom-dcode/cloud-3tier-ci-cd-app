import { ProductRepository } from '../repositories/product.repository.js';
import { ActivityRepository } from '../repositories/activity.repository.js';

export const ProductService = {
  getProducts: async (queryParams) => {
    return ProductRepository.findAll(queryParams);
  },

  getProductById: async (id) => {
    const p = await ProductRepository.findById(id);
    if (!p) throw new Error('Product not found.');
    return p;
  },

  createProduct: async (productData, currentUser, ipAddress) => {
    const existingSku = await ProductRepository.findBySku(productData.sku);
    if (existingSku) throw new Error(`Product with SKU '${productData.sku}' already exists.`);

    const product = await ProductRepository.create(productData);

    await ActivityRepository.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'PRODUCT_CREATED',
      category: 'product',
      details: `Created product ${product.name} [SKU: ${product.sku}]`,
      ipAddress,
    });

    return product;
  },

  updateProduct: async (id, updateData, currentUser, ipAddress) => {
    if (updateData.sku) {
      const existingSku = await ProductRepository.findBySku(updateData.sku);
      if (existingSku && existingSku.id !== id) {
        throw new Error(`SKU '${updateData.sku}' is already assigned to another product.`);
      }
    }

    const updated = await ProductRepository.update(id, updateData);
    if (!updated) throw new Error('Product not found.');

    await ActivityRepository.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'PRODUCT_UPDATED',
      category: 'product',
      details: `Updated product ${updated.name}`,
      ipAddress,
    });

    return updated;
  },

  deleteProduct: async (id, currentUser, ipAddress) => {
    const p = await ProductRepository.findById(id);
    if (!p) throw new Error('Product not found.');

    const success = await ProductRepository.delete(id);

    await ActivityRepository.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'PRODUCT_DELETED',
      category: 'product',
      details: `Deleted product ${p.name} [SKU: ${p.sku}]`,
      ipAddress,
    });

    return success;
  }
};
