import express from "express";
import {
  createPlacementDrive,
  getAllPlacementDrives,
  getAllCompanies,
  addAcademicRecords,
  getAllAcademicRecords,
  updateAcademicRecords,
  getAllInterviews,
  updateInterviewStatus,
  createAdmin,
  adminLogin
} from "../Controllers/AdminController.js";

const router = express.Router();

router.post("/create-placement-drive", createPlacementDrive);
router.get("/get-all-placement-drives", getAllPlacementDrives);
router.get("/get-all-companies", getAllCompanies);
router.post("/add-academic-records", addAcademicRecords);
router.get("/get-all-academic-records", getAllAcademicRecords);
router.put("/update-academic-records", updateAcademicRecords);
router.get("/get-all-interviews", getAllInterviews);
router.put("/update-interview-status", updateInterviewStatus);
router.post("/login", adminLogin);
router.post("/register", createAdmin);

export default router;
