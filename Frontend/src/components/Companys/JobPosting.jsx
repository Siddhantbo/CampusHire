import React, { useState,useMemo } from "react";
import API from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualifications: [""],
    jobType: "Full-time",
    location: "On-site",
    salary: "",
    applicationDeadline: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "qualifications") {
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const companyId = useMemo(() => {
    const companyData = JSON.parse(localStorage.getItem("companyData"));
    return companyData ? companyData.companyId : "";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await API.post(`/company/job-posting/${companyId}`, formData).then(
        (response) => {
          console.log("Job posting successful:", response.data);
          toast.success("Job posted successfully!");
        }
      );
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Error posting job: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow max-w-4xl mx-auto "
    >
      <div className="grid grid-cols-4 gap-4">
        <div className="mb-4">
          <label className="block text-blue-700 font-bold mb-2" htmlFor="title">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-blue-500 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold mb-2" htmlFor="jobType">
            Job Type:
          </label>
          <select
            name="jobType"
            id="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="border border-blue-500 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold mb-2" htmlFor="location">
            Location:
          </label>
          <select
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-blue-500 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold mb-2" htmlFor="salary">
            Salary
          </label>
          <input
            type="text"
            name="salary"
            id="salary"
            value={formData.salary}
            onChange={handleChange}
            className="border border-blue-500 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-blue-700 font-bold mb-2"
          htmlFor="description"
        >
          Job Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-blue-500 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block text-blue-700 font-bold mb-2"
          htmlFor="qualifications"
        >
          Qualifications (comma separated)
        </label>
        <textarea
          name="qualifications"
          id="qualifications"
          value={formData.qualifications.join(",")}
          onChange={handleChange}
          className="border border-blue-500 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block text-blue-700 font-bold mb-2"
          htmlFor="applicationDeadline"
        >
          Application Deadline
        </label>
        <input
          type="date"
          name="applicationDeadline"
          id="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="border border-blue-500 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
      >
        Post Job
      </button>
      <ToastContainer />
    </form>
  );
};

export default JobPostingForm;