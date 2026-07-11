const apiUrl = import.meta.env.VITE_API_URL || "";

export const searchWaterSources = async (village, pincode, radius) => {
  const query = new URLSearchParams({
    village,
    pincode,
    radius,
  });

  let response;

  try {
    response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/api/water-sources/search?${query}`
    );
  } catch (error) {
    throw new Error("Unable to connect to the server.");
  }

  if (!response.ok) {
    throw new Error("Unable to find nearby water sources.");
  }

  return response.json();
};

export const getNearbyWaterSources = async (latitude, longitude, radius) => {
  const query = new URLSearchParams({ lat: latitude, lng: longitude, radius });
  let response;

  try {
    response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/api/water-sources/nearby?${query}`
    );
  } catch {
    throw new Error("Unable to connect to the server.");
  }

  if (!response.ok) {
    throw new Error("Unable to find nearby water sources.");
  }

  return response.json();
};
