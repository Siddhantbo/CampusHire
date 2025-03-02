import mongoose from "mongoose";

const JobPostingSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, required: true },
  qualifications: [String],
  jobType: { type: String, enum: ["Full-time", "Part-time", "Internship"], required: true },
  location: { type: String, enum: ["On-site", "Remote", "Hybrid"], required: true },
  applicationDeadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const JobPosting = mongoose.model("JobPosting", JobPostingSchema);
export default JobPosting;
