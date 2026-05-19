
import { useAuth } from "@/context/AuthContext";

import { Navigate, useNavigate, useParams } from "react-router-dom";

import ProductForm from "@/components/farmer/products/ProductForm";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import { getProductById } from "@/services/productService";

import { useProducts } from "@/context/ProductContext";

export default function EditProduct() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { updateProduct } = useProducts();

  const { id } = useParams();

  // Get Product
  const product = getProductById(id);

  const isOwner = product?.sellerId === user?.id;

  // Update Product
  const handleUpdateProduct = (updatedProduct) => {
    updateProduct(id, updatedProduct);

    navigate("/farmer/products");
  };

  if (product && !isOwner) {
    return <Navigate to="/farmer/products" replace />;
  }

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
        <div
          className="
            rounded-3xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-8
            text-center
          "
        >
          <p className="text-sm text-[var(--text-secondary)]">
            Product not found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <section
        className="
          border-b border-[var(--border)]
          bg-gradient-to-br
          from-[var(--primary)]/10
          via-transparent
          to-transparent
        "
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
          <div className="max-w-3xl">
            <WorkspaceHeader
              title="Edit Product"
              description="Update and manage your marketplace product information."
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div
          className="
            overflow-hidden
            rounded-3xl
            border border-[var(--border)]
            bg-[var(--surface)]
            shadow-sm
          "
        >
          {/* Card Header */}
          <div
            className="
              border-b border-[var(--border)]
              bg-gradient-to-r
              from-[var(--primary)]/5
              via-transparent
              to-transparent
              px-6 md:px-8 py-6
            "
          >
            <div className="max-w-2xl">
              <div
                className="
                  inline-flex items-center
                  rounded-full
                  bg-[var(--primary)]/10
                  px-3 py-1
                  text-xs font-semibold
                  text-[var(--primary)]
                "
              >
                Farmer Workspace
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Product Information
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                Keep your marketplace listings accurate and updated for better
                customer engagement.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <ProductForm
              initialData={product}
              onSubmit={handleUpdateProduct}
              submitLabel="Update Product"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
