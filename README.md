# 🌾 F2CMARKET — Farmer to Consumer Marketplace

F2CMARKET is a modern farmer-to-consumer marketplace that directly connects local farmers with consumers, eliminating middlemen and ensuring fair pricing, fresh produce, and transparent transactions.

The platform enables farmers to sell products online while allowing consumers to browse, purchase, review, and interact with verified farmers.

---

## 🚀 Features

### Consumer Features
- User Registration & Login
- Google Sign-In
- Browse Products
- Search & Advanced Filtering
- Wishlist Management
- Shopping Cart
- Secure Checkout
- Order History
- Product Reviews & Ratings
- Farmer Directory
- Notifications (unread badge, mark as read/all, auto-refreshes every 45s)

### Farmer Features
- Farmer Registration
- Document Upload & Verification
- Product Management (CRUD)
- Order Management
- Seller Profile
- Seller Reviews Dashboard
- Analytics Dashboard

### Admin Features
- Approve/Reject Farmers
- Manage Users
- Manage Products
- Moderate Marketplace Activities

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| State Management | Context API |
| Routing | React Router DOM |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Image Storage | Cloudinary |
| Emails | EmailJS |
| Maps | OpenStreetMap + Leaflet |
| Animations | Framer Motion |
| Deployment | Firebase Hosting |

---

## 👥 User Roles

### Consumer
- Browse products
- Place orders
- Manage wishlist & cart
- Submit reviews

### Farmer
- Add/Edit/Delete products
- Manage orders
- Maintain seller profile

### Admin
- Verify farmers
- Manage marketplace users and products

---

## 📂 Project Structure

```text
src/
├── assets/                 # Images, icons, logos, static assets
├── components/             # Reusable UI components
│   ├── auth/               # Authentication UI
│   ├── common/             # Shared components
│   ├── dashboard/          # Dashboard components
│   ├── farmer/             # Farmer-specific components
│   ├── home/               # Homepage sections
│   ├── order/              # Order-related components
│   ├── product/            # Product listing components
│   ├── productDetails/     # Product details & reviews
│   ├── profile/            # Profile components
│   └── ui/                 # shadcn/ui components
│
├── config/                 # Firebase configuration
├── context/                # Global state management
├── data/                   # Static data & constants
├── hooks/                  # Custom React hooks
├── lib/                    # Shared utility libraries
├── pages/                  # Application pages
│   ├── admin/              # Admin pages
│   ├── auth/               # Authentication pages
│   ├── common/             # Public information pages
│   ├── consumer/           # Consumer pages
│   ├── dashboard/          # Dashboard pages
│   ├── farmer/             # Farmer pages
│   └── profile/            # User profile pages
│
├── routes/                 # Route definitions & protection
├── services/               # Firebase & business logic services
├── styles/                 # Global styles & variables
├── tests/                  # Unit & integration tests
├── utils/                  # Helper functions
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/SantoshTatipamula/F2CMarket.git
cd F2CMarket
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your own values:
```bash
cp .env.example .env
```
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Firebase values come from your Firebase project settings. Cloudinary is used for image uploads; EmailJS is used for transactional emails.

---

## 🔐 Firestore Rules

Deploy security rules:
```bash
firebase deploy --only firestore:rules
```

This project is currently on the **Firebase Spark (free) plan**, which has a daily read/write quota — see the notes inside `firestore.rules` before loosening anything (particularly around public reads vs. owner-scoped writes).

---

## ▶️ Running the Project

```bash
npm run dev
```

Application runs at:
```text
http://localhost:5173
```

---

## 📜 Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Create production build |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |
| npm run test | Run tests once (Vitest) |
| npm run test:watch | Run tests in watch mode |
| npm run deploy | Deploy `dist/` to Firebase Hosting |

---

## 🌐 Live Demo

Add your deployed Firebase Hosting URL here.
```text
https://your-project.web.app
```

---

## 📸 Screenshots

Add screenshots of:
- Home Page
- Products Page
- Farmer Dashboard
- Admin Dashboard
- Product Details
- Checkout Page

---

## 🧱 Production Hardening Notes

- **Error boundaries**: a top-level boundary catches startup crashes; a per-route boundary in `AppLayout.jsx` isolates a single page crash from the navbar/footer and clears automatically on navigation.
- **Firestore rules**: reads are public for `products` and `productReviews` (needed by public pages); all writes are scoped to the document's actual owner (`farmerId`/`consumerId`/uid). Known open item: `request.auth.token.admin` is referenced nowhere in code — admin custom claims aren't actually set anywhere, so true admin-level Firestore access isn't implemented yet (would need a Cloud Function using the Admin SDK).
- **Loading/empty/error states**: Firestore-backed pages (Products, Farmers, Orders, Reviews, Admin tooling, etc.) distinguish "still loading," "genuinely empty," and "fetch failed" instead of collapsing all three into an empty state.
- **Read-quota awareness**: `NotificationBell` polls every 45s rather than every 5s to stay reasonable on the Spark plan's daily quota. Swap to an `onSnapshot` listener if you need true real-time push instead of polling.

---

## 🔮 Future Enhancements
- Payment Gateway Integration
- Real-time Chat
- AI-based Product Recommendations
- Push Notifications
- Multi-language Support
- Firebase Anonymous Auth (so the public Farmers directory works for signed-out visitors)
- Admin custom claims via a Cloud Function

---

## 👨‍💻 Author

**Santosh Tatipamula**
MCA Student
JNTUH University, Telangana
GitHub: https://github.com/SantoshTatipamula

---

## 📄 License

This project is developed for educational and academic purposes.
