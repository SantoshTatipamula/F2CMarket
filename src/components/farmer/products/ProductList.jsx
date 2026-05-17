import { PackageOpen } from "lucide-react";

import EmptyState from "@/components/common/ui/EmptyState";

import FarmerProductCard from "./FarmerProductCard";

export default function ProductList({ products = [], onEdit, onDelete }) {
  // Empty State
  if (!products.length) {
    return (
      <EmptyState
        icon={PackageOpen}
        title="No Products Found"
        description="Start adding products to manage your farm inventory."
        ctaLabel="Add Product"
        ctaHref="/farmer/products/add"
      />
    );
  }

  return (
    <div
      className="
    grid grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-6
  "
    >
      {products.map((product) => (
        <FarmerProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          canManage={true}
        />
      ))}
    </div>
  );
}
