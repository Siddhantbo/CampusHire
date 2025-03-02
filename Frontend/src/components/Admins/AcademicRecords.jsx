import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
const AcademicRecords = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);

  useEffect(() => {
    console.log("records", records);  
  }, [records]);

  const fetchRecords = async () => {
    try {
      const response = await API.get('/admin/get-all-academic-records');
     
      
      setRecords(response.data.map(record => ({
        id: record._id,
        studentRegistrationNumber: record.studentRegistrationNumber,
        studentId: record.studentId,
        email: record.email,
        department: record.department,
        batch: record.batch,
        GPA: record.GPA,
        grades: record.grades,
        achievements: record.achievements,
        transcript: record.transcript,
        updatedAt: record.updatedAt
      })));

    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };
  useEffect(() => {
   

    fetchRecords();
  }, []);

  
  const handleUpdate = async () => {
    try {
     
      const response = await API.put('/admin/update-academic-records', {
        _id: editedRecord.id,
        studentRegistrationNumber: editedRecord.studentRegistrationNumber,
        studentId: editedRecord.studentId,
        email: editedRecord.email,
        department: editedRecord.department,
        batch: editedRecord.batch,
        GPA: editedRecord.GPA,
        grades: editedRecord.grades,
        achievements: editedRecord.achievements,
        transcript: editedRecord.transcript
      });
      
    

      
      setRecords(records.map(record => 
        record.id === editedRecord.id ? editedRecord : record
      ));
      setIsEditing(false);
      setSelectedRecord(null);
      alert("Academic record updated successfully!");
    } catch (error) {
      console.error("Error updating record:", error);
      alert("Failed to update academic record: " + error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Academic Records
      </motion.h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {records.map((record) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
          >
            <p className="text-lg font-semibold">ID: {record.studentRegistrationNumber}</p>
            <p className="text-gray-600">{record.department}</p>
            <p className="text-gray-600">Batch: {record.batch}</p>
            <button
              onClick={() => setSelectedRecord(record)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Student Details</h2>
                  <p><strong>Student ID:</strong> {selectedRecord.studentRegistrationNumber}</p>
                  <p><strong>Department:</strong> {selectedRecord.department}</p>
                  <p><strong>Batch:</strong> {selectedRecord.batch}</p>
                  <p><strong>GPA:</strong> {selectedRecord.GPA}</p>
                  <p>
                    <strong>Grades:</strong>{" "}
                    {selectedRecord.grades.map((grade, idx) => (
                      <span key={idx}>
                        {grade.subject}: {grade.grade}
                        {idx < selectedRecord.grades.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p><strong>Achievements:</strong> {selectedRecord.achievements.join(", ")}</p>
                  <p>
                    <strong>Transcript:</strong>{" "}
                    <a
                      href={`/${selectedRecord.transcript}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {selectedRecord.transcript}
                    </a>
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditedRecord({...selectedRecord});
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setSelectedRecord(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4">Edit Student Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Student Registration Number</label>
                      <input
                        type="text"
                        value={editedRecord.studentRegistrationNumber}
                        onChange={(e) => setEditedRecord({...editedRecord, studentRegistrationNumber: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Department</label>
                      <input
                        type="text"
                        value={editedRecord.department}
                        onChange={(e) => setEditedRecord({...editedRecord, department: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Batch</label>
                      <input
                        type="number"
                        value={editedRecord.batch}
                        onChange={(e) => setEditedRecord({...editedRecord, batch: parseInt(e.target.value)})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">GPA</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editedRecord.GPA}
                        onChange={(e) => setEditedRecord({...editedRecord, GPA: parseFloat(e.target.value)})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Grades</label>
                      {editedRecord.grades.map((grade, index) => (
                        <div key={index} className="flex gap-2 mt-2">
                          <input
                            type="text"
                            value={grade.subject}
                            onChange={(e) => {
                              const newGrades = [...editedRecord.grades];
                              newGrades[index].subject = e.target.value;
                              setEditedRecord({...editedRecord, grades: newGrades});
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Subject"
                          />
                          <input
                            type="text"
                            value={grade.grade}
                            onChange={(e) => {
                              const newGrades = [...editedRecord.grades];
                              newGrades[index].grade = e.target.value;
                              setEditedRecord({...editedRecord, grades: newGrades});
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Grade"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Achievements</label>
                      <input
                        type="text"
                        value={editedRecord.achievements.join(", ")}
                        onChange={(e) => setEditedRecord({...editedRecord, achievements: e.target.value.split(", ")})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Separate achievements with comma"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Transcript</label>
                      <input
                        type="text"
                        value={editedRecord.transcript}
                        onChange={(e) => setEditedRecord({...editedRecord, transcript: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={()=>{
                          handleUpdate()
                          setIsEditing(false)
                          fetchRecords();
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AcademicRecords;