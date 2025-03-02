import mongoose from "mongoose";

const PlacementDriveSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    participatingCompanies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    ],
    statistics: {
      totalParticipants: { type: Number, default: 0 },
      interviewsConducted: { type: Number, default: 0 },
      offersMade: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("PlacementDrive", PlacementDriveSchema);

