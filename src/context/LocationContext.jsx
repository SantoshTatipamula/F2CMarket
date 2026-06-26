import { createContext, useContext, useEffect, useMemo, useState } from "react";

import useGeolocation from "@/hooks/useGeolocation";
import { reverseGeocode } from "@/services/locationService";
import { useAuth } from "@/context/AuthContext";
import {
  getLocationFromFirestore,
  saveLocationToFirestore,
} from "@/services/locationFirestoreService";

const STORAGE_KEY = "f2c_selected_location";

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const { user } = useAuth();
  const { location, loading: geoLoading, error } = useGeolocation();

  const [selectedLocation, setSelectedLocation] = useState(() => {
    try {
      const savedLocation = localStorage.getItem(STORAGE_KEY);

      return savedLocation ? JSON.parse(savedLocation) : null;
    } catch (error) {
      console.error("Failed to load saved location:", error);
      return null;
    }
  });

  const [addressLoading, setAddressLoading] = useState(true);
  const [remoteLocationLoaded, setRemoteLocationLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadRemoteLocation() {
      if (!user?.id) {
        setRemoteLocationLoaded(false);
        return;
      }

      try {
        const remoteLocation = await getLocationFromFirestore(user.id);
        if (!mounted) return;

        if (remoteLocation) {
          setSelectedLocation(remoteLocation);
        }

        setRemoteLocationLoaded(true);
      } catch (error) {
        console.error("Failed to load location from Firestore:", error);
        if (mounted) {
          setRemoteLocationLoaded(true);
        }
      }
    }

    loadRemoteLocation();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id || !remoteLocationLoaded || !selectedLocation) return;

    saveLocationToFirestore(user.id, selectedLocation).catch((error) => {
      console.error("Failed to sync location to Firestore:", error);
    });
  }, [selectedLocation, user?.id, remoteLocationLoaded]);

  useEffect(() => {
    async function initializeLocation() {
      // Wait until browser geolocation finishes
      if (geoLoading) {
        return;
      }

      // If permission denied or no coordinates
      if (!location?.latitude || !location?.longitude) {
        setAddressLoading(false);
        return;
      }

      // Don't fetch again if already initialized
      if (selectedLocation) {
        setAddressLoading(false);
        return;
      }

      try {
        const address = await reverseGeocode(
          location.latitude,
          location.longitude,
        );

        setSelectedLocation({
          latitude: location.latitude,
          longitude: location.longitude,

          city: address?.city || "",
          mandal: address?.mandal || "",
          district: address?.district || "",
          state: address?.state || "",
          country: address?.country || "",

          postcode: address?.postcode || "",
          
          fullAddress: address?.fullAddress || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setAddressLoading(false);
      }
    }

    initializeLocation();
  }, [geoLoading, location?.latitude, location?.longitude, selectedLocation]);

  useEffect(() => {
    if (!selectedLocation) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedLocation));
    } catch (error) {
      console.error("Failed to save location:", error);
    }
  }, [selectedLocation]);

  const value = useMemo(
    () => ({
      selectedLocation,
      setSelectedLocation,

      loading: geoLoading || addressLoading,
      error,
    }),
    [selectedLocation, geoLoading, addressLoading, error],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used inside LocationProvider");
  }

  return context;
}
