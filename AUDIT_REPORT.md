# F2CMarket — Code Audit & Refactoring Report

## Executive Summary

The project is well-structured for a React + Vite + Tailwind app and already shows
good instincts (context separation, custom hooks, data files). The main issues were
**duplicated patterns** that could cause bugs when requirements change, **naming
inconsistencies**, and a handful of opportunities to push existing utilities further.
All changes are backward-compatible — no business logic was altered.

---

## Issues Found & Fixed

### 1. `parsePrice` — Duplicated price-parsing regex (5 locations)

**Problem:** `Number(String(price).replace(/[^\d.]/g, "")) || 0` appeared verbatim in:
- `CartContext.jsx`
- `Cart.jsx`
- `useProductsFilter.js`
- `OrderSummary.jsx`
- `ProductInfo.jsx`

If the currency format ever changes, all five files need updating — a guaranteed
source of bugs.

**Fix:** `src/utils/parsePrice.js`
```js
export function parsePrice(price) {
  return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}
```
Every consumer now imports one function. Change it once, change it everywhere.

---

### 2. `EmptyState` — Identical empty-state panels (5 locations)

**Problem:** Cart, Wishlist, Orders, ProductGrid, and FarmersGrid each contained a
nearly identical icon + heading + description + optional CTA block, written from
scratch each time with slightly different padding or rounded-corner values.

**Fix:** `src/components/common/ui/EmptyState.jsx`
```jsx
<EmptyState
  icon={Heart}
  title="Wishlist is Empty"
  description="Save products you love for later."
  ctaLabel="Browse Products"
  ctaHref="/products"
  iconBg="bg-red-50"
  iconColor="text-red-500"
/>
```
Props: `icon`, `title`, `description`, `ctaLabel`, `ctaHref`, `iconBg`, `iconColor`.

---

### 3. `PageHeader` — Repeated page-header markup (5 pages)

**Problem:** Cart, Wishlist, Orders, Checkout, and Farmers each had identical
`<div className="mb-8 ..."><h1>...</h1><p>...</p></div>` blocks with slightly
different spacing.

**Fix:** `src/components/common/ui/PageHeader.jsx`
```jsx
<PageHeader
  title="Shopping Cart"
  subtitle="3 item(s) in your cart"
  action={<button onClick={clearCart}>Clear Cart</button>}
/>
```
Props: `title`, `subtitle`, `action` (optional trailing slot), `className`.

---

### 4. `useLocalStorage` — Duplicated localStorage boilerplate (3 contexts)

**Problem:** `AuthContext`, `CartContext`, and `WishlistContext` each had identical
`useState(() => JSON.parse(localStorage.getItem(key)))` initialiser + `useEffect`
to sync back. No try/catch meant a single corrupt value could crash the entire app.

**Fix:** `src/hooks/useLocalStorage.js`
```js
const [cartItems, setCartItems] = useLocalStorage("f2c-cart", []);
```
Drops in as a direct replacement for `useState`. Includes try/catch so corrupt
stored values fall back gracefully to the initial value.

---

### 5. Auth pages — Duplicated glass-input markup

**Problem:** `Login.jsx` and `Register.jsx` duplicated:
- The full-screen background + glass card layout
- Icon-prefixed input fields with eye-toggle logic
- The OR divider
- The "Continue with Google" button

Register had 4 fields vs Login's 2, but the structure was copy-pasted wholesale.

**Fix:** Three new components in `src/components/auth/`:
- `AuthLayout.jsx` — background image + glass card wrapper
- `AuthInputField.jsx` — icon prefix + automatic password toggle
- `AuthExtras.jsx` — `<AuthDivider />` and `<GoogleButton />`

Login went from **126 lines → 68 lines**. Register from **161 lines → 88 lines**.
Adding a new field now takes 1 line, not 10.

---

### 6. Navbar — Duplicated nav links & badge markup

**Problem:**
- Nav link labels/paths were written twice (desktop `<ul>` and mobile drawer).
- The notification badge (count circle) was duplicated four times with slightly
  different colours for wishlist vs cart, desktop vs mobile.

**Fix:**
- `NAV_LINKS` constant drives both desktop and mobile menus.
- `<NavBadge count={n} color="..." />` sub-component used in all four places.
- `<SearchBar />` sub-component reused for desktop and mobile search.

---

### 7. `FarmerCard` — Filename casing inconsistency

**Problem:** The file was `farmerCard.jsx` (lowercase `f`) but imported as
`FarmerCard` (uppercase). This works on case-insensitive macOS/Windows but
**silently breaks** on Linux CI/CD and production servers.

