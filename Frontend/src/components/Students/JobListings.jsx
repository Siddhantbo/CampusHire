import React, { useState, useEffect, useMemo } from "react";
import API from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.email : "";
  }, []);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        await API.post("/student/get-all-jobs", { email })
          .then((response) => {
           
            setTimeout(() => {
              setJobs(response.data.jobData);
              setLoading(false);
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error fetching jobs");
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
        toast.error("Error fetching jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [email]);

  return (
    <div className="container flex flex-col items-center  min-h-screen">
      <h2 className="header uppercase font-bold">Job Openings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {loading ? (
          // Render skeleton loader while loading
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-40 gap-4 bg-gray-50 rounded-lg shadow-md">
              <Skeleton height={30} width={400} />
              <Skeleton height={60} width={200} />
              <Skeleton height={20} width={200} />
            </div>
          ))
        ) : (
          // Render job listings when data is loaded
          jobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <JobListing key={job.id} job={job} />
            </motion.div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

const JobListing = ({ job }) => {
  
  return (
    <div className="m-2 rounded-lg border p-4 shadow-md hover:shadow-lg w-96">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-blue-500">{job.title}</h3>
          <Link to={`/student/job-apply/${job.id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Apply
          </button>
          </Link>
        </div>
        <p className="text-gray-600 text-sm mt-2">{job.companyName}</p>
        <p className="text-gray-600 text-sm mt-2">Location:{job.location}</p>
        <p className="mt-2">{job.description}</p>
        <div className="mt-4 flex space-x-2">
          <span className="bg-green-100 text-green-900 px-2 py-0.5 rounded-full text-sm">
            {job.jobType}
          </span>
          <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full text-sm">
            Salary: {job.salary}
          </span>
        </div>
      </div>
    </div>
  );
    }


export default JobListings;
