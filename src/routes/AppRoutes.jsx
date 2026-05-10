import { Routes, Route } from "react-router-dom";

import AppLayout from "../components/common/layout/AppLayout";
import ScrollToTop from "@/components/common/layout/ScrollToTop";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/consumer/Home";
import Products from "../pages/consumer/Products";
import ProductDetails from "../pages/consumer/ProductDetails";
import Cart from "../pages/consumer/Cart";
import Checkout from "../pages/consumer/Checkout";
import OrderSuccess from "../pages/consumer/OrderSuccess";
import Orders from "@/pages/consumer/Orders";
import Farmers from "../pages/consumer/Farmers";
import About from "../pages/common/About";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Wishlist from "../pages/consumer/Wishlist";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* Main App */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />

          <Route path="products" element={<Products />} />

          <Route
            path="products/:id"
            element={<ProductDetails />}
          />

          <Route path="cart" element={<Cart />} />

          <Route path="wishlist" element={<Wishlist />} />

          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="order-success"
            element={<OrderSuccess />}
          />
        <Route path="farmers" element={<Farmers />} />

        <Route path="/about" element={<About />} />
        </Route>


        {/* Auth Pages */}
        <Route path="login" element={<Login />} />

        <Route
          path="register"
          element={<Register />}
        />

      </Routes>
    </>
  );
}