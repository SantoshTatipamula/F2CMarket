// src/pages/consumer/ProductDetails.jsx

import { Link, useParams } from "react-router-dom";
import { Home, ChevronRight, ArrowLeft, Shield, Truck, Leaf } from "lucide-react";

import { productsData } from "@/data/productsData";

import ProductGallery from "@/components/productDetails/ProductGallery";
import ProductInfo from "@/components/productDetails/ProductInfo";
import FarmerCard from "@/components/productDetails/FarmerCard";

import ProductReviews from "@/components/productDetails/productReviews/ProductReviews";
import RelatedProducts from "@/components/productDetails/RelatedProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((item) => String(item.id) === String(id));

  /* Product Not Found */
  if (!product) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[var(--bg)] to-white px-4 py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-[var(--border)] bg-white p-12 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <ArrowLeft size={32} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Product Not Found
          </h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            The product you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:scale-105 hover:shadow-xl"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[var(--bg)] via-white to-[var(--bg)] pb-20 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[var(--text-muted)] transition hover:text-[var(--primary)]"
          >
            <Home size={15} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="text-[var(--text-muted)]" />
          <Link
            to="/products"
            className="text-[var(--text-muted)] transition hover:text-[var(--primary)]"
          >
            Products
          </Link>
          <ChevronRight size={14} className="text-[var(--text-muted)]" />
          <span className="font-medium text-[var(--text-primary)]">
            {product.name}
          </span>
        </nav>


        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* LEFT — Gallery + Farmer + Trust (fills the space) */}
          <div className="space-y-6">
            <ProductGallery product={product} />
            <FarmerCard product={product} />
            {/* <TrustIndicators /> */}
          </div>

          {/* RIGHT — Sticky Purchase Box */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Reviews */}
        <ProductReviews product={product} />

        {/* Related Products */}
        <RelatedProducts product={product} />
      </div>
    </section>
  );
}