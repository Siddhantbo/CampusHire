import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  getAllJobs,
  getJobDetails,
  applyForJob,
  getStudentApplications,
  getAllDrives,
  registerForDrive,
  studentInterviewStatus,
} from "../Controllers/StudentController.js";

const router = express.Router();

router.post("/student-form-register", createStudent);
router.post("/get-all-jobs", getAllJobs);
router.post("/get-job-details", getJobDetails);
router.post("/apply", applyForJob);
router.get("/get-student-applications/:userid", getStudentApplications);
router.get("/drives", getAllDrives);
router.post("/register-for-drive", registerForDrive);
router.post("/student-interview-status", studentInterviewStatus);

export default router;
