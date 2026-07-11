const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export const getCoordinates = async (village, pincode) => {
  const query = new URLSearchParams({
    city: village,
    postalcode: pincode,
    country: "India",
    format: "jsonv2",
    limit: "1",
    countrycodes: "in",
  });

  const response = await fetch(`${NOMINATIM_URL}?${query}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "WaterFinder/1.0",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to search for that location");
  }

  const locations = await response.json();

  if (locations.length === 0) {
    return null;
  }

  const latitude = Number(locations[0].lat);
  const longitude = Number(locations[0].lon);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("Invalid location data received");
  }

  return {
    latitude,
    longitude,
    displayName: locations[0].display_name,
  };
};
