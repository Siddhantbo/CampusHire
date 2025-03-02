import React, { useState, useEffect, useMemo } from "react";
import API from "../../api/axios";
import { motion } from "framer-motion";

function InterviewScheduled() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const companyId = useMemo(() => {
    const companyData = JSON.parse(localStorage.getItem("companyData"));
    return companyData ? companyData.companyId : "";
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get(
          `/company/get-all-schedule-interview/${companyId}`
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchApplications();
    }
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Scheduled Interviews</h1>
      {applications.length === 0 ? (
        <p className="text-gray-600">No interviews scheduled yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => (
            <motion.div
              key={application._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h2 className="font-semibold text-lg text-gray-800">
                Application ID: {application.applicationId}
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold">Scheduled Date: </span>
                {new Date(application.scheduledDate).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Format: </span>
                {application.format}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Status: </span>
                {application.status}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Feedback: </span>
                {application.feedback || "N/A"}
              </p>
              {application.link && (
                <a
                  href={application.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Join Meeting
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewScheduled;
