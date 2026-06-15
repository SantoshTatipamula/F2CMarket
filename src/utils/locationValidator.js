import { SERVICEABLE_LOCATIONS } from "@/data/serviceableLocations";

export function isServiceableLocation(location) {
  if (!location) return false;

  const searchableText = [
    location.city,
    location.mandal,
    location.district,
    location.state,
    location.fullAddress,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  return SERVICEABLE_LOCATIONS.some((serviceArea) =>
    searchableText.includes(
      serviceArea.toLowerCase().replace(/\s+/g, " ").trim()
    )
  );
}