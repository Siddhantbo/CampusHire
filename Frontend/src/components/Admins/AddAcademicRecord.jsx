import React, { useState } from "react";
import API from "../../api/axios";
const AddAcademicRecord = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    email: "",
    department: "",
    batch: "",
    GPA: "",
    grades: [{ subject: "", grade: "" }],
    achievements: [""],
    transcript: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGradeChange = (index, field, value) => {
    const updatedGrades = [...formData.grades];
    updatedGrades[index][field] = value;
    setFormData({ ...formData, grades: updatedGrades });
  };

  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = value;
    setFormData({ ...formData, achievements: updatedAchievements });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, transcript: e.target.files[0] });
  };

  const addGradeField = () => {
    setFormData({ ...formData, grades: [...formData.grades, { subject: "", grade: "" }] });
  };

  const addAchievementField = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ""] });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
  
    try {
      await API.post("/admin/add-academic-records", formData)
      .then((response) => {
     
        alert("Academic Record added successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add academic record.",error);
      })

    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Add Academic Record</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-2">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Student Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Department</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Batch</label>
          <input
            type="number"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">GPA</label>
          <input
            type="number"
            step="0.01"
            name="GPA"
            value={formData.GPA}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Grades */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Grades</label>
          {formData.grades.map((grade, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Subject"
                value={grade.subject}
                onChange={(e) => handleGradeChange(index, "subject", e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Grade"
                value={grade.grade}
                onChange={(e) => handleGradeChange(index, "grade", e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addGradeField}
            className="text-blue-500 underline mt-2"
          >
            Add Grade
          </button>
        </div>

        {/* Achievements */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Achievements</label>
          {formData.achievements.map((achievement, index) => (
            <input
              key={index}
              type="text"
              placeholder="Achievement"
              value={achievement}
              onChange={(e) => handleAchievementChange(index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addAchievementField}
            className="text-blue-500 underline"
          >
            Add Achievement
          </button>
        </div>

        {/* Transcript */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Transcript</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAcademicRecord;