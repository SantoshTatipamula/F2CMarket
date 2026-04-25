import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/common/layout/AppLayout";

import Home from "../pages/consumer/Home";
import Products from "../pages/consumer/Products";
import ProductDetails from "../pages/consumer/ProductDetails";
import ScrollToTop from "@/components/common/layout/ScrollToTop";

export default function AppRoutes() {
  return (
    <>
    <ScrollToTop/>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
    </>
  );
}
