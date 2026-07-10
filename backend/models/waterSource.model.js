import mongoose from "mongoose";

const waterSourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "handpump",
        "well",
        "public_tap",
        "water_tank",
        "drinking_water_point",
      ],
    },

    village: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["available", "unavailable", "unknown"],
      default: "unknown",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (value) => value.length === 2,
          message: "Coordinates must contain longitude and latitude",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

waterSourceSchema.index({ location: "2dsphere" });

const WaterSource = mongoose.model("WaterSource", waterSourceSchema);

export default WaterSource;