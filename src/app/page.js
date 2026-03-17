'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-luxury-dark via-gray-900 to-luxury-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-luxury-gold">
            Luxury Elegance Awaits
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our exclusive collection of premium bags, shoes, and accessories. 
            Handpicked luxury items for the discerning customer.
          </p>
          <Link
            href="/products"
            className="inline-block bg-luxury-gold text-luxury-dark px-8 py-4 rounded-lg text-lg font-bold hover:bg-white transition transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-luxury-dark text-center mb-12">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bags */}
            <Link href="/products?category=bags">
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-luxury-gold to-yellow-600 h-48 rounded-lg overflow-hidden flex items-center justify-center text-6xl hover:scale-105 transition transform">
                  👜
                </div>
                <h3 className="text-2xl font-bold text-luxury-dark mt-4 group-hover:text-luxury-gold transition">
                  Designer Bags
                </h3>
              </div>
            </Link>

            {/* Shoes */}
            <Link href="/products?category=shoes">
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 h-48 rounded-lg overflow-hidden flex items-center justify-center text-6xl hover:scale-105 transition transform">
                  👠
                </div>
                <h3 className="text-2xl font-bold text-luxury-dark mt-4 group-hover:text-luxury-gold transition">
                  Premium Shoes
                </h3>
              </div>
            </Link>

            {/* Accessories */}
            <Link href="/products?category=accessories">
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 h-48 rounded-lg overflow-hidden flex items-center justify-center text-6xl hover:scale-105 transition transform">
                  ✨
                </div>
                <h3 className="text-2xl font-bold text-luxury-dark mt-4 group-hover:text-luxury-gold transition">
                  Accessories
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-luxury-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-luxury-gold text-center mb-12">
            Why Choose Luxury Shop?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Authentic Products</h3>
              <p className="text-gray-300">100% genuine luxury items verified by experts.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-300">Discreet packaging and fast delivery worldwide.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-300">Multiple payment options with buyer protection.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-2">Loyalty Program</h3>
              <p className="text-gray-300">Earn points on every purchase and get rewards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-luxury-light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-luxury-dark mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Get exclusive deals and early access to new collections.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              required
            />
            <button className="bg-luxury-gold text-luxury-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
