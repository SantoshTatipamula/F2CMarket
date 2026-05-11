import { SearchX } from "lucide-react";

import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/ui/EmptyState";

export default function ProductGrid({ products, gridClassName = "" }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No Products Found"
        description="Try changing filters, location, category, or price range."
      />
    );
  }

  return (
    <div className={`grid sm:grid-cols-2 xl:grid-cols-3 gap-6 ${gridClassName}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="catalog" />
      ))}
    </div>
  );
}
