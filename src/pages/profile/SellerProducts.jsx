import {
  Package,
  Star,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

import { useProducts } from "@/context/ProductContext";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

export default function SellerProducts() {
  const { user } = useAuth();

  const { products } =
    useProducts();

  const sellerProducts =
    products.filter(
      (product) =>
        product.sellerId ===
        user?.id
    );

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      
      <section
        className="
          mx-auto
          max-w-7xl
          px-4 py-8
          lg:px-8
        "
      >
        
        {/* Hero */}
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border border-black/5
            bg-[var(--surface)]
            shadow-sm
          "
        >
          
          {/* Banner */}
          <div
            className="
              bg-gradient-to-br
              from-[var(--primary)]
              via-[var(--primary)]/90
              to-emerald-500
              px-8 py-10
              text-white
            "
          >
            
            <div
              className="
                inline-flex items-center
                rounded-full
                bg-white/10
                px-4 py-1.5
                text-sm font-semibold
                backdrop-blur-md
              "
            >
              Seller Marketplace
            </div>

            <div className="mt-6 flex items-start gap-4">
              
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-white/10
                  backdrop-blur-md
                "
              >
                <Package size={24} />
              </div>

              <div>
                
                <h1
                  className="
                    text-3xl font-bold
                    tracking-tight
                  "
                >
                  Seller Products
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm leading-relaxed
                    text-white/80
                  "
                >
                  Explore your public
                  marketplace inventory
                  and seller product
                  listings across
                  F2CMARKET.
                </p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="p-6 md:p-8">
            
            <ProfileCard>
              
              <ProfileCardHeader
                title="Marketplace Listings"
                description="Products currently visible in the marketplace."
              />

              {sellerProducts.length ===
              0 ? (
                <div
                  className="
                    mt-8
                    rounded-2xl
                    border border-dashed
                    border-black/10
                    p-10
                    text-center
                  "
                >
                  
                  <p
                    className="
                      text-sm
                      text-[var(--text-secondary)]
                    "
                  >
                    No marketplace
                    products found.
                  </p>
                </div>
              ) : (
                <div
                  className="
                    mt-8
                    grid grid-cols-1
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-3
                  "
                >
                  
                  {sellerProducts.map(
                    (product) => (
                      <ProductCard
                        key={
                          product.id
                        }
                        product={
                          product
                        }
                      />
                    )
                  )}
                </div>
              )}
            </ProfileCard>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Product Card */
function ProductCard({
  product,
}) {
  return (
    <Link
      to={`/products/${product.id}`}
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
      <div className="h-52 overflow-hidden">
        
        <img loading="lazy"
          src={product.image}
          alt={product.name}
          className="
            h-full w-full
            object-cover
            transition duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="p-5">
        
        <div
          className="
            flex items-start
            justify-between gap-4
          "
        >
          
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
                mt-1
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

        {/* Meta */}
        <div
          className="
            mt-5
            flex flex-wrap items-center gap-4
            text-sm
            text-[var(--text-secondary)]
          "
        >
          
          <div className="flex items-center gap-2">
            <Star
              size={16}
              className="text-yellow-500"
            />

            {product.rating || 4.5}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />

            {product.location}
          </div>
        </div>
      </div>
    </Link>
  );
}