import mongoose from "mongoose";

const uploadJobSchema = new mongoose.Schema(
  {
    fileHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    originalFileName: String,
    fileSize: Number,
    mimeType: String,
    status: {
      type: String,
      enum: ["Processing", "Completed", "Failed"],
      default: "Processing",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("UploadJob", uploadJobSchema);
