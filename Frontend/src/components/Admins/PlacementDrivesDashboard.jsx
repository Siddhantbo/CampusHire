import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function PlacementDrivesDashboard() {
  const [drives, setDrives] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await API.get("admin/get-all-placement-drives");
        setDrives(response.data);
      } catch (error) {
        console.error("Error fetching placement drives:", error);
      }
    };
    fetchDrives();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Placement Drives</h1>
          <button
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={() => navigate("/admin/createPlacementDrive")}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Drive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map((drive,index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{drive.title}</h2>
                  <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{drive.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Start Date</span>
                      <span className="font-medium">{formatDate(drive.startDate)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">End Date</span>
                      <span className="font-medium">{formatDate(drive.endDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-blue-900 font-semibold">{drive.companies.length}</div>
                    <div className="text-sm text-blue-700">Companies</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-purple-900 font-semibold">{drive.students.length}</div>
                    <div className="text-sm text-purple-700">Students</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-orange-900 font-semibold">{drive.interviewsConducted}</div>
                    <div className="text-sm text-orange-700">Interviews</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-green-900 font-semibold">{drive.offersMade}</div>
                    <div className="text-sm text-green-700">Offers</div>
                  </div>
                </div>
                {/* <button
                  className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  onClick={() => console.log(`View details for ${drive.id}`)}
                >
                  View Details
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlacementDrivesDashboard;