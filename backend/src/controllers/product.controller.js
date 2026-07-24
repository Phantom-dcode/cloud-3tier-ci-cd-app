import { ProductService } from '../services/product.service.js';

export const ProductController = {
  getProducts: async (req, res, next) => {
    try {
      const result = await ProductService.getProducts(req.query);
      res.json({
        success: true,
        data: result.products,
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

  getProductById: async (req, res, next) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json({ success: true, data: product });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },

  createProduct: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const product = await ProductService.createProduct(req.body, req.user, ip);
      res.status(201).json({
        success: true,
        message: 'Product created successfully.',
        data: product,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const product = await ProductService.updateProduct(req.params.id, req.body, req.user, ip);
      res.json({
        success: true,
        message: 'Product updated successfully.',
        data: product,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      await ProductService.deleteProduct(req.params.id, req.user, ip);
      res.json({
        success: true,
        message: 'Product deleted successfully.',
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
};
