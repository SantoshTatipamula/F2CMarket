import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/common/layout/AppLayout";
import ScrollToTop from "@/components/common/layout/ScrollToTop";

import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";

import Home from "../pages/consumer/Home";
import Products from "../pages/consumer/Products";
import ProductDetails from "../pages/consumer/ProductDetails";
import Cart from "../pages/consumer/Cart";
import Checkout from "../pages/consumer/Checkout";
import OrderSuccess from "../pages/consumer/OrderSuccess";
import Orders from "@/pages/consumer/Orders";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<AppLayout />}>

          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />

          {/* 🔒 Protected Routes */}
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

          {/* Success page (optional protection) */}
          <Route path="order-success" element={<OrderSuccess />} />

          <Route path="login" element={<Login />} />

        </Route>
      </Routes>
    </>
  );
}