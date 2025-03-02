import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const UpdateInterview = ({ interview, onSubmit }) => {
  const [formData, setFormData] = useState({
    applicationId: interview?.applicationId || "",
    scheduledDate: interview?.scheduledDate || "",
    format: interview?.format || "In-person",
    link: interview?.link || "",
    status: interview?.status || "Scheduled",
    feedback: interview?.feedback || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put('/admin/update-interview-status', {
        applicationId: formData.applicationId,
        scheduledDate: formData.scheduledDate,
        format: formData.format,
        link: formData.link,
        status: formData.status,
        feedback: formData.feedback
      });
      if(response.status === 200) {
        alert('Interview updated successfully!');
      }
      onSubmit(response.data);
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Interview</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Application ID */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Application ID
          </label>
          <input
            type="text"
            name="applicationId"
            value={formData.applicationId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Application ID"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Scheduled Date
          </label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate.split("T")[0]} // Convert to local date format
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Format */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Format</label>
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="In-person">In-person</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>

        {/* Link (conditional) */}
        {formData.format === "Virtual" && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Meeting Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Meeting Link"
              required
            />
          </div>
        )}

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Feedback
          </label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Feedback (optional)"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Interview
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInterview;