import EmptyState from "@/components/common/ui/EmptyState";

import FarmerProductCard from "./FarmerProductCard";

export default function ProductList({
  products = [],
  onEdit,
  onDelete,
}) {
  // Empty State
  if (!products.length) {
    return (
      <EmptyState
        title="No Products Found"
        description="Start adding products to manage your farm inventory."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map((product) => (
        <FarmerProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}