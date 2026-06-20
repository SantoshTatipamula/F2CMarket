import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout      from "@/components/common/layout/AppLayout";
import ScrollToTop    from "@/components/common/layout/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import PageLoader     from "@/components/common/ui/PageLoader";

/* ── Public ──────────────────────────────────────────────── */
const Home            = lazy(() => import("@/pages/consumer/Home"));
const Products        = lazy(() => import("@/pages/consumer/Products"));
const ProductDetails  = lazy(() => import("@/pages/consumer/ProductDetails"));
const Farmers         = lazy(() => import("@/pages/consumer/Farmers"));
const FarmerProfile   = lazy(() => import("@/pages/consumer/FarmerProfile"));
const About           = lazy(() => import("@/pages/common/About"));
const Contact         = lazy(() => import("@/pages/common/Contact"));
const Faq             = lazy(() => import("@/pages/common/FAQ"));
const HelpCenter      = lazy(() => import("@/pages/common/HelpCenter"));
const PrivacyPolicy   = lazy(() => import("@/pages/common/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/common/TermsConditions"));

/* ── Auth ────────────────────────────────────────────────── */
const Login               = lazy(() => import("@/pages/auth/Login"));
const Register            = lazy(() => import("@/pages/auth/Register"));
const PendingVerification = lazy(() => import("@/pages/auth/PendingVerification"));
const ForgotPassword      = lazy(() => import("@/pages/auth/ForgotPassword"));

/* ── Consumer ────────────────────────────────────────────── */
const Cart          = lazy(() => import("@/pages/consumer/Cart"));
const Wishlist      = lazy(() => import("@/pages/consumer/Wishlist"));
const Checkout      = lazy(() => import("@/pages/consumer/Checkout"));
const Orders        = lazy(() => import("@/pages/consumer/Orders"));
const OrderSuccess  = lazy(() => import("@/pages/consumer/OrderSuccess"));

/* ── Farmer ──────────────────────────────────────────────── */
const Dashboard     = lazy(() => import("@/pages/dashboard/Dashboard"));
const Analytics     = lazy(() => import("@/pages/dashboard/Analytics"));
const FarmerProducts= lazy(() => import("@/pages/farmer/Products"));
const AddProduct    = lazy(() => import("@/pages/farmer/AddProduct"));
const EditProduct   = lazy(() => import("@/pages/farmer/EditProduct"));
const FarmerOrders  = lazy(() => import("@/pages/farmer/Orders"));
const FarmerPendingDashboard = lazy(() => import("@/pages/farmer/FarmerPendingDashboard"));

/* ── Admin ───────────────────────────────────────────────── */
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminLogin     = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminUsers     = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminFarmers   = lazy(() => import("@/pages/admin/AdminFarmers"));
const AdminProducts  = lazy(() => import("@/pages/admin/AdminProducts"));

/* ── Profile ─────────────────────────────────────────────── */
const Profile         = lazy(() => import("@/pages/profile/MyProfile"));
const EditProfile     = lazy(() => import("@/pages/profile/EditProfile"));
const ProfileSettings = lazy(() => import("@/pages/profile/ProfileSettings"));
const Security        = lazy(() => import("@/pages/profile/Security"));
const Notifications   = lazy(() => import("@/pages/profile/Notifications"));
const ActivityHistory = lazy(() => import("@/pages/profile/ActivityHistory"));
const SellerProducts  = lazy(() => import("@/pages/profile/SellerProducts"));
const SellerReviews   = lazy(() => import("@/pages/profile/SellerReviews"));

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Layout wrapper ──────────────────────────── */}
          <Route element={<AppLayout />}>

            {/* Public */}
            <Route index             element={<Home />} />
            <Route path="products"   element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="farmers"    element={<Farmers />} />
            <Route path="farmers/:farmerId" element={<FarmerProfile />} />
            <Route path="about"      element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq/>} />
            <Route path="/helpCenter" element={<HelpCenter/>} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
            <Route path="/termsConditions" element={<TermsConditions/>} />

            {/* Cart + Wishlist — consumers AND farmers */}
            <Route path="cart" element={
              <ProtectedRoute allowedRoles={["consumer","farmer"]}>
                <Cart />
              </ProtectedRoute>
            }/>
            <Route path="wishlist" element={
              <ProtectedRoute allowedRoles={["consumer","farmer"]}>
                <Wishlist />
              </ProtectedRoute>
            }/>
            <Route path="checkout" element={
              <ProtectedRoute allowedRoles={["consumer","farmer"]}>
                <Checkout />
              </ProtectedRoute>
            }/>
            <Route path="orders" element={
              <ProtectedRoute allowedRoles={["consumer"]}>
                <Orders />
              </ProtectedRoute>
            }/>
            <Route path="order-success" element={<OrderSuccess />} />

            {/* Profile — all logged-in roles */}
            <Route path="profile" element={
              <ProtectedRoute allowedRoles={["consumer","farmer","admin"]}>
                <Profile />
              </ProtectedRoute>
            }/>
            <Route path="profile/edit" element={
              <ProtectedRoute allowedRoles={["consumer","farmer","admin"]}>
                <EditProfile />
              </ProtectedRoute>
            }/>
            <Route path="profile/settings" element={
              <ProtectedRoute allowedRoles={["consumer","farmer","admin"]}>
                <ProfileSettings />
              </ProtectedRoute>
            }/>
            <Route path="profile/security" element={
              <ProtectedRoute allowedRoles={["consumer","farmer","admin"]}>
                <Security />
              </ProtectedRoute>
            }/>
            <Route path="profile/notifications" element={
              <ProtectedRoute allowedRoles={["consumer","farmer","admin"]}>
                <Notifications />
              </ProtectedRoute>
            }/>
            <Route path="profile/activity" element={
              <ProtectedRoute allowedRoles={["consumer","farmer","admin"]}>
                <ActivityHistory />
              </ProtectedRoute>
            }/>
            <Route path="profile/seller-products" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <SellerProducts />
              </ProtectedRoute>
            }/>
            <Route path="profile/seller-reviews" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <SellerReviews />
              </ProtectedRoute>
            }/>

            {/* Farmer workspace */}
            {/* Pending farmer workspace — accessible with pending status */}
            <Route path="farmer/pending" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <FarmerPendingDashboard />
              </ProtectedRoute>
            }/>

            <Route path="farmer/dashboard" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <Dashboard />
              </ProtectedRoute>
            }/>
            <Route path="farmer/analytics" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <Analytics />
              </ProtectedRoute>
            }/>
            <Route path="farmer/products" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <FarmerProducts />
              </ProtectedRoute>
            }/>
            <Route path="farmer/products/add" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <AddProduct />
              </ProtectedRoute>
            }/>
            <Route path="farmer/products/edit/:id" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <EditProduct />
              </ProtectedRoute>
            }/>
            <Route path="farmer/orders" element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <FarmerOrders />
              </ProtectedRoute>
            }/>

            {/* Admin workspace */}
            <Route path="admin/dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }/>
            <Route path="admin/users" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }/>
            <Route path="admin/farmers" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminFarmers />
              </ProtectedRoute>
            }/>
            <Route path="admin/products" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminProducts />
              </ProtectedRoute>
            }/>

          </Route>

          {/* ── No-layout pages ─────────────────────────── */}
          <Route path="login"                 element={<Login />} />
          <Route path="register"              element={<Register />} />
          <Route path="admin/login"            element={<AdminLogin />} />
          <Route path="pending-verification"  element={<PendingVerification />} />
          <Route path="forgot-password"        element={<ForgotPassword />} />

          {/* ── Catch-all ───────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </>
  );
}
