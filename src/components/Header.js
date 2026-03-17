'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-luxury-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-luxury-gold">
          ✨ LUXURY SHOP
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-luxury-gold transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-luxury-gold transition">
            Shop
          </Link>
          <Link href="/about" className="hover:text-luxury-gold transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-luxury-gold transition">
            Contact
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/cart" className="relative">
            <span className="text-2xl">🛍️</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-4">
              {user.email?.includes('admin') && (
                <Link href="/admin" className="text-luxury-gold font-semibold hover:underline">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-luxury-gold text-luxury-dark px-4 py-2 rounded hover:bg-white transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-luxury-gold text-luxury-dark px-4 py-2 rounded hover:bg-white transition">
              Login
            </Link>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-luxury-dark border-t border-luxury-gold p-4 space-y-2">
          <Link href="/" className="block hover:text-luxury-gold py-2">
            Home
          </Link>
          <Link href="/products" className="block hover:text-luxury-gold py-2">
            Shop
          </Link>
          <Link href="/about" className="block hover:text-luxury-gold py-2">
            About
          </Link>
          <Link href="/contact" className="block hover:text-luxury-gold py-2">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
