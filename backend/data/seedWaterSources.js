import dotenv from "dotenv";
import mongoose from "mongoose";
import WaterSource from "../models/waterSource.model.js";
import waterSources from "./waterSources.js";

dotenv.config();

const seedWaterSources = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    await WaterSource.deleteMany({});
    const insertedRecords = await WaterSource.insertMany(waterSources);

    console.log(`${insertedRecords.length} water source records inserted`);
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
  }
};

seedWaterSources();