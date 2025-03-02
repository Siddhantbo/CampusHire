import React, { useState } from "react";
import axios from "axios";
import API from "../../api/axios";
const ScheduleMeetingForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    startTime: "",
    duration: "",
    password: "",
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token ="Q-rlrcRsRMe5z83o32KGmw";
      await API.post("/company/schedule-meeting", formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
       console.log(res.data);
       
      });
      console.log(res.data);
      
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      alert("Failed to schedule the meeting.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Schedule a Zoom Meeting</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="topic">
            Meeting Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="startTime">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="duration">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password (optional)
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Schedule Meeting
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <h3 className="font-semibold mb-2">Meeting Scheduled Successfully!</h3>
          <p>Meeting ID: {response.id}</p>
          <p>Join URL: <a href={response.join_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{response.join_url}</a></p>
          <p>Start URL: <a href={response.start_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{response.start_url}</a></p>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeetingForm;
