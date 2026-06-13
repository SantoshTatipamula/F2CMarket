import { useEffect, useState } from "react";

import { useLocation } from "@/context/LocationContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import MapView from "@/components/map/MapView";

export default function LocationDialog({ open, onOpenChange }) {
  const { selectedLocation: currentLocation, setSelectedLocation } =
    useLocation();

  const [selectedLocation, setLocalSelectedLocation] =
    useState(currentLocation);

  useEffect(() => {
    setLocalSelectedLocation(currentLocation);
  }, [currentLocation]);

  const handleConfirm = () => {
    if (!selectedLocation) return;

    setSelectedLocation(selectedLocation);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-3xl bg-slate-50 border border-[var(--border)] shadow-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Choose Delivery Location
          </DialogTitle>
          <DialogDescription>
            Select or drag the marker to update your delivery location.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-sm text-[var(--text-secondary)]">
            Drag the marker to adjust your delivery location.
          </p>

          <MapView
            latitude={selectedLocation?.latitude}
            longitude={selectedLocation?.longitude}
            onLocationChange={setLocalSelectedLocation}
          />

          <div className="rounded-xl bg-[var(--surface)] p-3">
            <p className="text-sm font-medium">Selected Coordinates</p>

            <p className="text-xs text-[var(--text-secondary)]">
              {selectedLocation?.latitude?.toFixed(6)},{" "}
              {selectedLocation?.longitude?.toFixed(6)}
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full rounded-xl bg-[var(--primary)] py-3 font-semibold text-white transition hover:opacity-90"
          >
            Confirm Location
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
