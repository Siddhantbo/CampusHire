import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import API from "../../api/axios";

const StudentApplicationDetails = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.email : "";
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.post("/student/student-interview-status", { email });
        console.log("Response:", response.data);
        
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, [email]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Application Dashboard</h1>
          <p className="text-gray-600 text-lg">Track and manage all your job applications in one place</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
              <div className="mt-4 h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Applications Found</h2>
          <p className="text-gray-600">You haven't applied to any jobs yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Application Dashboard</h1>
        <p className="text-gray-600 text-lg">Track and manage all your job applications in one place</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <motion.div
            key={app.applicationId}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{app.jobTitle}</h2>
              <span
                className={`py-1 px-3 rounded-full text-sm font-medium ${
                  app.applicationStatus === "Shortlisted"
                    ? "bg-green-100 text-green-600"
                    : app.applicationStatus === "Rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {app.applicationStatus}
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-gray-600 font-medium">{app.companyName}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{app.jobLocation}</span>
            </div>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Salary:</span>
                <span>₹{app.jobSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span>{app.jobType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Applied on:</span>
                <span>{new Date(app.applicationSubmittedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <button
              onClick={() => toggleExpand(app.applicationId)}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              {expandedId === app.applicationId ? "View Less" : "View More"}
            </button>

            {expandedId === app.applicationId ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-4 border-t pt-4 space-y-3"
              >
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Job Description</h3>
                  <p className="text-gray-700">{app.jobDescription}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Interview Details</h3>
                  <p className="text-gray-700">Status: {app.interviewStatus}</p>
                  {app.interviewStatus === "Scheduled" && (
                    <>
                      <p className="text-gray-700">
                        Date: {new Date(app.interviewDate).toLocaleString()}
                      </p>
                      <p className="text-gray-700">Format: {app.interviewFormat}</p>
                      {app.interviewFormat === "Virtual" && (
                        <p className="text-gray-700">
                          Link: <a href={app.interviewLink} className="text-blue-500 underline">{app.interviewLink}</a>
                        </p>
                      )}
                      <p className="text-gray-700">Feedback: {app.interviewFeedback}</p>
                    </>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Company Contact</h3>
                  <p className="text-gray-700">Email: {app.companyEmail}</p>
                  <p className="text-gray-700">Phone: {app.companyPhone}</p>
                </div>
            </motion.div>
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentApplicationDetails;