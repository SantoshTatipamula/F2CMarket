import { useEffect, useState } from "react";

import { useLocation } from "@/context/LocationContext";
import LocationSearch from "@/components/common/location/LocationSearch";
import { isServiceableLocation } from "@/utils/locationValidator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import MapView from "@/components/map/MapView";

export default function LocationDialog({
  open,
  onOpenChange,
  value = null,
  onConfirm = null,
}) {
  const {
    selectedLocation: currentLocation,
    setSelectedLocation,
  } = useLocation();

  const [selectedLocation, setLocalSelectedLocation] = useState(
    value || currentLocation
  );

  const [serviceError, setServiceError] = useState("");

  useEffect(() => {
    if (open) {
      setLocalSelectedLocation(value || currentLocation);
      setServiceError("");
    }
  }, [open, value, currentLocation]);

  const handleConfirm = () => {
    if (!selectedLocation) {
      console.log("❌ No location selected");
      return;
    }

    const isValid = isServiceableLocation(selectedLocation);

    if (!isValid) {
      setServiceError(
        "Sorry! F2CMARKET currently delivers only to selected serviceable areas."
      );
      return;
    }

    setServiceError("");

    // Custom handler (Farmer, Admin, etc.)
    if (onConfirm) {
      onConfirm(selectedLocation);
    } else {
      // Default behavior (Consumer delivery location)
      setSelectedLocation(selectedLocation);
    }

    onOpenChange(false);
  };

  const handleLocationSelect = (location) => {
    setServiceError("");

    setLocalSelectedLocation({
      latitude: location.latitude,
      longitude: location.longitude,

      city: location.name,
      district: location.district,
      mandal: location.mandal,

      state: location.state,
      country: location.country,

      postcode: location.postcode || "",

      fullAddress: location.displayName,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[90vh] max-w-2xl flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-0 shadow-2xl">
        <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-bold">
            Choose Location
          </DialogTitle>

          <DialogDescription>
            Search your location or drag the marker to fine-tune it.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-5">
            <LocationSearch onSelect={handleLocationSelect} />

            {selectedLocation?.latitude != null &&
  selectedLocation?.longitude != null && (
    <MapView
      latitude={selectedLocation.latitude}
      longitude={selectedLocation.longitude}
      onLocationChange={setLocalSelectedLocation}
    />
  )}

            <div className="rounded-xl bg-[var(--surface)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Selected Location
              </p>

              <p className="mt-1 text-sm font-medium">
                {selectedLocation?.city || "No location selected"}
              </p>

              <p className="break-words text-xs text-[var(--text-secondary)]">
                {selectedLocation?.fullAddress}
              </p>

              {selectedLocation?.latitude &&
                selectedLocation?.longitude && (
                  <p className="mt-2 text-xs text-[var(--text-secondary)]">
                    {selectedLocation.latitude.toFixed(6)},{" "}
                    {selectedLocation.longitude.toFixed(6)}
                  </p>
                )}
            </div>

            {serviceError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
                {serviceError}
              </div>
            )}

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full rounded-xl bg-[var(--primary)] py-3 font-semibold text-white transition hover:opacity-90"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}