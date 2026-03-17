# Admin Documentation

## 👨‍💼 Admin Dashboard Guide

### Accessing Admin Dashboard

1. Go to `https://yoursite.com/login`
2. Login with admin email
3. Click "Admin" button in header
4. You'll see the admin dashboard

---

## 📦 Product Management

### Adding Products

1. Click "Products" tab
2. Click "+ Add New Product"
3. Fill in details:
   - **Name:** Product name (e.g., "Designer Leather Bag")
   - **Price:** Price in USD
   - **Category:** Choose from:
     - Bags
     - Shoes
     - Accessories
   - **Description:** Product details
   - **Image URL:** Direct link to product image

4. Click "Add Product"
5. Product appears on storefront immediately

### Image URLs

Use free image hosting:
- **Unsplash:** https://unsplash.com
- **Pexels:** https://pexels.com
- **Pixabay:** https://pixabay.com

Example URL: `https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400`

### Updating Products

To edit product:
1. Go to Firestore Database
2. Find product in `products` collection
3. Click to edit
4. Update fields
5. Save

To delete product:
1. In Admin Dashboard, click "Delete" button
2. Product is removed immediately

---

## 📋 Order Management

### Viewing Orders

1. Click "Orders" tab
2. See all customer orders
3. View:
   - Order ID (first 8 characters)
   - Customer name
   - Order amount
   - Current status

### Order Statuses

- **Pending** - New order, not yet processed
- **Processing** - Order being prepared
- **Shipped** - Order on the way
- **Delivered** - Order received

### Updating Order Status

1. Go to Firestore Database
2. Find order in `orders` collection
3. Edit the `status` field
4. Save

---

## 💾 Database Structure

### Products Collection
```
products/
  └── product_id/
      ├── name: "Designer Bag"
      ├── price: 2500
      ├── category: "bags"
      ├── description: "Premium leather..."
      ├── image: "https://..."
      ├── rating: 5
      └── createdAt: timestamp
```

### Orders Collection
```
orders/
  └── order_id/
      ├── items: [...]
      ├── total: 2800
      ├── tax: 280
      ├── shipping: 20
      ├── customer: "John Doe"
      ├── email: "john@example.com"
      ├── address: "123 Main St"
      ├── status: "pending"
      └── createdAt: timestamp
```

### Users Collection
```
users/
  └── user_id/
      ├── email: "user@example.com"
      ├── displayName: "User Name"
      ├── createdAt: timestamp
      └── admin: false
```

---

## 🔒 Security

### Admin Only Access
- Only users with email containing "admin" can access dashboard
- Or users with `"admin": true` in custom claims

### Setting Admin Status

In Firebase Console:
1. Go to Authentication → Users
2. Click user email
3. Scroll to "Custom claims"
4. Add: `{"admin": true}`
5. Save

### Protecting Data

Never share:
- Firebase API keys
- Admin passwords
- Database credentials

---

## 📊 Analytics

### Monitor Firestore Usage

1. Go to Firebase Console
2. Click Firestore Database
3. View:
   - Database size
   - Read/write operations
   - Active connections

### Google Analytics (Optional)

Add Google Analytics to track:
- Page views
- Product views
- Conversion rate
- User behavior

---

## 🚨 Common Issues

### Issue: Can't access admin dashboard
**Solution:** Make sure your email contains "admin" or has custom claim

### Issue: Products not showing
**Solution:** Check Firestore collection name is `products` (lowercase)

### Issue: Orders not appearing
**Solution:** Verify Firestore has `orders` collection

### Issue: Image not loading
**Solution:** Use direct image URL (test URL in browser first)

---

## 💡 Tips & Tricks

### Bulk Upload Products
1. Export products as JSON
2. Upload to Firestore using import feature
3. Much faster than manual entry

### Backup Database
1. Go to Firestore Database
2. Click "Export" at top
3. Save backup file

### Monitor Performance
1. Check Firestore metrics
2. Monitor response times
3. Optimize queries

---

## 📧 Email Notifications (Optional)

To add order confirmation emails:

1. Setup Firebase Cloud Functions
2. Trigger on new order
3. Send email via SendGrid or Mailgun

(See documentation for setup)

---

## 🔄 Inventory Management

### Tracking Stock

Add a `stock` field to products:
```
stock: 5
```

When order placed:
- Decrease stock by quantity
- Alert when stock low
- Hide when out of stock

---

## 📱 Mobile Admin Access

Admin dashboard is mobile-responsive:
- ✅ View products on phone
- ✅ View orders on phone
- ✅ Add products (with small screen)
- ✅ Manage orders

Use a tablet for better experience.

---

## 🎓 Best Practices

1. **Update prices regularly** - Keep competitive
2. **Add high-quality images** - Use professional photos
3. **Keep descriptions detailed** - Help customers decide
4. **Respond to customers** - Set expectations in checkout
5. **Monitor orders daily** - Ship quickly
6. **Backup data weekly** - Prevent loss

---

## 📞 Support

Questions about admin features?
- Check Firebase docs: https://firebase.google.com
- Next.js docs: https://nextjs.org
- Email support: support@luxuryshop.com

---

**Happy selling! 🎉**
