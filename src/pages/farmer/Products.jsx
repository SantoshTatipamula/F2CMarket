import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import ProductList from "@/components/farmer/products/ProductList";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import { useProducts } from "@/context/ProductContext";

import { useSearch } from "@/context/SearchContext";

export default function Products() {
  const navigate = useNavigate();

  // Global Search
  const { searchQuery } = useSearch();

  const { products, deleteProduct } = useProducts();

  // Delete Product
  const handleDelete = (productId) => {
    deleteProduct(productId);
  };

  // Edit Product
  const handleEdit = (product) => {
    navigate(`/farmer/products/edit/${product.id}`);
  };

  // Search Filter
  const filteredProducts = useMemo(() => {
    const searchTerm = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.status?.toLowerCase().includes(searchTerm) ||
        product.farmerName?.toLowerCase().includes(searchTerm)
      );
    });
  }, [products, searchQuery]);

  return (
    <section
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-8
        px-4
        py-6
        sm:px-6
        lg:px-8
        lg:py-8
      "
    >
      {/* Header */}
      <WorkspaceHeader
        title="My Products"
        description="Manage your farm products and inventory."
        actionLabel="Add Product"
        onAction={() => navigate("/farmer/products/add")}
      />

      {/* Overview */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div
          className="
            rounded-3xl
            border border-black/5
            bg-white
            p-5 shadow-sm
          "
        >
          <p className="text-sm text-[var(--text-secondary)]">Total Products</p>

          <h3 className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
            {products.length}
          </h3>
        </div>

        <div
          className="
            rounded-3xl
            border border-black/5
            bg-white
            p-5 shadow-sm
          "
        >
          <p className="text-sm text-[var(--text-secondary)]">Low Stock</p>

          <h3 className="mt-2 text-3xl font-bold text-orange-500">
            {products.filter((product) => Number(product.stock) <= 10).length}
          </h3>
        </div>

        <div
          className="
            rounded-3xl
            border border-black/5
            bg-white
            p-5 shadow-sm
          "
        >
          <p className="text-sm text-[var(--text-secondary)]">
            Active Listings
          </p>

          <h3 className="mt-2 text-3xl font-bold text-emerald-500">
            {products.length}
          </h3>
        </div>
      </div>

      {/* Products */}
      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </section>
  );
}
