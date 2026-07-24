import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge, Loader } from '../components/common/Loader';
import { Pagination } from '../components/common/Pagination';
import { Package, Search, Plus, Trash2, Edit, Tag, Layers, DollarSign } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Cloud Solutions');
  const [price, setPrice] = useState(199);
  const [stock, setStock] = useState(25);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      search,
      category: categoryFilter,
      status: statusFilter,
      page: page.toString(),
      limit: '9',
    }).toString();

    const res = await api.get<Product[]>(`/products?${query}`);
    if (res.success && res.data) {
      setProducts(res.data);
      if (res.pagination) {
        setTotalPages(res.pagination.totalPages);
        setTotalItems(res.pagination.total);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [search, categoryFilter, statusFilter, page]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await api.post<Product>('/products', { name, sku, category, price, stock, description });
    setIsSubmitting(false);
    if (res.success) {
      showToast('Product added to catalog.', 'success');
      setIsAddModalOpen(false);
      resetForm();
      fetchProducts();
    } else {
      showToast(res.error || 'Failed to create product', 'error');
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setIsSubmitting(true);
    const res = await api.put<Product>(`/products/${selectedProduct.id}`, { name, sku, category, price, stock, description });
    setIsSubmitting(false);
    if (res.success) {
      showToast('Product updated successfully.', 'success');
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      resetForm();
      fetchProducts();
    } else {
      showToast(res.error || 'Failed to update product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const res = await api.delete(`/products/${id}`);
    if (res.success) {
      showToast('Product deleted.', 'success');
      fetchProducts();
    } else {
      showToast(res.error || 'Delete failed', 'error');
    }
  };

  const openEditModal = (p: Product) => {
    setSelectedProduct(p);
    setName(p.name);
    setSku(p.sku);
    setCategory(p.category);
    setPrice(p.price);
    setStock(p.stock);
    setDescription(p.description);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setName('');
    setSku('');
    setCategory('Cloud Solutions');
    setPrice(299);
    setStock(15);
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-400" /> Catalog & Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise products, cloud solution bundles, software licenses, and hardware probes.
          </p>
        </div>

        {(user?.role === 'admin' || user?.role === 'manager') && (
          <Button
            onClick={() => { resetForm(); setIsAddModalOpen(true); }}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Product Item
          </Button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by product name, SKU, category..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="Cloud Solutions">Cloud Solutions</option>
              <option value="DevOps & Tooling">DevOps & Tooling</option>
              <option value="Security">Security</option>
              <option value="Database & Storage">Database & Storage</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      {loading ? (
        <Loader text="Loading catalog..." />
      ) : products.length === 0 ? (
        <Card>
          <div className="p-8 text-center text-slate-400 text-xs">
            No product items match the current search filters.
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant={p.status === 'in_stock' ? 'success' : p.status === 'low_stock' ? 'warning' : 'danger'}>
                    {p.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {p.sku}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 line-clamp-1">{p.name}</h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{p.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Stock: {p.stock} units</p>
                  <p className="text-lg font-extrabold text-indigo-400">${p.price.toFixed(2)}</p>
                </div>

                {(user?.role === 'admin' || user?.role === 'manager') && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      title="Edit Item"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={setPage}
      />

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Product Entry">
        <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              placeholder="e.g. AWS Multi-Region VPC Blueprint"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">SKU Code</label>
              <input
                type="text"
                required
                value={sku}
                onChange={e => setSku(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 uppercase"
                placeholder="AWS-VPC-009"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              >
                <option value="Cloud Solutions">Cloud Solutions</option>
                <option value="DevOps & Tooling">DevOps & Tooling</option>
                <option value="Security">Security</option>
                <option value="Database & Storage">Database & Storage</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Initial Stock</label>
              <input
                type="number"
                required
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
            />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Save Product
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Product Entry">
        <form onSubmit={handleUpdateProduct} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Stock Quantity</label>
              <input
                type="number"
                required
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
            />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Update Item
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
