# Complete Deployment & Setup Guide

## Step-by-Step Setup Instructions

### Phase 1: Local Development Setup

#### 1.1 Install Node.js
- Download from https://nodejs.org/ (LTS version)
- Verify installation: `node --version` and `npm --version`

#### 1.2 Project Setup
```bash
cd "c:\Users\Edris\Desktop\Online Shop"
npm install
```

#### 1.3 Firebase Project Setup
1. Go to https://console.firebase.google.com
2. Click "Create a project" or use existing
3. Name it "luxury-shop"
4. Enable Google Analytics (optional)
5. Go to Project Settings (⚙️ icon)
6. Under "Service accounts", click "Generate new private key"
7. Copy your Web API credentials (under Your apps section)

#### 1.4 Configure Environment Variables
1. Create `.env.local` file in project root
2. Copy values from `.env.example`
3. Paste your Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=luxury-shop.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=luxury-shop
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=luxury-shop.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123...
```

#### 1.5 Setup Firebase Database
1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode"
4. Select region closest to you
5. Click "Enable"

#### 1.6 Create Admin User
1. In Firebase Console, go to Authentication
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Click "Add user"
5. Email: `admin@luxuryshop.com`
6. Password: `ChangeMe123!` (change this later!)

#### 1.7 Add Sample Products
1. In Firestore Database, create collection: `products`
2. Add documents with this structure:

```json
{
  "name": "Designer Leather Bag",
  "category": "bags",
  "price": 2500,
  "description": "Premium Italian leather crossbody bag",
  "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
  "rating": 5
}
```

Add at least 5-10 sample products for testing.

#### 1.8 Test Locally
```bash
npm run dev
```
Visit: http://localhost:3000

---

### Phase 2: GitHub Repository Setup

#### 2.1 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `luxury-shop`
3. Description: "Premium luxury bags & shoes e-commerce"
4. Choose "Public"
5. Click "Create repository"

#### 2.2 Initialize Git & Push
```bash
cd "c:\Users\Edris\Desktop\Online Shop"
git init
git add .
git commit -m "Initial commit: Luxury shop e-commerce platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/luxury-shop.git
git push -u origin main
```

#### 2.3 Enable GitHub Actions
1. Go to your GitHub repo
2. Click "Actions" tab
3. Click "I understand my workflows, go ahead and enable them"
4. Workflows will now run automatically

---

### Phase 3: Vercel Deployment (Frontend)

#### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Authorize Vercel"

#### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Select your GitHub repository `luxury-shop`
3. Click "Import"

#### 3.3 Configure Environment Variables
1. In Vercel project page, click "Settings"
2. Go to "Environment Variables"
3. Add all variables from `.env.example`:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID

#### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Click domain name to view live site

#### 3.5 Setup GitHub Actions Secrets
1. Go to GitHub repo Settings
2. Click "Secrets and variables" → "Actions"
3. Add new repository secrets:
   - `VERCEL_TOKEN`: Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID`: From Vercel project settings
   - `VERCEL_PROJECT_ID`: From Vercel project settings

---

### Phase 4: Database Setup (Firebase)

#### 4.1 Firebase Security Rules
Update your Firestore security rules for production:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - public read, admin write
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
    
    // Orders - users can read their own, admin can read all
    match /orders/{document=**} {
      allow read: if request.auth.uid == resource.data.userId || request.auth.token.admin == true;
      allow write: if request.auth != null;
    }
    
    // Admin only access
    match /admin/{document=**} {
      allow read, write: if request.auth.token.admin == true;
    }
  }
}
```

1. Go to Firestore Database → Rules
2. Paste the rules above
3. Click "Publish"

#### 4.2 Setup Admin Claims
In Firebase Console:
1. Go to Authentication → Users
2. Click your admin user
3. Scroll to "Custom claims"
4. Add: `{"admin": true}`

---

### Phase 5: Production Checklist

#### Security
- [ ] Change default admin password in .env.local
- [ ] Setup Firebase security rules
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Setup email verification for new users
- [ ] Add password reset functionality

#### Database
- [ ] Setup automatic backups
- [ ] Monitor Firestore usage
- [ ] Setup Firestore indexes for search

#### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Enable Google Analytics
- [ ] Setup uptime monitoring

#### Performance
- [ ] Enable image optimization
- [ ] Setup CDN (Vercel included)
- [ ] Monitor Core Web Vitals

---

## Troubleshooting

### Issue: "Firebase app not initialized"
**Solution:** Check `.env.local` has all required Firebase variables

### Issue: "Admin dashboard shows 'Access denied'"
**Solution:** Make sure user email contains "admin" or set custom claims to `{"admin": true}`

### Issue: "Products not showing"
**Solution:** Ensure collection is named `products` (lowercase) in Firestore

### Issue: "Deployment fails"
**Solution:** Check GitHub Actions logs and ensure all environment variables are set

---

## API Documentation

### Customer API Endpoints
- `GET /api/products` - Get all products
- `GET /api/products?category=bags` - Get products by category
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order details

### Admin API Endpoints
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product
- `GET /api/admin/orders` - Get all orders

---

## Cost Analysis

### Free Tier Services Used:
1. **Firebase Firestore** - Free tier: 1GB storage, 50K reads/day
2. **Vercel** - Free tier: unlimited deployments, 100GB bandwidth/month
3. **GitHub** - Free tier: unlimited public repos

### Estimated Monthly Cost: **$0**
(Scales up only when exceeding free tier limits)

---

## Next Steps

1. ✅ Deploy to production
2. Setup payment gateway (Stripe):
   - Add to checkout process
   - Enable production key
3. Setup email notifications:
   - Order confirmations
   - Shipping updates
4. Monitor analytics:
   - Google Analytics
   - Conversion rates
5. Add more features:
   - Wishlist
   - Product reviews
   - Loyalty program

---

**Questions?** Email: support@luxuryshop.com
