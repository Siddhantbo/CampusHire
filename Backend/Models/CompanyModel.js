import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const CompanySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: "Companys" },
    contactPerson: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    token: { type: String },
    jobListings: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        requirements: { type: String, required: true },
        salary: { type: String },
        applicants: [
          {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
            status: {
              type: String,
              enum: ["Applied", "Interview Scheduled", "Hired", "Rejected"],
              default: "Applied",
            },
            interviewDate: { type: Date },
          },
        ],
        postedDate: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving the company
CompanySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Company = mongoose.model("Company", CompanySchema);
export default Company;
