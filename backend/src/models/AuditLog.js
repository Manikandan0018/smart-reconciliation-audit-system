import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    recordId: mongoose.Schema.Types.ObjectId,
    field: String,
    oldValue: String,
    newValue: String,
    changedBy: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);

export default mongoose.model("AuditLog", auditLogSchema);
