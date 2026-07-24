import React, { useEffect, useState } from 'react';
import { Order, Product } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge, Loader } from '../components/common/Loader';
import { Pagination } from '../components/common/Pagination';
import { ShoppingCart, Search, Plus, Eye, CheckCircle2, Clock, Truck, FileText } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Modals
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // New Order Form
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      search,
      status: statusFilter,
      page: page.toString(),
      limit: '10',
    }).toString();

    const res = await api.get<Order[]>(`/orders?${query}`);
    if (res.success && res.data) {
      setOrders(res.data);
      if (res.pagination) {
        setTotalPages(res.pagination.totalPages);
        setTotalItems(res.pagination.total);
      }
    }
    setLoading(false);
  };

  const fetchProductsForOrder = async () => {
    const res = await api.get<Product[]>('/products?limit=50');
    if (res.success && res.data) {
      setProducts(res.data);
      if (res.data.length > 0) setSelectedProductId(res.data[0].id);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search, statusFilter, page]);

  useEffect(() => {
    fetchProductsForOrder();
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === selectedProductId);
    if (!prod) return;

    setIsSubmitting(true);
    const orderData = {
      customerName,
      customerEmail,
      items: [
        {
          productId: prod.id,
          productName: prod.name,
          quantity: Number(quantity),
          unitPrice: prod.price,
        },
      ],
    };

    const res = await api.post<Order>('/orders', orderData);
    setIsSubmitting(false);
    if (res.success) {
      showToast('New order created successfully.', 'success');
      setIsNewOrderModalOpen(false);
      setCustomerName('');
      setCustomerEmail('');
      setQuantity(1);
      fetchOrders();
    } else {
      showToast(res.error || 'Failed to place order', 'error');
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const res = await api.put<Order>(`/orders/${orderId}/status`, { status });
    if (res.success) {
      showToast(`Order status updated to ${status}.`, 'success');
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(res.data || null);
      }
      fetchOrders();
    } else {
      showToast(res.error || 'Status update failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-emerald-400" /> Orders & Fulfillment
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track client purchase orders, payment verification, and delivery fulfillment pipeline.
          </p>
        </div>

        <Button
          onClick={() => setIsNewOrderModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          New Purchase Order
        </Button>
      </div>

      {/* Search & Filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by order #, customer name, email..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Order Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card padding={false}>
        {loading ? (
          <Loader text="Fetching orders..." />
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No purchase order records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Order Number</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items Count</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-indigo-300">{o.orderNumber}</td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-100">{o.customerName}</p>
                      <p className="text-slate-500 text-[11px]">{o.customerEmail}</p>
                    </td>
                    <td className="p-4 text-slate-300">{o.items?.length || 0} items</td>
                    <td className="p-4 font-bold text-slate-100">${o.totalAmount.toFixed(2)}</td>
                    <td className="p-4">
                      <Badge variant={
                        o.status === 'delivered' ? 'success' :
                        o.status === 'shipped' ? 'info' :
                        o.status === 'processing' ? 'warning' : 'neutral'
                      }>
                        {o.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={o.paymentStatus === 'paid' ? 'success' : 'danger'}>
                        {o.paymentStatus.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => { setSelectedOrder(o); setIsDetailsModalOpen(true); }}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setPage}
          />
        </div>
      </Card>

      {/* New Order Modal */}
      <Modal isOpen={isNewOrderModalOpen} onClose={() => setIsNewOrderModalOpen(false)} title="New Purchase Order">
        <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Customer / Organization Name</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              placeholder="Acme Cloud Systems"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Customer Email</label>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={e => setCustomerEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              placeholder="billing@acme.com"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-slate-300 mb-1 font-semibold">Select Product</label>
              <select
                value={selectedProductId}
                onChange={e => setSelectedProductId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.price})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Quantity</label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setIsNewOrderModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Place Order
            </Button>
          </div>
        </form>
      </Modal>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title={`Order Details: ${selectedOrder.orderNumber}`}>
          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <p className="text-slate-500 text-[10px] uppercase font-bold">Customer</p>
                <p className="font-semibold text-slate-100">{selectedOrder.customerName}</p>
                <p className="text-slate-400">{selectedOrder.customerEmail}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-[10px] uppercase font-bold">Total Amount</p>
                <p className="text-lg font-bold text-emerald-400">${selectedOrder.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-200 mb-2">Line Items:</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div>
                      <p className="font-semibold text-slate-200">{item.productName}</p>
                      <p className="text-slate-500 text-[11px]">{item.quantity} x ${item.unitPrice.toFixed(2)}</p>
                    </div>
                    <p className="font-bold text-slate-200">${(item.quantity * item.unitPrice).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {(user?.role === 'admin' || user?.role === 'manager') && (
              <div className="pt-3 border-t border-slate-800">
                <p className="font-semibold text-slate-200 mb-2">Update Order Status:</p>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                      className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[10px] border transition-colors ${
                        selectedOrder.status === st
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
