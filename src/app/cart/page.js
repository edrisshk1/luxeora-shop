'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.1;
  const shipping = cart.length > 0 ? 20 : 0;
  const finalTotal = total + tax + shipping;

  const handleCheckout = async () => {
    if (!cart.length) {
      toast.error('Cart is empty!');
      return;
    }

    try {
      // In production, integrate with Stripe or payment gateway
      toast.success('Order placed successfully! You will receive a confirmation email.');
      clearCart();
      setIsCheckout(false);
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  if (cart.length === 0 && !isCheckout) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🛍️</div>
        <h1 className="text-3xl font-bold text-luxury-dark mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Start shopping to add items to your cart.</p>
        <Link
          href="/products"
          className="inline-block bg-luxury-gold text-luxury-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-luxury-dark mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-white rounded-lg shadow mb-4 hover:shadow-lg transition"
            >
              <img
                src={item.image || '/placeholder.png'}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-bold text-luxury-dark">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <p className="text-luxury-gold font-bold mt-2">${item.price}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Remove
                </button>
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {[1, 2, 3, 4, 5, 10].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <p className="text-luxury-dark font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-2xl font-bold text-luxury-dark mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4 pb-4 border-b border-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (10%):</span>
              <span className="font-bold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-bold">${shipping.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between text-xl font-bold text-luxury-dark mb-6">
            <span>Total:</span>
            <span className="text-luxury-gold">${finalTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setIsCheckout(true)}
            className="w-full bg-luxury-gold text-luxury-dark py-3 rounded-lg font-bold hover:bg-white transition mb-2"
          >
            Proceed to Checkout
          </button>
          <Link href="/products" className="block text-center text-luxury-dark hover:text-luxury-gold transition py-2">
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-luxury-dark mb-4">Checkout</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
              className="space-y-4"
            >
              <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded px-4 py-2" required />
              <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded px-4 py-2" required />
              <input type="text" placeholder="Address" className="w-full border border-gray-300 rounded px-4 py-2" required />
              <input type="text" placeholder="City" className="w-full border border-gray-300 rounded px-4 py-2" required />
              <input type="text" placeholder="ZIP Code" className="w-full border border-gray-300 rounded px-4 py-2" required />

              <div className="bg-luxury-light p-4 rounded">
                <p className="text-sm text-gray-600 mb-2">Total Amount:</p>
                <p className="text-2xl font-bold text-luxury-gold">${finalTotal.toFixed(2)}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-luxury-gold text-luxury-dark py-2 rounded font-bold hover:bg-white transition"
                >
                  Place Order
                </button>
                <button
                  type="button"
                  onClick={() => setIsCheckout(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded font-bold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
