import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import AppLayout from "../components/common/layout/AppLayout";
import ScrollToTop from "@/components/common/layout/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "@/components/common/ui/PageLoader";

/* Lazy-load every page so each gets its own loading boundary */
const Home          = lazy(() => import("../pages/consumer/Home"));
const Products      = lazy(() => import("../pages/consumer/Products"));
const ProductDetails= lazy(() => import("../pages/consumer/ProductDetails"));
const Cart          = lazy(() => import("../pages/consumer/Cart"));
const Checkout      = lazy(() => import("../pages/consumer/Checkout"));
const OrderSuccess  = lazy(() => import("../pages/consumer/OrderSuccess"));
const Orders        = lazy(() => import("@/pages/consumer/Orders"));
const Farmers       = lazy(() => import("../pages/consumer/Farmers"));
const About         = lazy(() => import("../pages/common/About"));
const Wishlist      = lazy(() => import("../pages/consumer/Wishlist"));
const Login         = lazy(() => import("../pages/auth/Login"));
const Register      = lazy(() => import("../pages/auth/Register"));

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
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="farmers" element={<Farmers />} />
            <Route path="/about" element={<About />} />

            <Route path="checkout" element={
              <ProtectedRoute><Checkout /></ProtectedRoute>
            } />
            <Route path="orders" element={
              <ProtectedRoute><Orders /></ProtectedRoute>
            } />
            <Route path="order-success" element={<OrderSuccess />} />
          </Route>

          {/* Auth Pages */}
          <Route path="login"    element={<Login />} />
          <Route path="register" element={<Register />} />

        </Routes>
      </Suspense>
    </>
  );
}
