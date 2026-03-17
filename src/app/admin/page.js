'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'bags',
    description: '',
    image: '',
  });

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!user.email?.includes('admin')) {
      toast.error('Admin access denied');
      router.push('/');
    }
  }, [user, router]);

  // Fetch products and orders via API
  useEffect(() => {
    if (!user || !user.email?.includes('admin')) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch products via API
        const productsRes = await fetch('/api/products');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.data || []);
        }

        // Fetch orders via API
        const ordersRes = await fetch('/api/orders');
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.data || []);
        } else {
          toast.error('Failed to load orders');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add product');
      }

      toast.success('Product added successfully!');
      setNewProduct({ name: '', price: '', category: 'bags', description: '', image: '' });
      setShowForm(false);

      // Refresh products list
      const productsRes = await fetch('/api/products');
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.data || []);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete product');
      }

      setProducts(products.filter((p) => p.id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-luxury-dark mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-bold transition ${
            activeTab === 'products'
              ? 'text-luxury-gold border-b-2 border-luxury-gold'
              : 'text-gray-600 hover:text-luxury-dark'
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-bold transition ${
            activeTab === 'orders'
              ? 'text-luxury-gold border-b-2 border-luxury-gold'
              : 'text-gray-600 hover:text-luxury-dark'
          }`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 bg-luxury-gold text-luxury-dark px-6 py-2 rounded-lg font-bold hover:bg-white transition"
          >
            {showForm ? 'Cancel' : '+ Add New Product'}
          </button>

          {showForm && (
            <form onSubmit={handleAddProduct} className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                  required
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                >
                  <option value="bags">Bags</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-4"
                rows="3"
              />
              <button
                type="submit"
                className="mt-4 bg-luxury-gold text-luxury-dark px-6 py-2 rounded-lg font-bold hover:bg-white transition"
              >
                Add Product
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Name</th>
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Category</th>
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Price</th>
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-luxury-light">
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">${product.price}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Order ID</th>
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Customer</th>
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Email</th>
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Amount</th>
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Status</th>
                  <th className="px-4 py-3 text-left font-bold text-luxury-dark">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-luxury-light cursor-pointer">
                      <td className="px-4 py-3 font-mono text-sm">{order.id.substring(0, 8)}...</td>
                      <td className="px-4 py-3">{order.customerName || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{order.customerEmail || 'N/A'}</td>
                      <td className="px-4 py-3 font-bold text-luxury-gold">${(order.total || 0).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded text-sm font-bold text-white ${
                          order.status === 'pending' ? 'bg-yellow-500' : 
                          order.status === 'completed' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}>
                          {(order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-luxury-gold text-luxury-dark px-4 py-2 rounded hover:bg-white transition text-sm font-bold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-3 text-center text-gray-600">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
                <h2 className="text-3xl font-bold text-luxury-dark mb-6">Order Details</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-300">
                  <div>
                    <p className="text-gray-600 text-sm">Order ID</p>
                    <p className="font-mono font-bold">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <p className="font-bold">{selectedOrder.status || 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Customer Name</p>
                    <p className="font-bold">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="text-sm">{selectedOrder.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="text-sm">{selectedOrder.customerPhone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Address</p>
                    <p className="text-sm">{selectedOrder.customerAddress}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-luxury-dark mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-luxury-gold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded mb-6 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${(selectedOrder.subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>${(selectedOrder.tax || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${(selectedOrder.shipping || 0).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-luxury-gold">${(selectedOrder.total || 0).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full bg-luxury-gold text-luxury-dark py-2 rounded font-bold hover:bg-white transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
