import { PackageCheck, AlertTriangle } from "lucide-react";

import ProductActions from "./ProductActions";

export default function FarmerProductCard({
  product,
  onEdit,
  onDelete,
  canManage = false,
}) {
  const lowStock = Number(product.stock) <= 10;

  return (
    <article
      className="
        group overflow-hidden
        rounded-3xl
        border border-black/5
        bg-white
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-full w-full object-cover
            transition duration-500
            group-hover:scale-105
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent
          "
        />

        {/* Status */}
        <div className="absolute left-4 top-4">
          {lowStock ? (
            <div
              className="
                flex items-center gap-1.5
                rounded-full
                bg-orange-500
                px-3 py-1
                text-xs font-medium text-white
              "
            >
              <AlertTriangle size={14} />
              Low Stock
            </div>
          ) : (
            <div
              className="
                flex items-center gap-1.5
                rounded-full
                bg-emerald-500
                px-3 py-1
                text-xs font-medium text-white
              "
            >
              <PackageCheck size={14} />
              Active
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="
    flex h-full flex-col
    p-5
  "
      >
        {/* Top */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {product.name}
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {product.category}
              </p>
            </div>

            <div
              className="
                rounded-2xl
                bg-[var(--primary)]/10
                px-3 py-1.5
                text-sm font-semibold
                text-[var(--primary)]
              "
            >
              ₹{product.price}
            </div>
          </div>

          <p
            className="
              mt-4 line-clamp-2
              text-sm leading-relaxed
              text-[var(--text-secondary)]
            "
          >
            {product.description}
          </p>
        </div>

        {/* Stats */}
        <div
          className="
            mt-5 grid grid-cols-2 gap-4
          "
        >
          <div
            className="
              rounded-2xl
              border border-black/5
              bg-[var(--surface)]
              p-3
            "
          >
            <p className="text-xs text-[var(--text-secondary)]">Stock</p>

            <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
  {product.stock}{" "}
  <span className="text-sm font-medium text-[var(--text-secondary)]">
    {product.stockUnit || "kg"}
  </span>
</p>
          </div>

          <div
            className="
              rounded-2xl
              border border-black/5
              bg-[var(--surface)]
              p-3
            "
          >
            <p className="text-xs text-[var(--text-secondary)]">Orders</p>

            <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
              {product.totalOrders || 0}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5">
          {canManage && (
            <div className="mt-5">
              <ProductActions
                onEdit={() => onEdit(product)}
                onDelete={() => onDelete(product.id)}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
