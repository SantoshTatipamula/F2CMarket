import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import ProductList from "@/components/farmer/products/ProductList";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import WorkspaceActions from "@/components/farmer/workspace/WorkspaceActions";

import { farmerProductsData } from "@/data/farmerProductsData";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  // Load Products
  useEffect(() => {
    const storedProducts =
      JSON.parse(
        localStorage.getItem(
          "f2c-farmer-products"
        )
      ) || [];

    setProducts([
      ...farmerProductsData,
      ...storedProducts,
    ]);
  }, []);

  // Delete Product
  const handleDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    setProducts(updatedProducts);

    // Save only custom products
    const customProducts =
      updatedProducts.filter(
        (product) => product.id > 100000
      );

    localStorage.setItem(
      "f2c-farmer-products",
      JSON.stringify(customProducts)
    );
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
      
      {/* Workspace Header */}
      <WorkspaceHeader
        title="My Products"
        description="Manage your farm products and inventory."
        actionLabel="Add Product"
        onAction={() =>
          navigate("/farmer/products/add")
        }
      />

      {/* Workspace Controls */}
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