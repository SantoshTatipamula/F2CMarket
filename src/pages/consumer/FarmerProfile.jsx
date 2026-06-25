import { useParams } from "react-router-dom";

import { User, Store, MapPin, Phone, FileText } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";

import { FaWhatsapp } from "react-icons/fa";
import ProductCard from "@/components/product/ProductCard";

export default function FarmerProfile() {
  const { farmerId } = useParams();

  const { users } = useAuth();
  const { products } = useProducts();

  const farmer = users.find((user) => user.id === farmerId);
  const farmerProducts = products.filter(
  (product) =>
    String(product.farmerId || product.sellerId) === String(farmer?.id)
);

  if (!farmer) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Farmer Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div
          className="
          overflow-hidden
          rounded-3xl
          border border-[var(--border)]
          bg-[var(--surface)]
          shadow-sm
        "
        >
          {/* Hero */}
          <div className="relative overflow-hidden">
            {farmer.coverImage ? (
              <img
                src={farmer.coverImage}
                alt="Farm Banner"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                className="
        absolute inset-0
        bg-gradient-to-r
        from-[var(--primary)]/10
        via-transparent
        to-transparent
      "
              />
            )}

            <div className="relative p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                {/* Avatar */}
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                  <img
                    src={
                      farmer.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        farmer.name || "Farmer",
                      )}`
                    }
                    alt={farmer.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Farmer Profile
                    </p>

                    <h1 className="mt-1 text-4xl font-bold text-[var(--text-primary)]">
                      {farmer.farmerProfile?.farmName || "Farm"}
                    </h1>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Owner */}
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <User size={16} />

                      <span>{farmer.name}</span>
                    </div>

                    {/* Farm */}
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Store size={16} />

                      <span>{farmer.farmerProfile?.farmName}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <MapPin size={16} />

                      <span>
                        {farmer.farmerProfile?.location?.city ||
                          "Location not available"}
                      </span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Phone size={16} />

                      <span>{farmer.phone}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="flex items-start gap-2">
                    <FileText
                      size={18}
                      className="
                    mt-0.5
                    shrink-0
                    text-[var(--text-secondary)]
                  "
                    />

                    <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
                      {farmer.profile?.bio ||
                        "Passionate farmer providing fresh produce directly to consumers through F2CMARKET."}
                    </p>
                  </div>

                  <div className="mt-5">
                    <a
                      href={`https://wa.me/91${farmer.phone}?text=${encodeURIComponent(
                        `Hi ${farmer.name}, I'm interested in your products on F2CMARKET.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
      inline-flex items-center gap-2
      rounded-xl
      bg-[#25D366]
      px-5 py-3
      text-sm font-semibold
      text-white
      transition
      hover:bg-[#1ebe5d]
    "
                    >
                      <FaWhatsapp size={18} />
                      <span>Contact on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Products from {farmer.farmerProfile?.farmName}
          </h2>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Browse all fresh products offered by this farmer.
          </p>
        </div>

        {farmerProducts.length === 0 ? (
          <div
            className="
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-10
        text-center
      "
          >
            <p className="text-[var(--text-secondary)]">
              No products available.
            </p>
          </div>
        ) : (
          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-6
      "
          >
            {farmerProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="catalog"
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}