import axios from "axios";
import jwt from "jsonwebtoken";

// Zoom API credentials
const ZOOM_API_KEY = "JuD7idgS62MIlS2_KBfhg";
const ZOOM_API_SECRET = "8E5TL36XEptMpRRHXCgJ3AOPNjvpiP9F";

// Generate Zoom JWT token
const generateZoomToken = () => {
  const payload = {
    iss: ZOOM_API_KEY,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token valid for 1 hour
  };
  return jwt.sign(payload, ZOOM_API_SECRET);
};

// Function to schedule a Zoom meeting
export const scheduleMeeting = async (meetingDetails) => {
  const token = generateZoomToken();
  const { topic, startTime, duration, password } = meetingDetails;

  try {
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime, // ISO 8601 format
        duration, // In minutes
        password,
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error scheduling meeting:", error.response?.data || error);
    throw new Error("Failed to schedule meeting");
  }
};
