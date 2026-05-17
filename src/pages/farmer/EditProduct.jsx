import { useMemo } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ProductForm from "@/components/farmer/products/ProductForm";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import {
  getProducts,
  saveProducts,
} from "@/services/productService";

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams();

  // Get Products
  const storedProducts =
    getProducts();

  // Find Product
  const product = useMemo(() => {
    return storedProducts.find(
      (item) =>
        item.id.toString() === id
    );
  }, [storedProducts, id]);

  // Update Product
  const handleUpdateProduct = (
    updatedProduct
  ) => {
    const updatedProducts =
      storedProducts.map((product) =>
        product.id.toString() === id
          ? {
              ...product,
              ...updatedProduct,
              id: product.id,
            }
          : product
      );

    saveProducts(updatedProducts);

    navigate("/farmer/products");
  };

  // Product Not Found
  if (!product) {
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
        <p className="text-sm text-[var(--text-secondary)]">
          Product not found.
        </p>
      </section>
    );
  }

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
        title="Edit Product"
        description="Update your product information."
      />

      {/* Form */}
      <div
        className="
          rounded-3xl
          border border-[var(--border)]
          bg-[var(--surface)]
          p-6
        "
      >
        <ProductForm
          initialData={product}
          onSubmit={handleUpdateProduct}
          submitLabel="Update Product"
        />
      </div>
    </section>
  );
}