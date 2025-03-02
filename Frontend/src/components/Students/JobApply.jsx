import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import API from "../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobApply() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.email : "";
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      API.post("/student/get-job-details", { jobId })
        .then((response) => {
       
          setJobDetails(response.data.jobData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchJobDetails();
  }, [jobId]);

  const handleApply = async () => {
    try {
      await toast.promise(API.post("/student/apply", { jobId, email }), {
        pending: "Applying...",
        success: "Applied",
        error: "Failed to apply or Already Applied",
      });
    } catch (error) {
      console.error(error);
      // Handle error or show an error message
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!jobDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8"
    >
      {loading ? (
        <div className="space-y-4">
          <Skeleton height={40} width={300} />
          <Skeleton height={20} count={2} />
          <Skeleton height={250} count={2} />
          <Skeleton height={60} count={1} />
        </div>
      ) : (
        <>
          <div>
            <Link to={"/student/jobslistings"}>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
                whileTap={{ scale: 0.95 }}
                className="mb-3 flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </motion.button>
            </Link>
          </div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            {jobDetails.title}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Company Details
              </h2>
              <hr className="mb-4" />
              <p className="mb-2">
                <span className="font-medium">Company:</span>{" "}
                {jobDetails.companyName}
              </p>
              <p className="mb-2">
                <span className="font-medium">Email:</span>{" "}
                {jobDetails.companyEmail}
              </p>
              <p className="mb-2">
                <span className="font-medium">Contact:</span>{" "}
                {jobDetails.companyContact}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Job Requirements
              </h2>
              <hr className="mb-4" />
              <p className="mb-2">
                <span className="font-medium">Location:</span>{" "}
                {jobDetails.location}
              </p>
              <p className="mb-2">
                <span className="font-medium">Job Type:</span>{" "}
                {jobDetails.jobType}
              </p>
              <p className="mb-2">
                <span className="font-medium">Salary:</span> {jobDetails.salary}{" "}
                per Month
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Job Description
            </h2>
            <hr className="mb-4" />
            <p className="text-gray-700">{jobDetails.description}</p>
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <p className="mb-2 md:mb-0">
                <span className="font-medium">Posted:</span>{" "}
                {new Date(jobDetails.jobPostedDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Deadline:</span>{" "}
                {new Date(jobDetails.applicationDeadline).toLocaleDateString()}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#0056b3" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApply}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </motion.button>
          </div>
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </motion.div>
  );
}

export default JobApply;