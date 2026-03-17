'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success('Added to cart!');
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-64 bg-luxury-light overflow-hidden">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition"
        />
        <div className="absolute top-4 right-4 bg-luxury-gold text-luxury-dark px-3 py-1 rounded-full font-semibold">
          ${product.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-luxury-dark mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Category & Rating */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-luxury-gold text-sm font-semibold">{product.category}</span>
          <span className="text-yellow-500">⭐ {product.rating || 5}</span>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex gap-2">
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-2 text-sm"
          >
            {[1, 2, 3, 4, 5, 10].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-luxury-gold text-luxury-dark font-bold py-2 rounded hover:bg-white transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
