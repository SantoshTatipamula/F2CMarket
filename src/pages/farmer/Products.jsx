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
      (product) => product.id !== productId
    );

    setProducts(updatedProducts);

    saveProducts(updatedProducts);
  };

  // Edit Product
  const handleEdit = (product) => {
    navigate(
      `/farmer/products/edit/${product.id}`
    );
  };

  // Search Filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <section className="space-y-8 py-8">
      
      {/* Header */}
      <WorkspaceHeader
        title="My Products"
        description="Manage your farm products and inventory."
        actionLabel="Add Product"
        onAction={() =>
          navigate("/farmer/products/add")
        }
      />

      {/* Actions */}
      <WorkspaceActions
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search products..."
      />

      {/* Products */}
      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </section>
  );
}