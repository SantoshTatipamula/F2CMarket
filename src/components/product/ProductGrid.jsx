import { SearchX } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function ProductGrid({
  products,
  gridClassName = "",
}) {
  if (products.length === 0) {
    return (
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-10 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-5">
          <SearchX
            size={30}
            className="text-[var(--text-muted)]"
          />
        </div>

        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
          No Products Found
        </h3>

        <p className="text-[var(--text-muted)] mt-2 max-w-sm">
          Try changing filters, location, category,
          or price range.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid sm:grid-cols-2 xl:grid-cols-3 gap-6 ${gridClassName}`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant="catalog"
        />
      ))}
    </div>
  );
}