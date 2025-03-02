import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeModernIcon,
  ChartBarSquareIcon,
  FolderOpenIcon,
  ClipboardDocumentListIcon,
  ChevronDownIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" },
  };

  const linkVariants = {
    expanded: { opacity: 1, display: "block", transition: { duration: 0.3 } },
    collapsed: { opacity: 0, display: "none", transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    open: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
    closed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="">
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        className="bg-gray-900 text-white h-[51rem] overflow-hidden shadow-lg "
      >
        {/* Sidebar Header */}
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-800"
          onClick={toggleExpand}
        >
          <span className="text-xl font-bold">{isExpanded ? "Menu" : "☰"}</span>
        </div>

        <ul className="mt-4 space-y-2">
          <li className="px-4 py-2">
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-gray-800 px-2 py-2 rounded"
              onClick={() => toggleDropdown("home")}
            >
              <div className="flex items-center">
                <HomeModernIcon className="h-6 w-6" />
                <motion.span
                  variants={linkVariants}
                  animate={isExpanded ? "expanded" : "collapsed"}
                  className="ml-4"
                >
                  Students Dashboard
                </motion.span>
              </div>
              {isExpanded && (
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    activeDropdown === "home" ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
            <AnimatePresence>
              {activeDropdown === "home" && isExpanded && (
                <motion.ul
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="ml-8 mt-2 space-y-5 flex flex-col"
                >
                  <Link to="/student/student-registration-form">
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                      Student Registration
                    </li>
                  </Link>
                  <Link to="/student/jobslistings">
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                      Job Listings
                    </li>
                  </Link>
                  <Link to="/student/applications">
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                      Applications
                    </li>
                  </Link>
                  <Link to="/student/StudentApplicationDetails">
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                    Application overviews
                    </li>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li className="px-4 py-2">
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-gray-800 px-2 py-2 rounded"
              onClick={() => toggleDropdown("dashboard")}
            >
              <div className="flex items-center">
                <ChartBarSquareIcon className="h-6 w-6" />
                <motion.span
                  variants={linkVariants}
                  animate={isExpanded ? "expanded" : "collapsed"}
                  className="ml-4"
                >
                  Drive Management
                </motion.span>
              </div>
              {isExpanded && (
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    activeDropdown === "dashboard" ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
            <AnimatePresence>
              {activeDropdown === "dashboard" && isExpanded && (
                <motion.ul
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="ml-8 mt-2 space-y-1 flex flex-col gap-4"
                >
                 
                  <Link to="/student/PlacementDriveList">
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                      PlacementDriveList
                    </li>
                  </Link>
                  <Link to="/student/PlacementDriveRegistration">
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                      PlacementDriveRegistration
                    </li>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          
        </ul>
      </motion.div>
    </div>
  );
};

export default Sidebar;