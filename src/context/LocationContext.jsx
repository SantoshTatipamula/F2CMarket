import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import useGeolocation from "@/hooks/useGeolocation";
import { reverseGeocode } from "@/services/locationService";

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const {
    location,
    loading: geoLoading,
    error,
  } = useGeolocation();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);

  useEffect(() => {
    async function initializeLocation() {
      if (
        !location?.latitude ||
        !location?.longitude ||
        selectedLocation
      ) {
        setAddressLoading(false);
        return;
      }

      try {
        const address = await reverseGeocode(
          location.latitude,
          location.longitude
        );

        setSelectedLocation({
          latitude: location.latitude,
          longitude: location.longitude,

          city: address?.city || "",
          state: address?.state || "",
          country: address?.country || "",
          fullAddress: address?.fullAddress || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setAddressLoading(false);
      }
    }

    initializeLocation();
  }, [
  location?.latitude,
  location?.longitude,
  selectedLocation,
]);
  const value = useMemo(
    () => ({
      selectedLocation,
      setSelectedLocation,

      loading: geoLoading || addressLoading,
      error,
    }),
    [
      selectedLocation,
      geoLoading,
      addressLoading,
      error,
    ]
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
    throw new Error(
      "useLocation must be used inside LocationProvider"
    );
  }

  return context;
}