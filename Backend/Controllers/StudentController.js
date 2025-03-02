import Student from "../Models/StudentModel.js";
import JobPosting from "../Models/JobPostingModel.js";
import Company from "../Models/CompanyModel.js";
import Application from "../Models/ApplicationModel.js";
import PlacementDrive from "../Models/PlacementDriveModel.js";
import User from "../Models/UserModel.js";
import Interview from "../Models/InterviewModel.js";

// Create a new student registration
const createStudent = async (req, res) => {
  try {
    const formData = req.body;
    const {
      name,
      email,
      password,
      phone,
      department,
      resumeLink = null,
      jobRoles,
    } = formData;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already registered" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "You don't have an account " });
    }
    const existingUserRole = existingUser.role;
    if (existingUserRole !== "Students") {
      return res.status(400).json({ error: "You are not a student" });
    }
    const newStudent = new Student({
      name,
      email,
      password,
      phone,
      department,
      jobRoles,
      resumeLink,
    });
    await newStudent.save();
    const savedStudent = await Student.findOne({ email });
    existingUser.studentId = savedStudent._id;
    await existingUser.save();

    res.status(201).json({ message: "Student registration successful" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to register student" });
  }
};
// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

//get all the job available for student
const getAllJobs = async (req, res) => {
  try {
    const { email } = req.body;
   

    const jobs = await JobPosting.find();

    const jobData = await Promise.all(
      jobs.map(async (job) => {
        let id = job.companyId;
        let company = await Company.findById(id);

        return {
          id: job._id,
          title: job.title,
          description: job.description,
          companyName: company.companyName,
          location: job.location,
          salary: job.salary,
          jobType: job.jobType,
          applicationDeadline: job.applicationDeadline,
          companyId: job.companyId,
        };
      })
    );

    res.status(200).json({ message: "success", jobData });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// get job details by id
const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
      console.log("job not found");
    }
    // if job is found
    const id = job.companyId;
    const company = await Company.findById(id);

    const jobData = {
      id: job._id,
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      applicationDeadline: job.applicationDeadline,
      jobPostedDate: job.createdAt,
      companyName: company.companyName,
      companyId: company._id,
      companyEmail: company.email,
      companyContact: company.contactPerson,
    };

    res.status(200).json({ message: "success", jobData });
  } catch (error) {
    console.log(error);
  }
};

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { email, jobId } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const job = await JobPosting.findById(jobId);
    if (!job) {
      console.log("job not found");
      return res.status(404).json({ error: "Job not found" });
    }
    const existingApplication = await Application.findOne({
      jobId: jobId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ error: "You have already applied for this job" });
    }

    const application = new Application({
      jobId: jobId,
      studentId: student._id,
      resumeUrl: "not attached",
      coverLetter: "not attached",
      status: "Applied",
    });
    await application.save();
    student.applications.push({
      companyId: job.companyId,
      jobId: jobId,
      status: "Applied",
      appliedDate: new Date(),
      interviewDate: null,
    });
    await student.save();
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to apply for the job" });
  }
};

// getting all the applications of a student by user id and student id
const getStudentApplications = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ error: "User not found" });
    }
    // finding student id from user id
    const student = await Student.findById(user.studentId);
    if (!student) {
      console.log("student not found");
      return res.status(404).json({ error: "Student not found" });
    }
    // title

    // finding all the applied jobs of student
    const applications = await Application.find({ studentId: student._id });

    const filteredApplications = await Promise.all(
      applications.map(async (application) => {
        const job = await JobPosting.findById(application.jobId);
        const company = await Company.findById(job.companyId);
        return {
          jobTitle: job.title,
          companyName: company.companyName,
          status: application.status,
          jobType: job.jobType,
          submittedDate: application.submittedAt,
        };
      })
    );
    
    res.status(200).json(filteredApplications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
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

// register for a drive by student update process
const registerForDrive = async (req, res) => {
  try {
    const { formData, role } = req.body;
    const { name, email, driveid } = formData;
  

    const drive = await PlacementDrive.findById(driveid);
  

    if (!drive) {
      return res.status(404).json({ error: "Drive not found" });
    }

    if (role === "Students") {
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      drive.students.push({
        studentId: student._id,
        studentEmail: student.email,
        studentName: name,
        resgistered: true,
      });
      await drive.save();
      res
        .status(200)
        .json({ message: "Student drive successfully registered" });
    } else if (role === "CompanyS") {
      res.status(500).json({ message: "this is student registeration" });
    }

    // const registration = new Registration({
  } catch (error) {
    res.status(500).json({ error: "Failed to register for the drive" });
  }
};

// student interview application status
const studentInterviewStatus = async (req, res) => {
  try {
    const {email} = req.body;
    
    const student = await Student.findOne({ email });
    const studentsApplications = await Application.find({ studentId: student._id });
    const studentApplications = await Promise.all(studentsApplications.map(async (application) => {
     
      const findInterview = await Interview.findOne({ applicationId: application._id });
      const jobPosting = await JobPosting.findById(application.jobId);
      const company = await Company.findById(jobPosting.companyId);
      return {
        applicationId: application._id,
        jobTitle: jobPosting.title,
        jobId: application.jobId,
        jobDescription: jobPosting.description,
        jobSalary: jobPosting.salary,
        jobQualification: jobPosting.qualifications,
        jobLocation: jobPosting.location,
        jobType: jobPosting.jobType,
        applicationCreatedDate:jobPosting.createdAt,
        companyName: company.companyName,
        companyEmail: company.email,
        companyContact: company.contact,
        companyPhone: company.phone, 
        applicationStatus: application.status,
        applicationSubmittedDate: application.submittedAt,
        interviewStatus: findInterview ? findInterview.status : "Not Applied",
        interviewDate: findInterview ? findInterview.scheduledDate : null,
        interviewFormat: findInterview ? findInterview.format : null,
        interviewLink: findInterview ? findInterview.link : null,
        interviewFeedback: findInterview ? findInterview.feedback : null,
      };
    }));
   
    res.status(200).json(studentApplications);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};
export {  
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
};
