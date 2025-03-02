import Company from "../Models/CompanyModel.js";
import JobPosting from "../Models/JobPostingModel.js";
import Application from "../Models/ApplicationModel.js";
import Student from "../Models/StudentModel.js";
import Interview from "../Models/InterviewModel.js";
import PlacementDrive from "../Models/PlacementDriveModel.js";
import { scheduleMeeting } from "../Configs/ZOOM.js"; // Import the Zoom service
import bcrypt from "bcryptjs";
import { token as generateToken } from "../Configs/JwtToken.js";
import mailer from "../Configs/Mailer.js";
import dotenv from "dotenv";

dotenv.config();

// company model and application model are handled in this model folder

// Create a new company registration
const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      phone,
      contactPerson,
      industry,
      location,
    } = req.body;
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company with this email already exists" });
    }

    const company = new Company({
      companyName,
      email,
      password,
      phone,
      contactPerson,
      industry,
      location,
    });
    await company.save();
    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register company" });
  }
};

// login company
const loginCompany = async (req, res) => {
 
  try {
    const { email, password } = req.body;
 
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    //Validating password for found Company
    const passwordValidation = await bcrypt.compare(password, company.password);
   
    
    if (passwordValidation) {
      const token = await generateToken(company);
      company.token = token;

      await company.save();
      res.status(200).json({
        message: "Login Successfully",
        token: token,
        companyId: company._id,
        role: company.role,
        companyName: company.companyName,
        email: company.email,
      });
    } else {
      res.status(401).json({ message: "unauthorized Check login Credential" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

// application model are handled below this comment
const jobPosting = async (req, res) => {
  try {
    const {
      title,
      description,
      qualifications,
      jobType,
      location,
      salary,
      applicationDeadline,
    } = req.body;
    const { companyId } = req.params;

    const companyFound = await Company.findById(companyId);
    if (!companyFound) {
      return res.status(404).json({ error: "Company not found" });
    }

    const formattedApplicationDeadline = new Date(applicationDeadline);

    const jobPosting = new JobPosting({
      title,
      description,
      qualifications,
      jobType,
      location,
      salary,
      applicationDeadline: formattedApplicationDeadline,
      companyId,
    });

    await jobPosting.save();
    res.status(201).json({ message: "Job posting created successfully" });
  } catch (error) {
    console.error("Error creating job posting:", error);
    res.status(500).json({ error: "Failed to create job posting" });
  }
};

// get all jobs posted by company

const getAllJobsPostingByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);
    if (!company) {
      console.log("company not found");
      return res.status(404).json({ error: "Company not found" });
    }
    const companyPostedJob = await JobPosting.find({ companyId });

    const jobApplicationData = await Promise.all(
      companyPostedJob.map(async (job) => {
        const studentIds = await Application.find({ jobId: job._id }).distinct(
          "studentId"
        );
        return {
          id: job._id,
          title: job.title,
          description: job.description,
          qualifications: job.qualifications,
          jobType: job.jobType,
          location: job.location,
          salary: job.salary,
          applicationDeadline: job.applicationDeadline,
          companyId: job.companyId,
          studentId: studentIds,
          studentData: await Promise.all(
            studentIds.map(async (studentId) => {
              let student = await Student.findById(studentId);
              if (!student) {
                return null;
              }
              return {
                id: studentId,
                name: student.name,
                email: student.email,
                phone: student.phone,
                status: student.applications,
                department: student.department,
                resumeLink: student.resumeLink,
                jobRoles: student.jobRoles,
              };
            })
          ),
        };
      })
    );

    res.status(200).json(jobApplicationData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// get students data by id
const getStudentsDataById = async (req, res) => {
  try {
    const { studentIds } = req.body;
    const arrayStudentIds = studentIds[0];

    const studentData = await Promise.all(
      arrayStudentIds.map(async (studentId) => {
        const student = await Student.findById(studentId);
        if (!student) {
          return null;
        }
        return {
          id: studentId,
          name: student.name,
          email: student.email,
          phone: student.phone,
          department: student.department,
          resumeLink: student.resumeLink,
          jobRoles: student.jobRoles,
        };
      })
    );

    const filteredStudentData = studentData.filter(
      (student) => student !== null
    );
    res.status(200).json(filteredStudentData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student data" });
  }
};

// company interview schedule
const scheduleInterview = async (req, res) => {
  try {
    const {
      applicationId,
      scheduledDate,
      format,
      status = "Scheduled",
      feedback,
      link = "",
      companyid,
    } = req.body;
   
    const job = await JobPosting.findById(applicationId);
    if (!job) {
      return res.status(404).json({ error: "Application not found" });
    }
    const application = await Application.findOne({ jobId: applicationId });
    const newInterview = new Interview({
      applicationId: application._id,
      scheduledDate,
      format,
      status,
      feedback,
      link,
      companyId: companyid,
    });
    await newInterview.save();
    application.status = "Shortlisted";
    await application.save();

    const company = await Company.findById(companyid);
    const student = await Student.findById(application.studentId);


    try {
      // Send mail
      mailer.sendMail({
        from: process.env.SMTP_USER,
        to: student.email,
        subject: `Interview Scheduled for ${company.companyName}`,
        html: ` <h1>Interview Scheduled</h1>
  <p>Dear <strong>${student.name}</strong>,</p>
  <p>
    We are pleased to inform you that your interview for <strong>${company.companyName}</strong> 
    has been successfully scheduled. Below are the details:
  </p>
  <ul>
    <li><strong>ScheduledDate and Time:</strong> ${scheduledDate}</li>
    <li><strong>Your Applied Role:</strong> ${job.title}</li>
    
    <li><strong>Formate:</strong> ${format}</li>
    <li><strong>FeedBack:</strong> ${feedback}</li>
  </ul>
  <p>
    Please ensure you are prepared and on time for your interview. 
    If you have any questions, feel free to contact us.
  </p>
  <p>Best regards,<br>Placement Cell Team</p>
`,
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({ message: "Interview scheduled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule interview" });
  }
};

// get all drives
const getAllDrives = async (req, res) => {
  try {
    const drives = await PlacementDrive.find();
    res.status(200).json(drives);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch drives" });
  }
};

// register for a drive by company update process
const registerForDrive = async (req, res) => {
  try {
    const { formData, role } = req.body;
    const { name, email, driveid } = formData;

    const drive = await PlacementDrive.findById(driveid);
    if (!drive) {
      return res.status(404).json({ error: "Drive not found" });
    }

    if (role === "Companys") {
      const company = await Company.findOne({ email });
      if (!company) {
        return res.status(404).json({ error: "company not found" });
      }

      drive.companies.push({
        companyId: company._id,
        companyEmail: company.email,
        companyName: company.companyName,
        confirmed: true,
      });
      await drive.save();
      res
        .status(200)
        .json({ message: "Company drive successfully registered" });
    } else if (role === "CompanyS") {
      res.status(500).json({ message: "this is student registeration" });
    }

    // const registration = new Registration({
  } catch (error) {
    res.status(500).json({ error: "Failed to register for the drive" });
  }
};

//zoom interview

const scheduleZoomMeeting =async (req, res) => {
 
  
  try {
    const formData = req.body; // Expect topic, startTime, duration, password
    const meeting = await scheduleMeeting(formData);
    res.status(200).json({ formData: meeting });
  } catch (error) {
      console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// get all schedule interview
const getAllScheduleInterviewByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
   const interviews = await Interview.find({ companyId });
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
}
export {
  createCompany,
  loginCompany,
  jobPosting,
  getAllJobsPostingByCompany,
  getStudentsDataById,
  scheduleInterview,
  getAllDrives,
  registerForDrive,
  scheduleZoomMeeting,
  getAllScheduleInterviewByCompany,
}
