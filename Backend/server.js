import express from "express";
import axios from "axios";
import cors from "cors";
import connectDB from "./Configs/ConfigDB.js";
import UserRoute from "./Routes/UserRoute.js";
import DefaultRoute from "./Routes/DefaultRoute.js";
import StudentRoutes from "./Routes/StudentRoutes.js";
import CompanyRoutes from "./Routes/CompanyRoutes.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
import dotenv from "dotenv";
import adminRoutes from "./Routes/AdminRoutes.js"
dotenv.config(); // Load env variables before anything else

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", DefaultRoute);
app.use("/api/auth", UserRoute);
app.use("/api/auth/student", StudentRoutes);
app.use("/api/auth/company", CompanyRoutes);
app.use("/api/auth/admin", AdminRoutes);
app.use("/api/admin", adminRoutes);

connectDB();

// Zoom API credentials
const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const REDIRECT_URI = process.env.ZOOM_REDIRECT_URI;

// Generate Zoom OAuth URL
app.get("/api/zoom/oauth-url", (req, res) => {
  const zoomOAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  res.json({ url: zoomOAuthUrl });
});

// Handle Zoom OAuth callback
app.get("/api/zoom/callback", async (req, res) => {
  const authorizationCode = req.query.code;

  try {
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code: authorizationCode,
          redirect_uri: REDIRECT_URI,
        },
        headers: {
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    res.json({ access_token, refresh_token });
  } catch (error) {
    console.error("Error exchanging code for token:", error.response?.data);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

// Create a Zoom meeting
app.post("/api/zoom/create-meeting", async (req, res) => {
  const { accessToken, topic, startTime, duration } = req.body;

  try {
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error creating meeting:", error.response?.data);
    res.status(500).json({ error: "Failed to create meeting" });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log(error.message, "Server Failed to Start");
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
