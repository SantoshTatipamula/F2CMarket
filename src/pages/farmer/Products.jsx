import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import ProductList from "@/components/farmer/products/ProductList";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import { useProducts } from "@/context/ProductContext";

import { useSearch } from "@/context/SearchContext";

import { useAuth } from "@/context/AuthContext";

export default function Products() {
  const navigate = useNavigate();

  const { user } = useAuth();

  // Global Search
  const { searchQuery } = useSearch();

  const { products, loading, deleteProduct } = useProducts();

  // Delete Product
  const handleDelete = async (productId) => {
    await deleteProduct(productId);
  };

  // Edit Product
  const handleEdit = (product) => {
    navigate(`/farmer/products/edit/${product.id}`);
  };

  const sellerProducts = useMemo(() => {
    return products.filter((product) => product.sellerId === user?.id);
  }, [products, user]);

  // Search Filter
  const filteredProducts = useMemo(() => {
    const searchTerm = searchQuery.toLowerCase().trim();

    return sellerProducts.filter((product) => {
      return (
        product.name?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.status?.toLowerCase().includes(searchTerm) ||
        product.sellerName?.toLowerCase().includes(searchTerm)
      );
    });
  }, [sellerProducts, searchQuery]);

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
            {sellerProducts.length}
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
            {
              sellerProducts.filter((product) => Number(product.stock) <= 10)
                .length
            }
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
            {sellerProducts.length}
          </h3>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-sm text-[var(--text-secondary)]">
          Loading products…
        </div>
      )}

      {/* Products */}
      {!loading && (
        <ProductList
          products={filteredProducts}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </section>
  );
}
