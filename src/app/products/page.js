'use client';

import { useEffect, useState, Suspense } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        let q;

        if (category && category !== 'all') {
          q = query(productsCollection, where('category', '==', category));
        } else {
          q = query(productsCollection);
        }

        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <h1 className="text-4xl font-bold text-luxury-dark mb-4">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found. Check back soon!</p>
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Suspense fallback={<div className="flex justify-center items-center h-96"><div className="animate-spin text-4xl">⏳</div></div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
