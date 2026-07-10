import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Water Finder API is running",
  });
});

export default router;