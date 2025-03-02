import React, { useMemo } from "react";
import Sidebar from "../components/SideBar";
import StudentRegistrationForm from "../components/Students/StudentRegistrationForm";
import Applications from "../components/Students/Applications";
import JobListings from "../components/Students/JobListings";
import { Routes, Route } from "react-router-dom";
import JobApply from "../components/Students/JobApply";
import Navbar from "../components/Navbar";
import PlacementDriveRegistration from "../components/PlacementDriveRegistration";
import PlacementDriveList from "../components/PlacementDriveList";
import StudentApplicationDetails from "../components/Students/StudentApplicationDetails";

function StudentPage() {
  const name = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.firstName + " " + userData.lastName : "";
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full order-1 h-screen">
          <Navbar name={name} />
          <div className="p-4 flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/student-registration-form"
              element={<StudentRegistrationForm />}
            />
            <Route path="/applications" element={<Applications />} />
            <Route path="/jobslistings" element={<JobListings />} />
            <Route path="/job-apply/:jobId" element={<JobApply />} />
            <Route path="/PlacementDriveList" element={<PlacementDriveList />} />
            <Route path="/PlacementDriveRegistration/:driveid" element={<PlacementDriveRegistration />} />
            <Route path="/PlacementDriveRegistration" element={<PlacementDriveRegistration />} />
            <Route path="/StudentApplicationDetails" element={<StudentApplicationDetails/>}/>
          </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentPage;