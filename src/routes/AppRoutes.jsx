import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import AppLayout from "../components/common/layout/AppLayout";
import ScrollToTop from "@/components/common/layout/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "@/components/common/ui/PageLoader";

/* Lazy-load every page so each gets its own loading boundary */
const Home = lazy(() => import("../pages/consumer/Home"));
const Products = lazy(() => import("../pages/consumer/Products"));
const ProductDetails = lazy(() => import("../pages/consumer/ProductDetails"));
const Cart = lazy(() => import("../pages/consumer/Cart"));
const Checkout = lazy(() => import("../pages/consumer/Checkout"));
const OrderSuccess = lazy(() => import("../pages/consumer/OrderSuccess"));
const Orders = lazy(() => import("@/pages/consumer/Orders"));
const Farmers = lazy(() => import("../pages/consumer/Farmers"));
const Wishlist = lazy(() => import("../pages/consumer/Wishlist"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const FarmerDashboard = lazy(() => import("../pages/farmer/Dashboard"));
const FarmerProducts = lazy(() => import("../pages/farmer/Products"));
const AddProduct = lazy(() => import("../pages/farmer/AddProduct"));
const FarmerOrders = lazy(() => import("../pages/farmer/Orders"));
const FarmerAnalytics = lazy(() => import("../pages/farmer/Analytics"));
const FarmerProfile = lazy(() => import("../pages/farmer/Profile"));
const EditProduct = lazy(() => import("../pages/farmer/EditProduct"));
const Profile = lazy(() => import("../pages/profile/Profile"));

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main App */}
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route
              path="cart"
              element={
                <ProtectedRoute allowedRoles={["consumer"]}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="wishlist"
              element={
                <ProtectedRoute allowedRoles={["consumer"]}>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route path="farmers" element={<Farmers />} />

            <Route
              path="checkout"
              element={
                <ProtectedRoute allowedRoles={["consumer"]}>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute allowedRoles={["consumer", "farmer"]}>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={["consumer", "farmer", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="order-success"
              element={
                <ProtectedRoute allowedRoles={["consumer"]}>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />

            {/* Farmer Routes */}

            <Route
              path="farmer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="farmer/products"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <FarmerProducts />
                </ProtectedRoute>
              }
            />

            <Route
              path="farmer/products/add"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="farmer/orders"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <FarmerOrders />
                </ProtectedRoute>
              }
            />

            <Route
              path="farmer/analytics"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <FarmerAnalytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="farmer/profile"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <FarmerProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="farmer/products/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Auth Pages */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Suspense>
    </>
  );
}
