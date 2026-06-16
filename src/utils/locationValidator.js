import { SERVICEABLE_LOCATIONS } from "@/data/serviceableLocations";

export function isServiceableLocation(location) {
  if (!location) return false;

  const valuesToCheck = [
    location.city,
    location.mandal,
    location.district,
    location.state,
    location.fullAddress,
  ]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  return SERVICEABLE_LOCATIONS.some((serviceArea) =>
    serviceArea.aliases.some((alias) =>
      valuesToCheck.some((value) =>
        value.includes(alias.toLowerCase())
      )
    )
  );
}