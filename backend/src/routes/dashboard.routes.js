import express from "express";
import UploadJob from "../models/UploadJob.js";
import Record from "../models/Record.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  let filter = {};

  if (req.user.role !== "Admin") {
    // Analyst / Viewer → only own data
    const jobs = await UploadJob.find({ uploadedBy: req.user.id }, { _id: 1 });
    const jobIds = jobs.map((j) => j._id);

    filter.uploadJobId = { $in: jobIds };
  }
  // Admin → no filter → sees all data

  const total = await Record.countDocuments(filter);
  const matched = await Record.countDocuments({
    ...filter,
    status: "Matched",
  });
  const unmatched = await Record.countDocuments({
    ...filter,
    status: "Unmatched",
  });
  const duplicate = await Record.countDocuments({
    ...filter,
    status: "Duplicate",
  });

  const accuracy = total ? Math.round((matched / total) * 100) : 0;

  res.json({
    total,
    matched,
    unmatched,
    duplicate,
    accuracy,
  });
});

export default router;
