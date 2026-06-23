import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingCart, Star, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ProductCard({
  product,
  variant = "featured", // featured | catalog
}) {
  const isCatalog = variant === "catalog";

  const { addToCart } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  return (
    <Link to={`/products/${product.id}`} className="block h-full">
      <div className="group h-full bg-white border border-[var(--border)] rounded-3xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        {/* Image Area */}
        <div className="relative h-56 rounded-2xl overflow-hidden bg-[var(--surface-2)]">
          {/* Top Left Badge */}
          {isCatalog ? (
            <span className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] shadow-sm">
              <MapPin size={12} className="text-[var(--primary)]" />

              {product.location ||
                (typeof product.farmLocation === "string"
                  ? product.farmLocation
                  : product.farmLocation?.city) ||
                "Location not available"}
            </span>
          ) : (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white">
              {product.category || "Featured"}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toggleWishlist(product);
              if (isWishlisted) {
                toast.error(`${product.name} removed from wishlist`);
                console.log(product);
              } else {
                toast.success(`${product.name} added to wishlist`);
              }
            }}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-[var(--surface)] hover:scale-105 transition"
          >
            <Heart
              size={16}
              className={`transition ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-[var(--text-muted)] hover:text-red-500"
              }`}
            />
          </button>

          {/* Image */}
          {/* Image */}
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[var(--surface)] text-sm text-[var(--text-secondary)]">
              No Image Available
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-4">
          {/* Farmer */}
          <p className="text-sm text-[var(--text-muted)]">
            {product.farmName || product.farmer}
          </p>

          {/* Name + Rating */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="font-semibold text-[var(--text-primary)] text-lg leading-snug line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-1 shrink-0 mt-1">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Unit */}
          {isCatalog && (
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {`1 ${product.stockUnit || "kg"}`}
            </p>
          )}

          {/* Available Stock */}
          {product.stock && (
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Available: {product.stock} {product.stockUnit || "kg"}
            </p>
          )}

          {/* Bottom */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                addToCart(product);
                toast.success(`${product.name} added to cart`);
              }}
              className="min-w-[120px] px-5 py-2.5 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold flex items-center justify-center gap-2 transition"
            >
              <ShoppingCart size={16} />
              Add
            </button>

            <div className="text-right">
              <div className="flex items-center justify-end">
                <span className="text-2xl font-bold text-orange-500">₹</span>

                <span className="text-2xl font-bold text-[var(--primary)]">
                  {String(product.price).replace(/^₹/, "")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
