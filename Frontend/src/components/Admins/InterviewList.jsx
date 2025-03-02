import React, { useState } from "react";
import UpdateInterview from "./UpdateInterview";
import { motion } from "framer-motion";

const InterviewList = ({ interviews, onUpdate ,fetchInterviews}) => {
  const [selectedInterview, setSelectedInterview] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const tableVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        All Interviews
      </motion.h1>
      {selectedInterview ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedInterview(null)}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
          >
            Back to List
          </motion.button>
          <UpdateInterview
            interview={selectedInterview}
            onSubmit={(updatedData) => {
              onUpdate(updatedData);
              fetchInterviews();
              setSelectedInterview(null);
            }}
          />
        </motion.div>
      ) : (
        <motion.div 
          className="overflow-x-auto"
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="px-4 py-3 text-left">Application ID</th>
                <th className="px-4 py-3 text-left">Scheduled Date</th>
                <th className="px-4 py-3 text-left">Format</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview, index) => (
                <motion.tr
                  key={interview._id}
                  className="border-t hover:bg-gray-50"
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-4 py-3">{interview.applicationId}</td>
                  <td className="px-4 py-3">
                    {new Date(interview.scheduledDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{interview.format}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      interview.status === 'Cancelled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {interview.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedInterview(interview)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Update
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InterviewList;