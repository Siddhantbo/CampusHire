import React, { useEffect, useState, useMemo } from "react";
import API from "../../api/axios";
const Applications = () => {
  const [applications, setApplications] = useState();
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
 const userid = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.userid : "";
  }, []);
  useEffect(() => {
    // Fetch data from API
    const fetchApplications = async () => {
      try {
        await API.get(`/student/get-student-applications/${userid}`)
          .then((response) => {
            
            setTimeout(() => {
              setApplications(response.data);
              setLoading(false);
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } catch (err) {
        console.error("Error fetching applications:", err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userid]);
    const filteredApplications =
      filter === "All"
        ? applications
        : applications?.filter((app) => app.status === filter);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Applications</h1>

        {/* Filter */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <label htmlFor="statusFilter" className="mr-2">
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
          </div>
        </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Company
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Job Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Submitted Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </td>
              </tr>
            ) : filteredApplications ? (filteredApplications.map((app,index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4 text-blue-600">{app.jobTitle}</td>
                <td className="px-6 py-4">{app.companyName}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    app.status === "Hired"
                      ? "text-green-500"
                      : app.status === "Shortlisted"
                      ? "text-green-500"
                      : app.status === "Rejected"
                      ? "text-red-500"
                      : app.status === "Reviewed"
                      ? "text-yellow-500"
                      : "text-blue-800"
                  }`}
                >
                  {app.status}
                </td>
                <td className="px-6 py-4">{app.jobType}</td>
                <td className="px-6 py-4">{new Date(app.submittedDate).toLocaleDateString()}</td>
              </tr>
            ))) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;