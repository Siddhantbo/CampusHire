import React, { useState } from "react";
import { useAuth } from "../services/AuthProvider";
import { useParams } from "react-router-dom";
import API from '../api/axios';
import { motion } from "framer-motion";

function PlacementDriveRegistration() {
  const { role } = useAuth();
  const { driveid } = useParams();

  const [formData, setFormData] = useState({
    driveid: driveid,
    name: "",
    email: "",
  });
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      await API.post(`${role==="Students"?"/student":"/company"}/register-for-drive`, {formData,role})
      .then((response) => {
          console.log(response.data);
          alert("Drive Registration successful!");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
    alert(`You have registered as a ${role}!`);
  };

  if (role !== "Students" && role !== "Companys") {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-start justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Placement Drive Registration
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Drive ID
            </label>
            <input
              type="text"
              name="driveid"
              value={driveid?driveid:formData.driveid}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Placement Drive ID"
              required
            />
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {role === "Students" ? "Student Name" : "Company Name"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Register as {role === "Students" ? "Student" : "Company"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default PlacementDriveRegistration;