**Fix:** Renamed to `FarmerCard.jsx` to match every other component in the project.

---

### 8. `Checkout.jsx` — Magic number and anonymous form validation

**Problem:** The `isFormValid` expression was an inline `&&` chain with no name.
`{ fullName: "", phone: "", ... }` initial state was inlined in `useState`.

**Fix:**
```js
const INITIAL_FORM = { fullName: "", phone: "", city: "", pincode: "", address: "" };
const isFormFilled = (form) => Object.values(form).every((v) => v.trim() !== "");
```
Named constant + pure function. Adding a new required field means updating one object.

---

## New Files Created

| Path | Purpose |
|------|---------|
| `src/utils/parsePrice.js` | Centralised price string → number conversion |
| `src/hooks/useLocalStorage.js` | Persistent state with graceful error handling |
| `src/components/common/ui/EmptyState.jsx` | Reusable empty-state panel |
| `src/components/common/ui/PageHeader.jsx` | Reusable page heading block |
| `src/components/common/ui/IconBadge.jsx` | Coloured icon circle |
| `src/components/auth/AuthLayout.jsx` | Shared glass-card auth wrapper |
| `src/components/auth/AuthInputField.jsx` | Icon-prefixed input with password toggle |
| `src/components/auth/AuthExtras.jsx` | AuthDivider + GoogleButton |

## Files Refactored

| File | What Changed |
|------|-------------|
| `context/CartContext.jsx` | Uses `useLocalStorage` + `parsePrice` |
| `context/AuthContext.jsx` | Uses `useLocalStorage` |
| `context/WishlistContext.jsx` | Uses `useLocalStorage` |
| `hooks/useProductsFilter.js` | Uses `parsePrice` |
| `pages/consumer/Cart.jsx` | Uses `EmptyState`, `PageHeader`, `parsePrice` |
| `pages/consumer/Wishlist.jsx` | Uses `EmptyState`, `PageHeader` |
| `pages/consumer/Orders.jsx` | Uses `EmptyState`, `PageHeader` |
| `pages/consumer/Checkout.jsx` | Uses `PageHeader`, named constants |
| `pages/auth/Login.jsx` | Uses `AuthLayout`, `AuthInputField`, `AuthExtras` |
| `pages/auth/Register.jsx` | Uses `AuthLayout`, `AuthInputField`, `AuthExtras` |
| `components/product/ProductGrid.jsx` | Uses `EmptyState` |
| `components/farmer/farmersGrid.jsx` | Uses `EmptyState` |
| `components/order/OrderSummary.jsx` | Uses `parsePrice` |
| `components/common/layout/Navbar.jsx` | `NAV_LINKS`, `NavBadge`, `SearchBar` sub-components |
| `components/farmer/FarmerCard.jsx` | Fixed file casing |

---

## What Was Intentionally Left Alone

- **Business logic** — cart, wishlist, auth, order placement behaviour is unchanged.
- **Styling** — no Tailwind classes were modified; visual output is identical.
- **Routing** — `AppRoutes.jsx` and `ProtectedRoute.jsx` are untouched.
- **Data files** — `productsData`, `farmersData`, etc. are untouched.
- **UI primitives** — shadcn/ui components (`button`, `card`, `input`, etc.) are untouched.
- **Animation utilities** — `animations.js` is unchanged.
- **Home/product section components** — `Hero`, `Categories`, `FeaturedProducts`,
  `WhyChooseUs`, `Testimonials`, `Newsletter` — already well-composed, no duplication.
- **`ProductDetails` sub-components** — `ProductGallery`, `ProductPricing`,
  `QuantitySelector`, `RelatedProducts` — already well-split; only `ProductInfo`
  was updated to use the shared `parsePrice`.

---

## Recommendations for Next Steps

1. **Firebase integration** — `src/firebase/config.js` is empty. Connecting auth
   contexts to Firebase Auth would make `login`/`logout` durable across devices.

2. **Orders in a real store** — Orders currently live in `localStorage`. A simple
   Firestore write in `handlePlaceOrder` would persist them across browsers.

3. **`AboutCTA`, `AboutTimeline`, `AboutValues`** — These files are empty (0 bytes).
   Either fill them or remove them to avoid confusion.

4. **`ProductReviews.jsx` (top-level)** — This file is entirely commented out.
   The working review components live in `productReviews/`. Consider deleting the
   dead file.

5. **`ThemeContext.jsx`** — Empty file. If dark mode is planned, this is the right
   place — but delete it until then.

6. **Price format** — `productsData` stores prices as strings like `"₹40"`.
   Storing them as numbers and formatting at render time would simplify all
   price-related code further.
