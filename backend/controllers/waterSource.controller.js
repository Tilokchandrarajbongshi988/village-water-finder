import { getCoordinates } from "../services/geocoding.service.js";
import { findWaterSources } from "../services/overpass.service.js";

const calculateDistance = (startLat, startLng, endLat, endLng) => {
  const earthRadius = 6371;
  const toRadians = (value) => (value * Math.PI) / 180;
  const latitudeDifference = toRadians(endLat - startLat);
  const longitudeDifference = toRadians(endLng - startLng);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(startLat)) *
      Math.cos(toRadians(endLat)) *
      Math.sin(longitudeDifference / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getWaterSourceType = (tags = {}) => {
  if (tags.man_made === "water_tap") return "water_tap";
  if (tags.man_made === "water_well") return "water_well";
  return "drinking_water_point";
};

const formatWaterSources = (
  elements,
  searchLatitude,
  searchLongitude,
  fallbackVillage = "",
  fallbackPincode = ""
) =>
  elements
    .map((element) => {
      const latitude = element.lat ?? element.center?.lat;
      const longitude = element.lon ?? element.center?.lon;

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return null;
      }

      const tags = element.tags || {};

      return {
        id: `${element.type}-${element.id}`,
        name: tags.name || "Public Drinking Water Point",
        type: getWaterSourceType(tags),
        village: tags["addr:village"] || tags["addr:suburb"] || fallbackVillage,
        pincode: tags["addr:postcode"] || fallbackPincode,
        status: "unknown",
        drinkingWater: true,
        distanceKm: Number(
          calculateDistance(
            searchLatitude,
            searchLongitude,
            latitude,
            longitude
          ).toFixed(2)
        ),
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      };
    })
    .filter(Boolean)
    .sort((first, second) => first.distanceKm - second.distanceKm);

export const getNearbyWaterSources = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    const latitude = Number(lat);
    const longitude = Number(lng);
    const radiusInKilometres = Number(radius);

    if (!lat || !lng || !radius) {
      return res.status(400).json({
        success: false,
        message: "lat, lng, and radius are required",
      });
    }

    if (
      !Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
      !Number.isFinite(longitude) || longitude < -180 || longitude > 180
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid location coordinates",
      });
    }

    if (![2, 5, 10].includes(radiusInKilometres)) {
      return res.status(400).json({
        success: false,
        message: "Radius must be 2, 5, or 10 kilometres",
      });
    }

    const elements = await findWaterSources(
      latitude,
      longitude,
      radiusInKilometres
    );
    const waterSources = formatWaterSources(elements, latitude, longitude);

    return res.status(200).json({
      success: true,
      searchedLocation: "your current location",
      count: waterSources.length,
      waterSources,
      attribution: "OpenStreetMap contributors",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to search for water sources",
    });
  }
};

export const searchWaterSources = async (req, res) => {
  try {
    const { village, pincode, radius } = req.query;

    if (!village || !pincode || !radius) {
      return res.status(400).json({
        success: false,
        message: "village, pincode, and radius are required",
      });
    }

    if (
      typeof village !== "string" ||
      typeof pincode !== "string" ||
      typeof radius !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid search values",
      });
    }

    const cleanVillage = village.trim();
    const cleanPincode = pincode.trim();
    const radiusInKilometres = Number(radius);

    if (!cleanVillage) {
      return res.status(400).json({
        success: false,
        message: "Please enter a village name",
      });
    }

    if (!/^\d{6}$/.test(cleanPincode)) {
      return res.status(400).json({
        success: false,
        message: "Pincode must contain 6 digits",
      });
    }

    if (![2, 5, 10].includes(radiusInKilometres)) {
      return res.status(400).json({
        success: false,
        message: "Radius must be 2, 5, or 10 kilometres",
      });
    }

    const searchedLocation = await getCoordinates(cleanVillage, cleanPincode);

    if (!searchedLocation) {
      return res.status(404).json({
        success: false,
        message: "Location not found. Check the village and pincode",
      });
    }

    const elements = await findWaterSources(
      searchedLocation.latitude,
      searchedLocation.longitude,
      radiusInKilometres
    );

    const waterSources = formatWaterSources(
      elements,
      searchedLocation.latitude,
      searchedLocation.longitude,
      cleanVillage,
      cleanPincode
    );

    return res.status(200).json({
      success: true,
      searchedLocation: searchedLocation.displayName,
      count: waterSources.length,
      waterSources,
      attribution: "© OpenStreetMap contributors",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to search for water sources",
    });
  }
};
