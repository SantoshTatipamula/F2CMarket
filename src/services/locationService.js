/* -------------------------------------------------------------------------- */
/* Reverse Geocoding */
/* -------------------------------------------------------------------------- */

export async function reverseGeocode(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          "Accept-Language": "en",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location.");
    }

    const data = await response.json();
    const address = data.address || {};

    return {
      latitude,
      longitude,

      city:
        address.village ||
        address.hamlet ||
        address.suburb ||
        address.neighbourhood ||
        address.locality ||
        address.town ||
        address.city ||
        address.county ||
        data.display_name ||
        "Unknown",

      mandal:
        address.county ||
        "",

      district:
        address.state_district ||
        address.county ||
        "",

  state: address.state || "",

  country: address.country || "",

  postcode: address.postcode || "",

  fullAddress: data.display_name || "",
};
  } catch (error) {
    console.error("Reverse geocoding failed:", error);

    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Location Search (OpenStreetMap Nominatim) */
/* -------------------------------------------------------------------------- */

export async function searchLocation(query) {
  try {
    if (!query?.trim()) return [];

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
        query,
      )}&limit=5&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "en",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to search locations.");
    }

    const data = await response.json();

    console.log(data);

    return data.map((item) => ({
      placeId: item.place_id,

      latitude: Number(item.lat),
      longitude: Number(item.lon),

      // Display name for the location
      name:
        item.address?.village ||
        item.address?.hamlet ||
        item.address?.suburb ||
        item.address?.neighbourhood ||
        item.address?.locality ||
        item.address?.town ||
        item.address?.city ||
        query,

      // District (prefer actual district)
      district: item.address?.state_district || item.address?.county || "",

      // Mandal (optional - useful for future)
      mandal: item.address?.county || "",

      state: item.address?.state || "",

      country: item.address?.country || "",

      postcode: item.address?.postcode || "",

      displayName: item.display_name,
    }));
  } catch (error) {
    console.error("Location search failed:", error);

    return [];
  }
}
