// src/components/productDetails/FarmerCard.jsx

import { User, MessageCircle } from "lucide-react";

export default function FarmerCard({ product }) {
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
          <button className="rounded-xl border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50">
            View Profile
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]">
            <MessageCircle size={14} />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
}