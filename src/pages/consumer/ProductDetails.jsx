import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useProducts } from "@/context/ProductContext";

import Breadcrumb from "@/components/common/ui/Breadcrumb";

import ProductGallery from "@/components/productDetails/ProductGallery";
import ProductInfo from "@/components/productDetails/ProductInfo";
import FarmerCard from "@/components/productDetails/FarmerCard";
import ProductReviews from "@/components/productDetails/productReviews/ProductReviews";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import ProductDetailsSkeleton from "@/components/common/loaders/ProductDetailsSkeleton";
import ErrorState from "@/components/common/ui/ErrorState";

export default function ProductDetails() {
  const { id } = useParams();

  const { products, loading, error, refreshProducts } = useProducts();

  const product = products.find((p) => String(p.id) === String(id));

  if (loading) {
  return <ProductDetailsSkeleton />;
}

  if (error && !product) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[var(--bg)] to-white px-4 py-20">
        <div className="mx-auto max-w-lg">
          <ErrorState
            title="Couldn't load this product"
            description="We ran into a problem loading product details. Please try again."
            onRetry={refreshProducts}
          />
        </div>
      </section>
    );
  }

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
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:scale-105 hover:shadow-xl"
          >
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[var(--bg)] via-white to-[var(--bg)] pb-20 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb: Home > Products > Product Name */}
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />

        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div className="space-y-6">
            <ProductGallery product={product} />
            <FarmerCard product={product} />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>

        <ProductReviews product={product} />
        <RelatedProducts product={product} />
      </div>
    </section>
  );
}