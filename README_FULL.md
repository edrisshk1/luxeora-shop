# Luxury Shop - Luxury Bags & Shoes E-commerce Store

A modern, fully-featured e-commerce platform for luxury goods built with Next.js, Firebase, and Tailwind CSS.

## 📸 Features

### 🛍️ Customer Interface
- **Home Page** - Elegant hero section with featured categories
- **Product Catalog** - Browse luxury bags, shoes, and accessories
- **Smart Filtering** - Filter by category (bags, shoes, accessories)
- **Shopping Cart** - Add/remove items, update quantities
- **Checkout Process** - Secure order placement
- **Order Confirmation** - Instant order feedback

### 👨‍💼 Admin Dashboard
- **Product Management**
  - Add new products with images
  - Edit existing products
  - Delete products
  - Real-time inventory tracking
- **Order Management**
  - View all customer orders
  - Track order status
  - Update order information
- **Admin Authentication** - Secure login required

### 🔐 Security Features
- **Firebase Authentication** - Secure user login/registration
- **Role-Based Access** - Admin-only dashboard access
- **Data Validation** - Input validation on all forms
- **HTTPS** - SSL/TLS encryption

### 📱 Design
- **Responsive Layout** - Works on desktop, tablet, mobile
- **Luxury Theme** - Gold and dark color scheme
- **Smooth Animations** - Professional transitions
- **Mobile First** - Optimized for all devices

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14, React 18 |
| Styling | Tailwind CSS 3 |
| Database | Firebase Firestore |
| Authentication | Firebase Auth |
| Notifications | React Hot Toast |
| Deployment | Vercel |
| Version Control | Git & GitHub |
| CI/CD | GitHub Actions |

---

## 📋 Project Structure

```
luxury-shop/
├── src/
│   ├── app/                          # Next.js 14 app directory
│   │   ├── page.js                   # Home page
│   │   ├── layout.js                 # Root layout
│   │   ├── products/
│   │   │   └── page.js               # Products listing
│   │   ├── cart/
│   │   │   └── page.js               # Shopping cart
│   │   ├── login/
│   │   │   └── page.js               # Authentication
│   │   ├── admin/
│   │   │   └── page.js               # Admin dashboard
│   │   ├── about/
│   │   │   └── page.js               # About page
│   │   ├── contact/
│   │   │   └── page.js               # Contact page
│   │   └── api/                      # API routes
│   │       ├── products/
│   │       │   └── route.js
│   │       └── orders/
│   │           └── route.js
│   ├── components/
│   │   ├── Header.js                 # Navigation header
│   │   ├── Footer.js                 # Footer
│   │   └── ProductCard.js            # Product card component
│   ├── context/
│   │   ├── AuthContext.js            # Auth state management
│   │   └── CartContext.js            # Cart state management
│   ├── lib/
│   │   └── firebase.js               # Firebase configuration
│   └── styles/
│       └── globals.css               # Global styles
├── public/                           # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Actions CI/CD
├── .env.example                      # Environment variables template
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # Tailwind configuration
├── vercel.json                       # Vercel deployment config
├── package.json                      # Dependencies
├── README.md                         # This file
├── QUICK_START.md                    # Quick setup guide
├── DEPLOYMENT_GUIDE.md               # Detailed deployment
└── ADMIN_GUIDE.md                    # Admin documentation
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Vercel account (for deployment)

### Local Development

1. **Clone & Install**
   ```bash
   cd "c:\Users\Edris\Desktop\Online Shop"
   npm install
   ```

2. **Setup Firebase**
   - Create Firebase project at https://console.firebase.google.com
   - Copy credentials to `.env.local`

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase keys
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   - http://localhost:3000 (Customer site)
   - http://localhost:3000/admin (Admin dashboard)

**Demo Admin Credentials:**
- Email: `admin@luxuryshop.com`
- Password: `ChangeMe123!`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import GitHub repository
   - Add environment variables
   - Deploy

3. **Your site is live!**
   - Accessible at `https://yourdomain.vercel.app`
   - Auto-deploys on git push

