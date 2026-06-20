// src/components/productDetails/FarmerCard.jsx

import { User, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function FarmerCard({ product }) {
  const { users } = useAuth();

  const farmer = users.find((user) => user.id === product?.farmerId);

  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-green-50 to-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
          <User size={22} />
        </div>

        <div className="flex-1">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Sold by Farmer
          </p>
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {product?.farmer}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            {product?.location}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate(`/farmers/${product?.farmerId}`)}
            className="rounded-xl border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
          >
            View Profile
          </button>
          <a
            href={`https://wa.me/91${farmer.phone}?text=${encodeURIComponent(
              `Hi! I'm interested in your product "${product.name}" on F2CMARKET.`,
            )}`}
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
            <span>Contact</span>
          </a>
        </div>
      </div>
    </div>
  );
}
