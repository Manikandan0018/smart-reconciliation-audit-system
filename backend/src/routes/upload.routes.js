import express from "express";
import multer from "multer";
import UploadJob from "../models/UploadJob.js";
import Record from "../models/Record.js";
import { generateFileHash } from "../services/fileHash.service.js";
import { parseExcel } from "../services/excelParser.service.js";
import { parseCSV } from "../services/csvParser.service.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();
const upload = multer();

router.post(
  "/",
  authMiddleware,
  allowRoles("Admin", "Analyst"),
  upload.single("file"),
  async (req, res) => {
    let job;

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // ✅ Allow ONLY Excel / CSV
      const isExcel =
        req.file.mimetype ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        req.file.mimetype === "application/vnd.ms-excel";

      const isCSV = req.file.mimetype === "text/csv";

      if (!isExcel && !isCSV) {
        return res.status(400).json({
          message: "Only Excel or CSV files are supported",
        });
      }

      // 🔐 OPTION 1 — File hash idempotency (PROFESSIONAL)
      const fileHash = generateFileHash(req.file.buffer);

      job = await UploadJob.findOneAndUpdate(
        { fileHash },
        {
          $setOnInsert: {
            fileHash,
            originalFileName: req.file.originalname,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            uploadedBy: req.user.id,
            status: "Processing",
          },
        },
        { upsert: true, new: true },
      );

      // If already processed → reuse results
      const existingCount = await Record.countDocuments({
        uploadJobId: job._id,
      });

      if (existingCount > 0) {
        return res.json({
          duplicateFile: true,
          message: "Duplicate file detected. Using existing results.",
          jobId: job._id,
        });
      }

      // 📊 Parse file
      const rows = isExcel
        ? parseExcel(req.file.buffer)
        : await parseCSV(req.file.buffer);

      if (!rows.length) {
        throw new Error("No rows found in file");
      }

      const records = [];

      for (const row of rows) {
        const transactionId = row["Transaction ID"];
        const amount = Number(row["Amount"]);

        // ❗ REQUIRED FIELDS
        if (!transactionId || !amount) continue;

        // 🔍 Match against EXISTING records (previous uploads)
        const match = await Record.findOne({
          uniqueKey: "Transaction ID",
          uniqueValue: String(transactionId),
          "rawData.Amount": amount,
        });

        records.push({
          uniqueKey: "Transaction ID",
          uniqueValue: String(transactionId),
          rawData: row,
          status: match ? "Matched" : "Unmatched",
          uploadJobId: job._id,
        });
      }

      if (records.length === 0) {
        throw new Error("No valid records found. Check Excel headers.");
      }

      // 💾 Insert records
      await Record.insertMany(records);

      // 🔁 Duplicate detection INSIDE SAME FILE
      const duplicates = await Record.aggregate([
        { $match: { uploadJobId: job._id } },
        {
          $group: {
            _id: "$uniqueValue",
            ids: { $push: "$_id" },
            count: { $sum: 1 },
          },
        },
        { $match: { count: { $gt: 1 } } },
      ]);

      for (const dup of duplicates) {
        const [, ...rest] = dup.ids;
        await Record.updateMany(
          { _id: { $in: rest } },
          { status: "Duplicate" },
        );
      }

      job.status = "Completed";
      await job.save();

      return res.json({
        message: "File uploaded & processed successfully",
        recordsInserted: records.length,
        jobId: job._id,
      });
    } catch (err) {
      console.error("UPLOAD ERROR:", err.message);
      if (job) {
        job.status = "Failed";
        await job.save();
      }
      return res.status(500).json({ message: err.message });
    }
  },
);

export default router;
