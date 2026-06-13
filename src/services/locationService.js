export async function reverseGeocode(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
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
        address.city ||
        address.town ||
        address.village ||
        address.hamlet ||
        "",

      state: address.state || "",

      country: address.country || "",

      district:
        address.county ||
        address.state_district ||
        "",

      postcode: address.postcode || "",

      fullAddress: data.display_name || "",
    };
  } catch (error) {
    console.error("Reverse geocoding failed:", error);

    return null;
  }
}