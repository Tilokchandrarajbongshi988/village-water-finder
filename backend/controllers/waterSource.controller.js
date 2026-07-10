import WaterSource from "../models/waterSource.model.js";

export const getNearbyWaterSources = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (lat === undefined || lng === undefined || radius === undefined) {
      return res.status(400).json({
        success: false,
        message: "lat, lng, and radius are required",
      });
    }

    const latitude = Number(lat);
    const longitude = Number(lng);
    const radiusInKilometres = Number(radius);
    const hasEmptyOrNonStringValue = [lat, lng, radius].some(
      (value) => typeof value !== "string" || value.trim() === ""
    );

    if (
      hasEmptyOrNonStringValue ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      !Number.isFinite(radiusInKilometres)
    ) {
      return res.status(400).json({
        success: false,
        message: "lat, lng, and radius must be valid numbers",
      });
    }

    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({
        success: false,
        message: "lat must be between -90 and 90",
      });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({
        success: false,
        message: "lng must be between -180 and 180",
      });
    }

    if (![2, 5, 10].includes(radiusInKilometres)) {
      return res.status(400).json({
        success: false,
        message: "radius must be 2, 5, or 10 kilometres",
      });
    }

    const maxDistance = radiusInKilometres * 1000;

    const waterSources = await WaterSource.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          key: "location",
          spherical: true,
          maxDistance,
          distanceField: "distanceInMetres",
        },
      },
      {
        $addFields: {
          distanceKm: {
            $round: [{ $divide: ["$distanceInMetres", 1000] }, 2],
          },
        },
      },
      {
        $project: {
          distanceInMetres: 0,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: waterSources.length,
      waterSources,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
