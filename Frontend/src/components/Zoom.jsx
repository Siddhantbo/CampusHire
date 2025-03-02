import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Zoom() {
  const navigate = useNavigate();
  const [zoomAuthUrl, setZoomAuthUrl] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("zoomAccessToken") || ""
  );
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchOAuthUrl() {
      const response = await axios.get(
        "https://college-placement-management-backend-yyv6.onrender.com/api/zoom/oauth-url"
      );
      console.log(response.data);
      setZoomAuthUrl(response.data.url);
    }
    fetchOAuthUrl();
  }, []);

  const handleZoomAuth = async () => {
    window.location.href = zoomAuthUrl;
   
  };

  const createMeeting = async () => {
    setLoading(true);
    const meetingData = {
      accessToken,
      topic: "Placement Drive Interview Call",
      startTime: new Date().toISOString(),
      duration: 30,
    };

    try {
      const response = await axios.post(
        "https://college-placement-management-backend-yyv6.onrender.com/api/zoom/create-meeting",
        meetingData
      );
      setMeetingDetails(response.data);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating meeting:", error.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="App w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Zoom API Integration to Create Zoom Meeting Link
      </h1>
      {!accessToken && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomAuth}
          className="px-4 py-2 text-lg cursor-pointer rounded bg-blue-500 text-white flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-check w-5 h-5"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Authenticate with Zoom
        </motion.button>
      )}

      {accessToken && (
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={createMeeting}
            disabled={loading}
            className={`px-4 py-2 text-lg cursor-pointer rounded flex items-center gap-2 relative ${
              loading ? "bg-gray-500" : "bg-green-500"
            } text-white`}
          >
            {loading ? (
              <span>Loading...</span>
            ) : success ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-check w-5 h-5"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-check w-5 h-5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Create Zoom Meeting
              </>
            )}
          </motion.button>
        </div>
      )}

      {meetingDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-4 bg-white rounded shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2">Meeting Created</h2>
          <p>
            Join URL:
            <a
              href={meetingDetails.join_url}
              className="text-blue-800"
              onClick={() => {
                navigator.clipboard.writeText(meetingDetails.join_url);
                toast.success("Meeting URL copied to clipboard!");
              }}
            >
              {meetingDetails.join_url}
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-copy w-5 h-5 inline-block ml-2 cursor-pointer"
              onClick={() =>{
                navigator.clipboard.writeText(meetingDetails.join_url)
                toast.success("Meeting URL copied to clipboard!");
              }
              }
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </p>
          <p>Meeting ID: {meetingDetails.id}</p>
        </motion.div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Zoom;
