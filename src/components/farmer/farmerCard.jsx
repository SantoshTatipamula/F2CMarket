import { MapPin, Star } from "lucide-react";
import farmerImage from "@/assets/images/farmer.webp";
import { useNavigate } from "react-router-dom";

export default function FarmerCard({ farmer }) {
  const navigate = useNavigate();
  console.log("Farmer Avatar:", farmer.avatar);
  const image =
    farmer.avatar || farmer.profileImage || farmer.image || farmerImage;

  const location =
    farmer.farmerProfile?.location?.city ||
    (typeof farmer.farmerProfile?.location === "string"
      ? farmer.farmerProfile.location
      : null) ||
    farmer.farmLocation?.city ||
    farmer.farmLocation ||
    farmer.location?.city ||
    farmer.location ||
    "Location ";

  const description =
    farmer.profile?.bio ||
    farmer.description ||
    farmer.specialty ||
    "Verified farmer on F2CMARKET.";

  const rating = farmer.rating ?? 4.5;

  const productsCount = farmer.productsCount ?? farmer.products ?? 0;

  return (
    <article
      className="
        group overflow-hidden
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={farmer.name}
          className="
            h-full w-full object-cover
            transition duration-500
            group-hover:scale-105
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="
              rounded-full
              bg-white/90 backdrop-blur
              px-3 py-1
              text-xs font-semibold
              text-black
            "
          >
            Verified Farmer
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {farmer.farmerProfile?.farmName || farmer.name}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {/* Location */}
          <div
            className="
              flex items-center gap-1.5
              rounded-full
              bg-[var(--surface-2)]
              px-3 py-1.5
              text-[var(--text-secondary)]
            "
          >
            <MapPin size={14} />
            <span>{location}</span>
          </div>

          {/* Rating */}
          <div
            className="
              flex items-center gap-1.5
              rounded-full
              bg-[var(--surface-2)]
              px-3 py-1.5
              text-[var(--text-secondary)]
            "
          >
            <Star size={14} className="fill-yellow-400 text-yellow-400" />

            <span>{rating} Rating</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-[var(--text-secondary)]">Products</p>

            <p className="font-semibold text-[var(--text-primary)]">
              {productsCount}
            </p>
          </div>

          <button
            onClick={() => {
              navigate(`/farmers/${farmer.id}`);
            }}
            className="
    h-11 px-5 rounded-xl
    bg-[var(--primary)]
    text-white text-sm font-medium
    transition hover:opacity-90
  "
          >
            View Profile
          </button>
        </div>
      </div>
    </article>
  );
}
