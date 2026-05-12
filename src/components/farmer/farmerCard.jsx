import { Link } from "react-router-dom";

import {
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";

export default function FarmerCard({
  farmer,
}) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl px-3 sm:px-4 py-3 hover:shadow-sm transition">

      <div className="flex items-center gap-3">

        {/* Profile Image */}
        <img
          src={farmer.image}
          alt={farmer.name}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-[var(--border)] shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Top Row */}
          <div className="flex items-center justify-between gap-3">

            {/* Name + Location */}
            <div className="min-w-0">

              <h2 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] leading-tight">
                {farmer.name}
              </h2>

              <div className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">

                <MapPin
                  size={12}
                  className="text-[var(--primary)] shrink-0"
                />

                <span>
                  {farmer.location}
                </span>

              </div>

            </div>

          </div>

          {/* Bottom Row */}
          <div className="mt-2 flex items-center justify-between gap-3">

            {/* Rating */}
            <div className="flex items-center gap-1">

              <Star
                size={14}
                className="fill-amber-400 text-amber-400"
              />

              <span className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                {farmer.rating}
              </span>

            </div>

            {/* CTA */}
            <Link
              to={`/farmers/${farmer.id}`}
              className="h-8 sm:h-9 px-3 sm:px-4 rounded-xl border border-[var(--border)] hover:bg-[var(--surface)] text-xs sm:text-sm font-medium text-[var(--text-primary)] flex items-center gap-1.5 transition shrink-0"
            >
              View

              <ArrowRight size={13} />
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}