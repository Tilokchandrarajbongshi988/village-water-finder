import express from "express";
import { getNearbyWaterSources } from "../controllers/waterSource.controller.js";

const router = express.Router();

router.get("/nearby", getNearbyWaterSources);

export default router;
