import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";

import ProductForm from "@/components/farmer/products/ProductForm";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

export default function AddProduct() {
  const navigate = useNavigate();
  const { user }  = useAuth();
  const { createProduct } = useProducts();

  const handleAddProduct = async (newProduct) => {
  await createProduct({
    ...newProduct,

    // Ownership
    sellerId: user?.id,
    sellerName: user?.name,

    // Farmer details
    farmerId: user?.id,
    farmerName: user?.name,

    farmName:
      user?.farmerProfile?.farmName || "",

    farmLocation:
      user?.farmerProfile?.location || null,

    farmerAvatar:
      user?.avatar || "",

    // Backward compatibility
    farmer:
      user?.farmerProfile?.farmName ||
      user?.name,

    location:
      user?.farmerProfile?.location?.city || "",
  });

  navigate("/farmer/products");
};

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      
      {/* Workspace Hero */}
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
              title="Add Product"
              description="Publish fresh farm products directly to consumers through F2CMARKET."
            />
          </div>
        </div>
      </section>

      {/* Workspace Content */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Main Form Card */}
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
                  Accurate product listings improve visibility, trust,
                  and customer engagement across the marketplace.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 md:p-8">
              <ProductForm
                onSubmit={handleAddProduct}
                submitLabel="Publish Product"
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            
            {/* Tips Card */}
            <div
              className="
                rounded-3xl
                border border-[var(--border)]
                bg-[var(--surface)]
                p-6
                shadow-sm
              "
            >
              
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Marketplace Tips
                </h3>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Better product listings increase customer trust and conversions.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                
                <div className="flex gap-4">
                  
                  <div
                    className="
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-2xl
                      bg-[var(--primary)]/10
                      text-lg
                    "
                  >
                    🌿
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                      Fresh Product Details
                    </h4>

                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      Use accurate names, pricing, and descriptions for better visibility.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  
                  <div
                    className="
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-2xl
                      bg-orange-500/10
                      text-lg
                    "
                  >
                    📦
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                      Keep Stock Updated
                    </h4>

                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      Updated inventory helps avoid cancellations and improves reliability.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  
                  <div
                    className="
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-2xl
                      bg-emerald-500/10
                      text-lg
                    "
                  >
                    ☀️
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                      Use Natural Photos
                    </h4>

                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      High-quality product images receive more engagement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Card */}
            <div
              className="
                relative overflow-hidden
                rounded-3xl
                bg-gradient-to-br
                from-[var(--primary)]
                to-[var(--primary-hover)]
                p-6
                text-white
                shadow-sm
              "
            >
              
              <div className="relative z-10">
                
                <div
                  className="
                    inline-flex items-center
                    rounded-full
                    bg-white/10
                    px-3 py-1
                    text-xs font-semibold
                    backdrop-blur-md
                  "
                >
                  F2CMARKET
                </div>

                <h3 className="mt-4 text-2xl font-bold leading-tight">
                  Grow Your Farm Business
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  Reach more consumers directly through transparent,
                  trusted, and sustainable farm-to-home commerce.
                </p>

                <a href="/products"
                  className="
                    inline-block mt-6 h-11 rounded-xl
                    bg-white px-5
                    text-sm font-semibold
                    text-[var(--primary)]
                    transition hover:opacity-90
                    leading-[44px]
                  "
                >
                  View Marketplace
                </a>
              </div>

              {/* Glow */}
              <div
                className="
                  absolute -bottom-12 -right-12
                  h-40 w-40 rounded-full
                  bg-white/10 blur-3xl
                "
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}