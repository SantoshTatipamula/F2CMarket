import { Link } from "react-router-dom";

import { useWishlist } from "@/context/WishlistContext";

import ProductGrid from "@/components/product/ProductGrid";

import { Heart } from "lucide-react";

export default function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <section className="min-h-screen bg-[var(--surface)] py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            My Wishlist
          </h1>

          <p className="mt-2 text-[var(--text-secondary)]">
            Your saved favorite products.
          </p>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white border border-[var(--border)] rounded-3xl p-10 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
              <Heart size={30} className="text-red-500" />
            </div>

            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
              Wishlist is Empty
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
              Save products you love for later.
            </p>

            <Link
              to="/products"
              className="inline-flex mt-6 px-6 py-3 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Reused Product Grid */
          <ProductGrid
            products={wishlistItems}
            gridClassName="lg:grid-cols-3 xl:grid-cols-4"
          />
        )}
      </div>
    </section>
  );
}
