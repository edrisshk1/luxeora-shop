'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-luxury-light">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
