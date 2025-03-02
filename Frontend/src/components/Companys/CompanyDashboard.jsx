import React from "react";
import JobPostingForm from "./JobPosting";
import JobApplicationDashboard from "./JobApplicationDashboard";
import { Link, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import InterviewScheduler from "./InterviewScheduler";
import { useMemo } from "react";
import CompanySideBar from "../Companys/CompanySideBar";
import Navbar from "../Navbar";
import PlacementDriveRegistration from "../PlacementDriveRegistration";
import PlacementDriveList from "../PlacementDriveList";
import ScheduleMeetingForm from "./ScheduleMeetingForm";
import Zoom from '../Zoom'
import ZoomCallBack from "../ZoomCallBack";
import { useAuth } from "../../services/AuthProvider";
import InterviewScheduled from "./InterviewScheduled";

function CompanyDashboard() {
  const name = useMemo(() => {
    const companyData = JSON.parse(localStorage.getItem("companyData"));
    return companyData ? companyData.companyName : "";
  }, []);
  return (
    <>
      <div className="flex bg-slate-100 ">
        <CompanySideBar />

        <div className="flex flex-col w-full order-1 p-2">
          <Navbar name={name} />
          <div className="border-2 my-3"></div>
          <Routes>
            <Route path="/job-posting" element={<JobPostingForm />} />
            <Route
              path="/job-application"
              element={<JobApplicationDashboard />}
            />
            <Route
              path="/interview-schedular/:studentId/:applicationId"
              element={<InterviewScheduler />}
            />
            <Route
              path="/PlacementDriveRegistration/:driveid"
              element={<PlacementDriveRegistration />}
            />
            <Route
              path="/PlacementDriveRegistration"
              element={<PlacementDriveRegistration />}
            />
            <Route
              path="/PlacementDriveList"
              element={<PlacementDriveList />}
            />
            <Route
              path="/ScheduleMeetingForm"
              element={<ScheduleMeetingForm />}
            />
            <Route path="/zoom" element={<Zoom />} />

            <Route path="/zoom/callback" element={<ZoomCallBack />} />
            <Route path="/InterviewScheduled" element={<InterviewScheduled />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default CompanyDashboard;
