import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

function RecruitmentDashboard() {
  const [recruitmentData, setRecruitmentData] = useState({
    totalStudents: 0,
    studentsPlaced: 0,
    offersAccepted: 0,
    successRate: 0,
    placementsByCompany: [],
    departmentDistribution: [],
    yearlyTrends: [],
  });

  useEffect(() => {
    setRecruitmentData({
        "totalStudents": 200,
        "studentsPlaced": 150,
        "offersAccepted": 140,
        "successRate": 75,
        "placementsByCompany": [
          { "company": "Google", "count": 20 },
          { "company": "Microsoft", "count": 15 }
        ],
        "departmentDistribution": [
          { "department": "Computer Science", "count": 80 },
          { "department": "Mechanical", "count": 30 }
        ],
        "yearlyTrends": [
          { "year": 2022, "count": 120 },
          { "year": 2023, "count": 150 }
        ]
      }
      )
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Recruitment Status</h1>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-bold">Total Students</h2>
          <p className="text-2xl">{recruitmentData.totalStudents}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-bold">Students Placed</h2>
          <p className="text-2xl">{recruitmentData.studentsPlaced}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-bold">Offers Accepted</h2>
          <p className="text-2xl">{recruitmentData.offersAccepted}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-bold">Success Rate</h2>
          <p className="text-2xl">{recruitmentData.successRate}%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Placements By Company</h2>
          <div style={{ height: '300px', width: '100%' }}>
            <Bar
              data={{
                labels: recruitmentData.placementsByCompany.map((item) => item.company),
                datasets: [
                  {
                    label: "Number of Placements",
                    data: recruitmentData.placementsByCompany.map((item) => item.count),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Department Distribution</h2>
          <div style={{ height: '300px', width: '100%' }}>
            <Pie
              data={{
                labels: recruitmentData.departmentDistribution.map((item) => item.department),
                datasets: [
                  {
                    data: recruitmentData.departmentDistribution.map((item) => item.count),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Yearly Placement Trends</h2>
        <div style={{ height: '300px', width: '100%' }}>
          <Line
            data={{
              labels: recruitmentData.yearlyTrends.map((item) => item.year),
              datasets: [
                {
                  label: "Placements",
                  data: recruitmentData.yearlyTrends.map((item) => item.count),
                  borderColor: "rgba(153, 102, 255, 1)",
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecruitmentDashboard;