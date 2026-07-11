const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

export const findWaterSources = async (latitude, longitude, radius) => {
  const radiusInMetres = radius * 1000;

  const overpassQuery = `
    [out:json][timeout:25];
    (
      nwr(around:${radiusInMetres},${latitude},${longitude})["amenity"="drinking_water"];
      nwr(around:${radiusInMetres},${latitude},${longitude})["drinking_water"="yes"];
    );
    out center tags;
  `;

  const body = new URLSearchParams({ data: overpassQuery });

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "WaterFinder/1.0",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Unable to search for water sources");
  }

  const data = await response.json();

  return data.elements || [];
};
