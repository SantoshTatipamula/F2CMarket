import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "@/components/farmer/products/ProductForm";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import { farmerProductsData } from "@/data/farmerProductsData";

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // Load Product
  useEffect(() => {
    const storedProducts =
      JSON.parse(
        localStorage.getItem(
          "f2c-farmer-products"
        )
      ) || [];

    const allProducts = [
      ...farmerProductsData,
      ...storedProducts,
    ];

    const foundProduct = allProducts.find(
      (item) => item.id.toString() === id
    );

    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  // Update Product
  const handleUpdateProduct = (
    updatedProduct
  ) => {
    const storedProducts =
      JSON.parse(
        localStorage.getItem(
          "f2c-farmer-products"
        )
      ) || [];

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

    localStorage.setItem(
      "f2c-farmer-products",
      JSON.stringify(updatedProducts)
    );

    navigate("/farmer/products");
  };

  // Loading
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
          Loading product...
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