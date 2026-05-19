import { Link } from "react-router-dom";

import { ArrowRight } from "lucide-react";

import { useProducts } from "@/context/ProductContext";

import { useAuth } from "@/context/AuthContext";

import ProfileSectionHeader from "@/components/profile/shared/ProfileSectionHeader";

export default function PublicProductsPreview() {
  const { products } =
    useProducts();

  const { user } = useAuth();

  const sellerProducts =
    products
      .filter(
        (product) =>
          product.sellerId ===
          user?.id
      )
      .slice(0, 3);

  return (
    <section
      className="
        rounded-3xl
        border border-black/5
        bg-[var(--surface)]
        p-6
        shadow-sm
      "
    >
      
      {/* Header */}
      <ProfileSectionHeader
        title="Marketplace Products"
        description="Preview your public marketplace inventory and featured listings."
        buttonLabel="View All"
        buttonHref="/farmer/products"
      />

      {/* Empty State */}
      {!sellerProducts.length ? (
        <div
          className="
            mt-8
            rounded-3xl
            border border-dashed border-[var(--border)]
            bg-[var(--surface-2)]
            p-10
            text-center
          "
        >
          
          <h3
            className="
              text-lg font-semibold
              text-[var(--text-primary)]
            "
          >
            No Products Added Yet
          </h3>

          <p
            className="
              mt-3
              text-sm leading-relaxed
              text-[var(--text-secondary)]
            "
          >
            Start adding marketplace
            products to showcase your
            farm inventory to consumers.
          </p>

          <Link
            to="/farmer/products/add"
            className="
              mt-6 inline-flex items-center gap-2
              rounded-2xl
              bg-[var(--primary)]
              px-5 py-3
              text-sm font-semibold
              text-white
              transition-all duration-300
              hover:opacity-90
            "
          >
            Add Product

            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div
          className="
            mt-8
            grid grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {sellerProducts.map(
            (product) => (
              <article
                key={product.id}
                className="
                  group overflow-hidden
                  rounded-3xl
                  border border-black/5
                  bg-[var(--surface-2)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      h-full w-full
                      object-cover
                      transition duration-500
                      group-hover:scale-105
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/40
                      via-transparent
                      to-transparent
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  
                  <div className="flex items-start justify-between gap-4">
                    
                    <div>
                      
                      <h3
                        className="
                          text-lg font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        {product.name}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-sm
                          text-[var(--text-secondary)]
                        "
                      >
                        {product.category}
                      </p>
                    </div>

                    <div
                      className="
                        rounded-2xl
                        bg-[var(--primary)]/10
                        px-3 py-1.5
                        text-sm font-semibold
                        text-[var(--primary)]
                      "
                    >
                      ₹{product.price}
                    </div>
                  </div>

                  <p
                    className="
                      mt-4 line-clamp-2
                      text-sm leading-relaxed
                      text-[var(--text-secondary)]
                    "
                  >
                    {product.description}
                  </p>

                  {/* Footer */}
                  <div
                    className="
                      mt-5
                      flex items-center
                      justify-between
                    "
                  >
                    
                    <div
                      className="
                        rounded-full
                        bg-emerald-500/10
                        px-3 py-1
                        text-xs font-medium
                        text-emerald-600
                      "
                    >
                      Active Listing
                    </div>

                    <Link
                      to={`/products/${product.id}`}
                      className="
                        inline-flex items-center gap-2
                        text-sm font-medium
                        text-[var(--primary)]
                        transition-all duration-300
                        hover:gap-3
                      "
                    >
                      View

                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
}