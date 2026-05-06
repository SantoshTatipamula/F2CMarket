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

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

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