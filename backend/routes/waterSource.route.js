import express from "express";
import {
  getNearbyWaterSources,
  searchWaterSources,
} from "../controllers/waterSource.controller.js";

const router = express.Router();

router.get("/search", searchWaterSources);
router.get("/nearby", getNearbyWaterSources);

export default router;
