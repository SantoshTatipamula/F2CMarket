import { useNavigate } from "react-router-dom";


import ProductForm from "@/components/farmer/products/ProductForm";

export default function AddProduct() {
  const navigate = useNavigate();

  const handleAddProduct = (newProduct) => {
    // Get existing products
    const existingProducts =
      JSON.parse(
        localStorage.getItem(
          "f2c-farmer-products"
        )
      ) || [];

    // Save updated products
    localStorage.setItem(
      "f2c-farmer-products",
      JSON.stringify([
        ...existingProducts,
        newProduct,
      ])
    );

    console.log("New Product:", newProduct);

    // Redirect
    navigate("/farmer/products");
  };

  return (
    <section  className="space-y-6 py-8">
      <div className="space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Add Product
          </h1>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Add new farm products to your store.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <ProductForm
            onSubmit={handleAddProduct}
            submitLabel="Add Product"
          />
        </div>
      </div>
    </section>
  );
}