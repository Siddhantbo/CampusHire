import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    resumeLink: { type: String, required: false, default: null },
    jobRoles: [{ type: String }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applications: [
      {
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobPosting" },
        status: {
          type: String,
          enum: ["Applied", "Reviewed", "Shortlisted", "Rejected","Hired"],
          default: "Applied",
        },
        appliedDate: { type: Date, default: Date.now },
        interviewDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