### Free Hosting Benefits
- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **Firebase**: 1GB storage, 50K reads/day free tier
- **GitHub**: Unlimited repos and Actions
- **Total Cost**: $0/month

### Production Checklist
- [ ] Change admin password
- [ ] Setup Firebase security rules
- [ ] Enable HTTPS (automatic)
- [ ] Configure custom domain
- [ ] Setup error tracking
- [ ] Enable analytics

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | 5-minute setup guide |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Detailed deployment steps |
| [ADMIN_GUIDE.md](ADMIN_GUIDE.md) | Admin dashboard documentation |

---

## 💡 Key Features Explained

### Authentication
- User signup and login
- Admin verification
- Secure password handling
- Session management

### Shopping Cart
- Add/remove products
- Update quantities
- Calculate totals with tax
- Free shipping available

### Admin Dashboard
- Real-time product sync
- One-click add products
- Order tracking
- Status management

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly interface

---

## 🔧 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      luxury: {
        gold: '#D4AF37',  // Change gold
        dark: '#1a1a1a',  // Change dark
        light: '#f5f5f5', // Change light
      },
    },
  },
},
```

### Add New Categories
1. Edit product form in admin
2. Add new category option
3. Add filtering logic in products page

### Customize Pages
All pages in `src/app/` are editable:
- Modify copy/text
- Change colors
- Add sections
- Update images

---

## 📊 Analytics & Monitoring

### Firebase Console
- Firestore usage
- Authentication logs
- Performance metrics

### Vercel Dashboard
- Deployment history
- Performance analytics
- Error tracking

### Google Analytics (Optional)
- Track user behavior
- Monitor conversions
- Analyze traffic

---

## 🚨 Troubleshooting

### Issue: "Firebase not initialized"
```
✓ Check .env.local has all keys
✓ Verify Firebase project exists
✓ Restart development server
```

### Issue: "Admin access denied"
```
✓ Use email with "admin" in it
✓ Or set custom claim: {"admin": true}
✓ Clear browser cache
```

### Issue: "Products not showing"
```
✓ Verify Firestore collection exists
✓ Collection name must be lowercase "products"
✓ Check Firestore rules allow read
```

### Issue: "Images not loading"
```
✓ Use direct image URL
✓ Test URL in browser first
✓ Check CORS settings
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#troubleshooting) for more help.

---

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local`
   - Use `.env.example` as template
   - Keep secrets on deployment platform

2. **Firebase Security Rules**
   - Restrict write access to admin
   - Public read for products
   - User-only read for orders

3. **Password Management**
   - Change default credentials
   - Use strong passwords
   - Enable 2FA

4. **Data Protection**
   - Regular backups
   - HTTPS only
   - Validate all inputs

---

## 📦 Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "firebase": "^10.0.0",
  "tailwindcss": "^3.3.5",
  "react-hot-toast": "^2.4.1",
  "axios": "^1.6.0"
}
```

---

## 🎯 Roadmap

- [x] Customer storefront
- [x] Shopping cart
- [x] Admin dashboard
- [x] Firebase integration
- [x] GitHub Actions CI/CD
- [ ] Payment processing (Stripe)
- [ ] Email notifications
- [ ] Product reviews
- [ ] Wishlist feature
- [ ] Loyalty program
- [ ] Mobile app

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

- 📖 Read Documentation
- 🐛 Check Issues on GitHub
- 📧 Email: support@luxuryshop.com
- 💬 Discord: [Join Community]

---

## 📄 License

MIT License - feel free to use for personal and commercial projects

---

## 🙏 Acknowledgments

- Next.js team for amazing framework
- Firebase for reliable backend
- Tailwind CSS for styling
- Vercel for deployment platform

---

## 👨‍💻 Built With

- ❤️ by Luxury Shop Team
- 🚀 Powered by Next.js
- 🔥 Backed by Firebase
- 🎨 Styled with Tailwind CSS

---

**Start selling luxury today! 🎉**

Need help? See [QUICK_START.md](QUICK_START.md) to get started in 5 minutes.
