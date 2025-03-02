import React, { useState, useEffect, useMemo } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import resume from "../../assets/resume_sample.pdf";

const JobApplicationDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const companyId = useMemo(() => {
    const companyData = JSON.parse(localStorage.getItem("companyData"));
    return companyData ? companyData.companyId : "";
  }, []);

  useEffect(() => {
    const fetchAllAppliedStudents = async () => {
      try {
        const response = await API.post(`/company/getStudentsDataById`, { studentIds });

      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchAllAppliedStudents();
  }, [studentIds]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get(`/company/get-all-jobs/${companyId}`);
      
        setApplications(response.data);
        setStudentIds(response.data.map((application) => application.studentId));
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [companyId]);

  const handleApplicationSelect = (student, application) => {
    setIsLoading(true);
    setSelectedApplication(null);
    setTimeout(() => {
      setSelectedApplication({ student, application });
      setIsLoading(false);
    }, 1000);
  };

  const getRandomGPA = () => (Math.random() * (8.6 - 6.0) + 6.0).toFixed(1);

  return (
    <div className="container mx-auto p-4 flex justify-around gap-40 text-lg bg-slate-100 ">
      <div className="w-1/4 text-3xl font-bold mb-4">
        <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
        <table className="min-w-[40rem] divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application) => (
              application.studentData.map((student, index) => (
                student != null && (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Applied
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                      <button onClick={() => handleApplicationSelect(student, application)}>View</button>
                    </td>
                  </tr>
                )
              ))
            ))}
          </tbody>
        </table>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[30rem] bg-white p-4 rounded-lg shadow"
      >
        {isLoading ? (
          <div className="space-y-4 w-40">
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        ) : selectedApplication ? (
          <div className="space-y-4 ">
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Personal Information</h3>
                <p>Name: {selectedApplication.student.name}</p>
                <p>Email: {selectedApplication.student.email}</p>
                <p>Phone: {selectedApplication.student.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Education</h3>
                <p>University: mindSpark University Chennai</p>
                <p>Degree: {selectedApplication.student.department}</p>
                <p>GPA: {getRandomGPA()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Applied Position</h3>
                <p>Job Title: {selectedApplication.application.title}</p>
                <p>Department: {selectedApplication.student.department}</p>
                <p>Applied Date: 2023-10-15</p>
              </div>
              <div>
                <h3 className="font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded">JavaScript</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">React</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Node.js</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Resume</h3>
                <a href={resume} download className="text-blue-600 hover:text-blue-800">Download Resume</a>
              </div>
              <div className="flex gap-4 pt-4">
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  Reject
                </button>
                <Link to={`/company/dashboard/interview-schedular/${selectedApplication.student.id}/${selectedApplication.application.id}`}>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Schedule Interview
                </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select an application to view details
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default JobApplicationDashboard;