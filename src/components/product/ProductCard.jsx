import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  MapPin,
} from "lucide-react";

export default function ProductCard({
  product,
  variant = "featured", // featured | catalog
}) {
  const isCatalog = variant === "catalog";

  return (
    <Link
      to={`/products/${product.id}`}
      className="block h-full"
    >
      <div className="group h-full bg-white border border-[var(--border)] rounded-3xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        {/* Image Area */}
        <div className="relative h-56 rounded-2xl overflow-hidden bg-[var(--surface-2)]">
          {/* Top Left Badge */}
          {isCatalog ? (
            <span className="absolute top-3 left-3 z-10 text-xs font-semibold bg-white/95 text-[var(--text-secondary)] px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <MapPin
                size={12}
                className="text-[var(--primary)]"
              />
              {product.location}
            </span>
          ) : (
            <span className="absolute top-3 left-3 z-10 text-xs font-semibold bg-[var(--primary)] text-white px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {e.preventDefault();
            e.stopPropagation();}}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-[var(--surface)] hover:scale-105 transition"
          >
            <Heart
              size={16}
              className="text-[var(--text-muted)] group-hover:text-[var(--error)] transition"
            />
          </button>

          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          {/* Farmer */}
          <p className="text-sm text-[var(--text-muted)]">
            {product.farmer}
          </p>

          {/* Name + Rating */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="font-semibold text-[var(--text-primary)] text-lg leading-snug line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-1 shrink-0 mt-1">
              <Star
                size={15}
                className="fill-amber-400 text-amber-400"
              />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Unit */}
          {isCatalog && (
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {product.unit || "1 Kg"}
            </p>
          )}

          {/* Bottom */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={(e) => e.preventDefault()}
              className="min-w-[120px] px-5 py-2.5 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold flex items-center justify-center gap-2 transition"
            >
              <ShoppingCart size={16} />
              Add
            </button>

            <div className="text-right">
              <span className="text-2xl font-bold text-[var(--primary)]">
                {product.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}