import express from "express";
import UploadJob from "../models/UploadJob.js";
import Record from "../models/Record.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  // 1️⃣ Get upload jobs created by this user
  const jobs = await UploadJob.find({ uploadedBy: req.user.id }, { _id: 1 });

  const jobIds = jobs.map((job) => job._id);

  // 2️⃣ Count records ONLY for this user's jobs
  const total = await Record.countDocuments({
    uploadJobId: { $in: jobIds },
  });

  const matched = await Record.countDocuments({
    uploadJobId: { $in: jobIds },
    status: "Matched",
  });

  const unmatched = await Record.countDocuments({
    uploadJobId: { $in: jobIds },
    status: "Unmatched",
  });

  const duplicate = await Record.countDocuments({
    uploadJobId: { $in: jobIds },
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
