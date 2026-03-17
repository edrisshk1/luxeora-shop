'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-luxury-dark mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-luxury-dark mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-luxury-dark mb-2">📧 Email</h3>
              <p className="text-gray-600">support@luxuryshop.com</p>
            </div>
            <div>
              <h3 className="font-bold text-luxury-dark mb-2">📞 Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-bold text-luxury-dark mb-2">📍 Address</h3>
              <p className="text-gray-600">123 Luxury Avenue<br />New York, NY 10001<br />USA</p>
            </div>
            <div>
              <h3 className="font-bold text-luxury-dark mb-2">🕐 Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST<br />Saturday: 10AM - 4PM EST<br />Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-luxury-gold text-luxury-dark py-3 rounded-lg font-bold hover:bg-white transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
