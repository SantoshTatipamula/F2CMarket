import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "@/utils/leafletConfig";

/* Keeps the map centered whenever position changes */
function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), {
        animate: true,
      });
    }
  }, [map, position]);

  return null;
}

export default function MapView({
  latitude,
  longitude,
  zoom = 15,
  draggable = true,
  onLocationChange,
}) {
  const [position, setPosition] = useState([latitude, longitude]);

  const markerRef = useRef(null);

  /* Sync local state whenever props change */
  useEffect(() => {
    if (latitude != null && longitude != null) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (!marker) return;

        const { lat, lng } = marker.getLatLng();

        const newPosition = [lat, lng];

        setPosition(newPosition);

        onLocationChange?.({
          latitude: lat,
          longitude: lng,
        });
      },
    }),
    [onLocationChange],
  );

  if (latitude == null || longitude == null) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <p className="text-sm text-[var(--text-secondary)]">Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom
      className="h-80 w-full rounded-2xl"
    >
      <RecenterMap position={position} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        ref={markerRef}
        position={position}
        draggable={draggable}
        eventHandlers={eventHandlers}
      >
        <Popup>Drag the marker to choose your delivery location.</Popup>
      </Marker>
    </MapContainer>
  );
}
