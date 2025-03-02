import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
  scheduledDate: { type: Date, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  format: { type: String, enum: ["In-person", "Virtual"], required: true },
  link: { type: String },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Interview = mongoose.model("Interview", InterviewSchema);
export default Interview;
