// src/components/productDetails/ProductActions.jsx

import { ShoppingCart, Heart, Share2, Zap } from "lucide-react";

import { useWishlist } from "@/context/WishlistContext";

import { toast } from "sonner";

export default function ProductActions({ product, onAddToCart, onBuyNow }) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  const handleShare = async () => {
  const productUrl = `${window.location.origin}/products/${product.id}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out this product on F2CMARKET`,
        url: productUrl,
      });

      return;
    }

    await navigator.clipboard.writeText(productUrl);

    toast.success("Product link copied to clipboard");
  } catch (error) {
    console.error("Share failed:", error);

    toast.error("Unable to share product");
  }
};


  return (
    <div className="space-y-3">
      {/* Add to Cart */}
      <button
        onClick={onAddToCart}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-green-600 px-8 py-4 font-bold text-white shadow-lg shadow-[var(--primary)]/30 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-100"
      >
        <ShoppingCart
          size={20}
          className="transition-transform group-hover:scale-110"
        />
        <span>Add to Cart</span>
      </button>

      {/* Buy Now (restored) */}
      <button
        onClick={onBuyNow}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-bold text-white shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-100"
      >
        <Zap
          size={20}
          fill="white"
          className="transition-transform group-hover:scale-110"
        />
        <span>Buy Now</span>
      </button>

      {/* Save / Share */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            toggleWishlist(product);

            if (isFavorite) {
              toast.error(`${product.name} removed from wishlist`);
            } else {
              toast.success(`${product.name} added to wishlist`);
            }
          }}
          className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-6 py-3 font-semibold transition-all ${
            isFavorite
              ? "border-red-500 bg-red-50 text-red-600"
              : "border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          }`}
        >
          <Heart size={18} className={isFavorite ? "fill-current" : ""} />
          <span className="hidden sm:inline">
            {isFavorite ? "Saved" : "Save"}
          </span>
        </button>

        <button
  onClick={handleShare}
  className="
    flex items-center justify-center gap-2
    rounded-2xl
    border-2 border-[var(--border)]
    bg-white
    px-6 py-3
    font-semibold
    text-[var(--text-secondary)]
    transition-all
    hover:border-[var(--primary)]
    hover:bg-[var(--primary)]/5
    hover:text-[var(--primary)]
  "
>
  <Share2 size={18} />
  <span className="hidden sm:inline">Share</span>
</button>
      </div>
    </div>
  );
}
