import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    uniqueKey: { type: String, required: true },
    uniqueValue: { type: String, required: true },
    rawData: { type: Object, required: true },
    status: {
      type: String,
      enum: ["Matched", "Unmatched", "Duplicate", "PartiallyMatched"],
      required: true,
    },
    uploadJobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UploadJob",
      required: true,
    },
  },
  { timestamps: true },
);

recordSchema.index({ uniqueKey: 1, uniqueValue: 1 });

export default mongoose.model("Record", recordSchema);
