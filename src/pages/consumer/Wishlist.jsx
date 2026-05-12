import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/common/ui/EmptyState";
import PageHeader from "@/components/common/ui/PageHeader";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

export default function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <section className="min-h-screen bg-[var(--surface)] py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <PageHeader title="My Wishlist" subtitle="Your saved favourite products." />

        {wishlistItems.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Wishlist is Empty"
            description="Save products you love for later."
            ctaLabel="Browse Products"
            ctaHref="/products"
            iconBg="bg-red-50"
            iconColor="text-red-500"
          />
        ) : (
          <ProductGrid products={wishlistItems} gridClassName="lg:grid-cols-3 xl:grid-cols-4" />
        )}
      </div>
    </section>
  );
}
