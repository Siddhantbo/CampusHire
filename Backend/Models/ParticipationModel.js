import mongoose from "mongoose";

const ParticipationSchema = new mongoose.Schema({
  driveId: { type: mongoose.Schema.Types.ObjectId, ref: "PlacementDrive" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  interviewStatus: { type: String, enum: ["Scheduled", "Completed", "Pending"] },
  offerStatus: { type: String, enum: ["Offered", "Rejected", "Pending"], default: "Pending" },
});

const Participation = mongoose.model("Participation", ParticipationSchema);
export default Participation;
