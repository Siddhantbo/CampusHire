import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPosting",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ["Applied", "Reviewed", "Shortlisted", "Rejected", "Hired"],
    default: "Applied",
  },
  submittedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;
