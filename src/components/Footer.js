'use client';

export default function Footer() {
  return (
    <footer className="bg-luxury-dark text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-luxury-gold text-lg font-bold mb-4">LUXURY SHOP</h3>
          <p className="text-gray-400">Premium luxury bags, shoes, and accessories for discerning customers.</p>
        </div>
        <div>
          <h4 className="text-luxury-gold font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-luxury-gold">Home</a></li>
            <li><a href="/products" className="hover:text-luxury-gold">Shop</a></li>
            <li><a href="/about" className="hover:text-luxury-gold">About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-luxury-gold font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/contact" className="hover:text-luxury-gold">Contact</a></li>
            <li><a href="#" className="hover:text-luxury-gold">Shipping Info</a></li>
            <li><a href="#" className="hover:text-luxury-gold">Returns</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-luxury-gold font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-luxury-gold">Instagram</a></li>
            <li><a href="#" className="hover:text-luxury-gold">Facebook</a></li>
            <li><a href="#" className="hover:text-luxury-gold">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; 2026 Luxury Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
