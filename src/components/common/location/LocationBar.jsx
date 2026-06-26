import { useState } from "react";
import { Loader2, MapPin } from "lucide-react";

import { useLocation } from "@/context/LocationContext";
import LocationDialog from "@/components/home/hero/LocationDialog";

export default function LocationBar() {
  const { selectedLocation, loading, error } = useLocation();

  const [open, setOpen] = useState(false);

  const displayLocation =
    selectedLocation?.city?.length > 15
      ? `${selectedLocation.city.slice(0, 15)}...`
      : selectedLocation?.city ||
        selectedLocation?.district ||
        selectedLocation?.state ||
        selectedLocation?.fullAddress ||
        "Unknown Location";

  const locationTitle =
    selectedLocation?.city ||
    selectedLocation?.district ||
    selectedLocation?.state ||
    selectedLocation?.fullAddress ||
    "Unknown Location";

  return (
    <>
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-[var(--primary)]" />

            <div className="min-w-0">
              <p className="text-[11px] text-[var(--text-secondary)]">
                Delivering to
              </p>

              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />

                  <span className="text-xs">
                    Detecting...
                  </span>
                </div>
              ) : error ? (
                <p className="text-xs text-red-500">
                  Location unavailable
                </p>
              ) : (
                <p
                  className="truncate text-sm font-semibold"
                  title={locationTitle}
                >
                  {displayLocation}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 text-sm font-semibold text-[var(--primary)] hover:underline"
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