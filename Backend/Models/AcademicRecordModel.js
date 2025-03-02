import mongoose from "mongoose";

const AcademicRecordSchema = new mongoose.Schema({
  studentRegistrationNumber: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  batch: { type: String, required: true },
  GPA: { type: Number, required: true },
  grades: [
    {
      subject: String,
      grade: String,
    },
  ],
  achievements: [String],
  transcript: { type: String }, // URL/path to the transcript file
  updatedAt: { type: Date, default: Date.now },
});

const AcademicRecord = mongoose.model("AcademicRecord", AcademicRecordSchema);
export default AcademicRecord;
