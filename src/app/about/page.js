'use client';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-luxury-dark mb-8">About Luxury Shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-luxury-dark mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in 2024, Luxury Shop is dedicated to bringing the world's most prestigious designer bags, shoes, and accessories to discerning customers worldwide.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We carefully curate every piece in our collection, ensuring authenticity and exceptional quality. Our mission is to make luxury accessible while maintaining the highest standards of customer service.
          </p>
        </div>
        <div className="bg-gradient-to-br from-luxury-gold to-yellow-600 rounded-lg p-8 text-white flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="text-6xl mb-4">👑</div>
            <p className="text-xl font-semibold">Luxury Redefined</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-luxury-dark mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-luxury-dark mb-3">Authenticity</h3>
            <p className="text-gray-600">Every product is verified authentic by experts. We guarantee 100% genuine luxury items.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-luxury-dark mb-3">Excellence</h3>
            <p className="text-gray-600">We maintain the highest standards in product quality, curation, and customer service.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-luxury-dark mb-3">Discretion</h3>
            <p className="text-gray-600">Your privacy is paramount. We offer discreet packaging and secure, confidential transactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
