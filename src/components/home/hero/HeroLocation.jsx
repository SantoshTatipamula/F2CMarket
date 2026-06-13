import { useState } from "react";
import { Loader2, MapPin } from "lucide-react";

import { useLocation } from "@/context/LocationContext";
import LocationDialog from "./LocationDialog";

export default function HeroLocation() {
  const { selectedLocation, loading, error } = useLocation();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
            <MapPin className="h-5 w-5 text-[var(--primary)]" />
          </div>

          {/* Location Info */}
          <div className="flex-1">
            <p className="text-xs font-medium text-[var(--text-secondary)]">
              Delivering to
            </p>

            {loading ? (
              <div className="mt-1 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-[var(--primary)]" />

                <span className="text-sm text-[var(--text-secondary)]">
                  Detecting your location...
                </span>
              </div>
            ) : error ? (
              <p className="mt-1 text-sm font-medium text-red-500">
                Unable to detect location
              </p>
            ) : (
              <>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  {selectedLocation?.city || "Unknown Location"}
                </p>

                <p className="text-xs text-[var(--text-secondary)]">
                  {selectedLocation?.state}
                </p>
              </>
            )}
          </div>

          {/* Change Button */}
          <button
            onClick={() => setOpen(true)}
            className="text-sm font-semibold text-[var(--primary)] transition hover:underline"
          >
            Change
          </button>
        </div>
      </div>

      <LocationDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}