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

        // Fetch orders (for now, we can't read them via API due to security, so show message)
        // In production, you'd need to create an authenticated admin API endpoint
        toast.info('To view orders, check Firebase Console → Firestore Database → orders collection');
        setOrders([]);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    toast.info('To add products, go to Firebase Console → Firestore Database → products collection');
  };

  const handleDeleteProduct = (productId) => {
    toast.info('To delete products, go to Firebase Console → Firestore Database → products collection');
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
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left font-bold text-luxury-dark">Order ID</th>
                <th className="px-4 py-3 text-left font-bold text-luxury-dark">Customer</th>
                <th className="px-4 py-3 text-left font-bold text-luxury-dark">Amount</th>
                <th className="px-4 py-3 text-left font-bold text-luxury-dark">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-luxury-light">
                    <td className="px-4 py-3">{order.id.substring(0, 8)}</td>
                    <td className="px-4 py-3">{order.customer || 'N/A'}</td>
                    <td className="px-4 py-3">${order.total || 0}</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                        {order.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-gray-600">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
