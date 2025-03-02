import mongoose from "mongoose";

const PlacementDriveSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Drive title
    description: { type: String }, // Summary of the drive
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    companies: [
      {
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        companyEmail: { type: String },
        companyName: { type: String },
        confirmed: { type: Boolean, default: false }, 
      },
    ],
    students: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        studentEmail: { type: String },
        studentName: { type: String },
        registered: { type: Boolean, default: false },
      },
    ],
    interviewsConducted: { type: Number, default: 0 },
    offersMade: { type: Number, default: 0 },
  });
  
const PlacementDrive = mongoose.model("PlacementDrive", PlacementDriveSchema);
export default PlacementDrive;