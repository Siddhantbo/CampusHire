import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import PlacementDrivesDashboard from "../components/Admins/PlacementDrivesDashboard";
import CreatePlacementDrive from "../components/Admins/CreatePlacementDrive";
import AdminSideBar from "../components/Admins/AdminSideBar";
import RecruitmentDashboard from "../components/Admins/RecruitmentDashboard";
import AcademicRecords from "../components/Admins/AcademicRecords";
import CompanyList from "../components/Admins/CompanyLists";
import Navbar from "../components/Navbar";
import AddAcademicRecord from "../components/Admins/AddAcademicRecord";
import InterviewList from "../components/Admins/InterviewList";
import API from "../api/axios";

function AdminPage() {
  const [interviews, setInterviews] = useState([]);

  const fetchInterviews = async () => {
    try {
      const response = await API.get("/admin/get-all-interviews");
      setInterviews(response.data);
    
    }
    catch (error) {
      console.error("Error fetching interviews:", error);
    }
  }
  useEffect(() => {
   
    fetchInterviews();
  }, []);

  const handleUpdate = (updatedData) => {
    setInterviews((prev) =>
      prev.map((interview) =>
        interview._id === updatedData._id ? { ...interview, ...updatedData } : interview
      )
    );
    console.log("Interview updated:", updatedData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    >
      <div className="flex">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AdminSideBar />
        </motion.div>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col w-full order-1"
        >
          <Navbar />
          <div className="h-[90vh] overflow-y-auto backdrop-blur-sm bg-white/30 rounded-lg m-4 p-4 shadow-lg">
            <Routes>
              <Route path="/" element={<PlacementDrivesDashboard />} />
              <Route
                path="/createPlacementDrive"
                element={<CreatePlacementDrive />}
              />
              <Route
                path="/recruitmentDashboard"
                element={<RecruitmentDashboard />}
              />
              <Route path="/AcademicRecords" element={<AcademicRecords />} />
              <Route
                path="/AddAcademicRecord"
                element={<AddAcademicRecord />}
              />
              <Route path="/CompanyList" element={<CompanyList />} />
              <Route path="/InterviewList" element={<InterviewList interviews={interviews} onUpdate={handleUpdate} fetchInterviews={fetchInterviews} />} />
            </Routes>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AdminPage;