import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import ProductList from "@/components/farmer/products/ProductList";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import WorkspaceActions from "@/components/farmer/workspace/WorkspaceActions";

import {
  getProducts,
  initializeProducts,
  saveProducts,
} from "@/utils/productStorage";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  // Initialize + Load Products
  useEffect(() => {
    initializeProducts();

    setProducts(getProducts());
  }, []);

  // Delete Product
  const handleDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId,
    );

    setProducts(updatedProducts);

    saveProducts(updatedProducts);
  };

  // Edit Product
  const handleEdit = (product) => {
    navigate(`/farmer/products/edit/${product.id}`);
  };

  // Search Filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

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

      {/* Actions */}
      <WorkspaceActions
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search products..."
      />

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
