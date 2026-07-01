// src/components/productDetails/FarmerCard.jsx

import { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

function FarmerCard({ product }) {
  const { users } = useAuth();

  if (!product) return null;

  const farmer = useMemo(
    () => users.find((user) => String(user.id) === String(product.farmerId)),
    [users, product.farmerId],
  );
  const navigate = useNavigate();

  const location = useMemo(
    () =>
      farmer?.farmerProfile?.location?.city ||
      (typeof farmer?.farmerProfile?.location === "string"
        ? farmer.farmerProfile.location
        : null) ||
      product?.location ||
      "Location not available",
    [farmer, product],
  );

  const navigateToProfile = useCallback(() => {
    navigate(`/farmers/${product?.farmerId}`);
  }, [navigate, product?.farmerId]);

  const whatsappUrl = useMemo(() => {
  if (!farmer?.phone) return "#";

  return `https://wa.me/91${farmer.phone}?text=${encodeURIComponent(
    `Hi! I'm interested in your product "${product.name}" on F2CMARKET.`
  )}`;
}, [farmer?.phone, product?.name]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-green-50 to-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-lg bg-[var(--surface-2)]">
          <img
            loading="lazy"
            src={
              farmer?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                farmer?.name || "Farmer",
              )}`
            }
            alt={farmer?.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Sold by Farmer
          </p>
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {farmer?.farmerProfile?.farmName || farmer?.name || product?.farmer}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">{location}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={navigateToProfile}
            className="rounded-xl border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
          >
            View Profile
          </button>
          <a
            href={whatsappUrl}
            onClick={(e) => {
              if (!farmer?.phone) {
                e.preventDefault();
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="
                      flex items-center justify-center gap-2
                      rounded-xl
                      
                      bg-white
                      px-4 py-2
                      text-sm font-medium
                      text-green-700
                      transition
                      hover:bg-green-50
                      hover:border-green-500
                    "
          >
            <FaWhatsapp size={16} className="text-[#25D366]" />
            <span>{farmer?.phone ? "Contact" : "Unavailable"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}


export default memo(FarmerCard);