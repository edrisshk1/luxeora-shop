# Luxury Shop Online Store

A premium luxury bags, shoes, and accessories e-commerce platform built with Next.js, Firebase, and Tailwind CSS.

## Features

✨ **Customer Interface**
- Product browsing with category filtering
- Shopping cart management
- Secure checkout process
- Order tracking

👨‍💼 **Admin Dashboard**
- Product management (add, edit, delete)
- Order management
- Order tracking and status updates
- Real-time inventory management

🔐 **Security**
- Firebase authentication
- Admin-only access to dashboard
- Secure data storage

📦 **Tech Stack**
- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Deployment:** Vercel (Frontend), Firebase (Backend & Database)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project account
- Vercel account (for deployment)

### Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/luxury-shop.git
cd luxury-shop
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

4. **Configure Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Get your Firebase credentials
   - Update `.env.local` with your Firebase config

5. **Create demo admin account:**
   - In Firebase Console, go to Authentication
   - Add a new user with email: `admin@luxuryshop.com` and password: `ChangeMe123!`

6. **Add sample products:**
   - Go to Firestore Database in Firebase Console
   - Create a collection named `products`
   - Add sample products with these fields:
     - `name` (string)
     - `price` (number)
     - `category` (string: "bags", "shoes", or "accessories")
     - `description` (string)
     - `image` (string - URL)
     - `rating` (number: 1-5)

Sample product:
```json
{
  "name": "Luxury Leather Handbag",
  "price": 2500,
  "category": "bags",
  "description": "Premium genuine leather handbag with gold hardware",
  "image": "https://example.com/handbag.jpg",
  "rating": 5
}
```

7. **Run the development server:**
```bash
npm run dev
```

8. **Open your browser:**
   - Customer site: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin (login with admin account)

## Deployment

### Deploy to Vercel (Frontend)

1. **Create Vercel account:**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub

2. **Import project:**
   - Connect your GitHub repository
   - Select the `luxury-shop` repository

3. **Add environment variables:**
   - In Vercel project settings, add all environment variables from `.env.example`
   - Get values from your Firebase project

4. **Deploy:**
   - Vercel automatically deploys on push to main branch

### Free Deployment Options

**Option 1: Vercel (Recommended)**
- Frontend: Vercel (Free tier: 100GB/month bandwidth)
- Database: Firebase Firestore (Free tier: 1GB storage, 50K reads/day)

**Option 2: Railway/Render + Firebase**
- If you need backend APIs: Deploy to Railway or Render (Free tier available)
- Use Firebase for database

**Option 3: Firebase Hosting**
- Deploy Next.js to Firebase Hosting (free tier available)
- Combined with Firestore (included)

## GitHub Setup

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Luxury Shop e-commerce"
git branch -M main
git remote add origin https://github.com/yourusername/luxury-shop.git
git push -u origin main
```

2. **Enable GitHub Actions:**
   - Go to repository Settings → Actions
   - Actions will automatically run on every push

3. **Set up deployment secrets:**
   - Go to Settings → Secrets and variables → Actions
   - Add Vercel deployment secrets:
     - `VERCEL_TOKEN` (from Vercel account settings)
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`

## Admin Guide

### Login to Admin Dashboard
1. Go to http://yoursite.com/login
2. Use credentials: admin@luxuryshop.com / ChangeMe123!
3. Click "Admin" in header to access dashboard

### Manage Products
1. Click "Products" tab
2. Click "+ Add New Product"
3. Fill in product details
4. Click "Add Product"

### View Orders
1. Click "Orders" tab
2. See all customer orders
3. Update order status as needed

## Key Files & Directories

```
luxury-shop/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.js            # Home page
│   │   ├── products/          # Products page
│   │   ├── cart/              # Shopping cart
│   │   ├── login/             # Authentication
│   │   ├── admin/             # Admin dashboard
│   │   ├── about/             # About page
│   │   └── contact/           # Contact page
│   ├── components/            # Reusable components
│   │   ├── Header.js          # Navigation header
│   │   ├── Footer.js          # Footer
│   │   └── ProductCard.js     # Product card component
│   ├── context/               # React context
│   │   ├── AuthContext.js     # Auth state management
│   │   └── CartContext.js     # Cart state management
│   ├── lib/
│   │   └── firebase.js        # Firebase config
│   └── styles/                # Global styles
├── .github/workflows/         # CI/CD pipeline
├── public/                    # Static assets
├── .env.example              # Environment variables template
└── package.json              # Dependencies

```

## Security Notes

⚠️ **Important for Production:**

1. **Change default admin credentials:**
   - Never use default credentials in production
   - Update ADMIN_EMAIL and ADMIN_PASSWORD

2. **Firebase Security Rules:**
   - Set up proper Firestore security rules
   - Restrict write access to admin only

3. **Environment Variables:**
   - Never commit `.env.local` to GitHub
   - Always use `.env.example` as template

4. **SSL Certificate:**
   - Vercel provides free SSL (HTTPS)
   - Always use HTTPS in production

## Roadmap

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Customer reviews and ratings
- [ ] Inventory management
- [ ] Advanced search and filters
- [ ] Wishlist feature
- [ ] Mobile app

## Support

For issues or questions:
1. Check GitHub Issues
2. Email: support@luxuryshop.com
3. Documentation: See README.md

## License

MIT License - Feel free to use for personal or commercial projects

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

**Made with ❤️ for luxury shoppers**
