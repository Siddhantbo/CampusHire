import PlacementDrive from "../Models/PlacementDriveModel.js";
import Company from "../Models/CompanyModel.js";
import Student from "../Models/StudentModel.js";
import Participation from "../Models/ParticipationModel.js";
import AcademicRecord from "../Models/AcademicRecordModel.js";
import Interview from "../Models/InterviewModel.js";
import Admin from "../Models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import JWT for token generation

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "Admin",
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully", newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      adminId: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Create a new placement drive
const createPlacementDrive = async (req, res) => {
  try {
    const formData = req.body;
    const { title, description, startDate, endDate } = formData;
    const placementDrive = new PlacementDrive({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    await placementDrive.save();
    res.status(201).json({ message: "Placement drive created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create placement drive" });
  }
};

// get all placement drives
const getAllPlacementDrives = async (req, res) => {
  try {
    const placementDrives = await PlacementDrive.find();
    res.status(200).json(placementDrives);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch placement drives" });
  }
};

// get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select(
      "companyName email phone contactPerson industry location"
    );
    const companyData = companies.map((company) => ({
      companyName: company.companyName,
      email: company.email,
      phone: company.phone,
      contactPerson: company.contactPerson,
      industry: company.industry,
      location: company.location,
    }));

    res.status(200).json(companyData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

// add Academic records
const addAcademicRecords = async (req, res) => {
  try {
    const formData = req.body;
    const {
      studentId,
      email,
      department,
      batch,
      GPA,
      grades,
      achievements,
      transcript,
    } = formData;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const existingAcademicRecord = await AcademicRecord.findOne({ email });
    if (existingAcademicRecord) {
      return res
        .status(400)
        .json({ error: "Academic records already exist for this student" });
    }
    const studentRegistrationNumber = studentId;
    const academicRecord = new AcademicRecord({
      studentRegistrationNumber,
      studentId: student._id,
      email,
      department,
      batch,
      GPA,
      grades,
      achievements,
      transcript,
    });

    await academicRecord.save();
    student.academicRecords = academicRecord._id;
    await student.save();

    res.status(200).json({ message: "Academic records added successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to add academic records" });
  }
};

// get all students Academic Records
const getAllAcademicRecords = async (req, res) => {
  try {
    const academicRecords = await AcademicRecord.find();
    res.status(200).json(academicRecords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch academic records" });
  }
};

// update student Academic Records
const updateAcademicRecords = async (req, res) => {
  try {
    const formData = req.body;
    const {
      studentRegistrationNumber,
      email,
      department,
      batch,
      GPA,
      grades,
      achievements,
      transcript,
      _id,
    } = formData;

    const academicRecord = await AcademicRecord.findById(_id);
    if (!academicRecord) {
      return res.status(404).json({ error: "Academic record not found" });
    }
    await AcademicRecord.findByIdAndUpdate(
      _id,
      {
        studentRegistrationNumber,
        department,
        batch,
        GPA,
        grades,
        achievements,
        transcript,
      },
      { new: true }
    );

    res.status(200).json({ message: "Academic records updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update academic records" });
  }
};

// get all interviews
const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
};

// update student interview status
const updateInterviewStatus = async (req, res) => {
  try {
    const { applicationId, scheduledDate, format, link, status, feedback } = req.body;

    const interview = await Interview.findOne({ applicationId });
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    interview.scheduledDate = new Date(scheduledDate);
    interview.format = format;
    interview.link = link;
    interview.status = status;
    interview.feedback = feedback;
    await interview.save();
    res.status(200).json({ message: "Interview status updated successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to update interview status" });
  }
};

export {
  createAdmin,
  adminLogin, // ✅ Added adminLogin
  createPlacementDrive,
  getAllPlacementDrives,
  getAllCompanies,
  addAcademicRecords,
  getAllAcademicRecords,
  updateAcademicRecords,
  getAllInterviews,
  updateInterviewStatus,
};
