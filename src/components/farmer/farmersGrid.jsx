import { Users } from "lucide-react";

import FarmerCard from "./FarmerCard";

export default function FarmersGrid({
  farmers,
  gridClassName = "",
}) {
  /* Empty State */
  if (farmers.length === 0) {
    return (
      <div className="bg-white border border-[var(--border)] rounded-3xl p-10 text-center flex flex-col items-center">

        <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-5">
          <Users
            size={30}
            className="text-[var(--text-muted)]"
          />
        </div>

        <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
          No Farmers Found
        </h3>

        <p className="mt-2 max-w-md text-[var(--text-secondary)]">
          Try changing search or filters to discover
          more local farmers near you.
        </p>

      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 ${gridClassName}`}
    >
      {farmers.map((farmer) => (
        <FarmerCard
          key={farmer.id}
          farmer={farmer}
        />
      ))}
    </div>
  );
}