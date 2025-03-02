import React, { useState, useEffect } from "react";
import { useAuth } from "../services/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";

function PlacementDriveList() {
  const { role } = useAuth();
  const [drives, setDrives] = useState([]);
  const [copiedDriveId, setCopiedDriveId] = useState(null);

  useEffect(() => {
      const fetchDrives = async () => {
          try {
              await API.get((role === "Companys" ? "/company" : "/student") + "/drives")
                  .then((response) => {
                    
                      setDrives(response.data);
                  })
                  .catch((error) => {
                      console.error("Error fetching placement drives:", error);
                  });
          } catch (error) {
              console.error("Error fetching placement drives:", error);
          }
      };

      fetchDrives();
  }, []);

  const handleCopy = (id) => {
      navigator.clipboard.writeText(id);
      setCopiedDriveId(id);
      setTimeout(() => setCopiedDriveId(null), 2000);
  };

  return (
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6"
      >
          <div className="max-w-6xl mx-auto">
              <motion.div 
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="text-center mb-10"
              >
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Engineering College</h1>
                  <p className="text-gray-600">Placement Cell - Creating Future Leaders</p>
              </motion.div>

              <div className="grid grid-cols-1 gap-6">
                  {drives.length === 0 ? (
                      <motion.p 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="text-gray-600 text-center p-8 bg-white rounded-lg shadow-md"
                      >
                          No placement drives available.
                      </motion.p>
                  ) : (
                      drives.map((drive) => (
                          <motion.div
                              key={drive._id}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              whileHover={{ scale: 1.02 }}
                              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                          >
                              <div className="flex flex-col">
                                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{drive.title}</h2>
                                  <p className="text-gray-600 mb-4">{drive.description}</p>
                                  <div className="flex justify-between items-center">
                                      <p className="text-sm text-gray-500"><strong>Company:</strong> mindSpark</p>
                                      <p className="text-sm text-gray-500"><strong>Location:</strong> chennai</p>
                                      <p className="text-sm text-gray-500"><strong>Deadline:</strong> {new Date(drive.endDate).toLocaleDateString()}</p>
                                      <p className="text-sm text-gray-500"><strong>Eligibility:</strong> {drive.eligibility || 'Open for all'}</p>
                                  </div>
                                  <div className="flex justify-end items-center mt-4 pt-4 border-t border-gray-100">
                                      <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() => handleCopy(drive._id)}
                                          className="bg-blue-500 text-white py-2 px-6 rounded-full mr-4 hover:bg-blue-600 transition shadow-md"
                                      >
                                          {copiedDriveId === drive._id ? "Copied!" : "Copy Drive ID"}
                                      </motion.button>
                                      <motion.div whileHover={{ scale: 1.05 }}>
                                          <Link
                                              to={role === "Students" ? `/student/PlacementDriveRegistration/${drive._id}` : `/company/dashboard/PlacementDriveRegistration/${drive._id}`}
                                              className="inline-block bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition shadow-md"
                                          >
                                              Register Now
                                          </Link>
                                      </motion.div>
                                  </div>
                              </div>
                          </motion.div>
                      ))
                  )}
              </div>
          </div>
      </motion.div>
  );
}

export default PlacementDriveList;