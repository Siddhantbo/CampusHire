import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundimage from "../../assets/wp4799358.jpg"
import { useAuth } from "../../services/AuthProvider";



const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (!companyName || !email || !password || !phone || !contactPerson || !industry || !location) {
      toast.error("Please fill in all fields.");
      return;
    }
    e.preventDefault();
    try {
      const response = await API.post("/company/register", {
        companyName,
        email,
        password,
        phone,
        contactPerson,
        industry,
        location,
      });
      if (response.status === 201) {
        toast.success("Registration successful. Please log in.");
        localStorage.setItem("userData", response.data);
        setTimeout(() => {
          navigate("/company/");
        }, 3000);
      } else {
        toast.error("Company already registered. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="p-8 rounded-lg shadow-md bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-blue-800 text-2xl font-bold mb-6 text-center">
          Company Registration
        </h2>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex items-center mb-4 col-span-2">
            <UserGroupIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="companyName" className="text-gray-800">
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <EnvelopeIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="email" className="text-gray-800">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <LockClosedIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="password" className="text-gray-800">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <PhoneIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="phone" className="text-gray-800">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <UserIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="contactPerson" className="text-gray-800">
              Contact Person:
            </label>
            <input
              type="text"
              id="contactPerson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <BuildingOfficeIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="industry" className="text-gray-800">
              Industry:
            </label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <MapPinIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="location" className="text-gray-800">
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:opacity-90"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button
            onClick={() => navigate("/company")}
            className="text-blue-500 hover:underline"
          >
            Login here
          </button>
        </div>
       
      </motion.div>
      <ToastContainer />
    </motion.div>
  );
};

const LoginCompany = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const  { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Login logic here
    try {
      await API.post("/company/login", { email, password })
        .then((response) => {
        
          login(response.data.token, response.data.role);
          localStorage.setItem(
            "companyData",
            JSON.stringify({
              token: response.data.token,
              companyId: response.data.companyId,
              role: response.data.role,
              companyName: response.data.companyName,
              email: response.data.email,
            })
          );
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/company/dashboard");
          }, 1000);
        })
        .catch((error) => {
          console.error("Login error:", error);
          toast.error("Login failed. Please check your credentials.");
        });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="p-8 rounded-lg shadow-md bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-blue-800 text-2xl font-bold mb-6 text-center">
          Company Login
        </h2>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex items-center mb-4 col-span-2">
            <EnvelopeIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="email" className="text-gray-800">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center mb-4 col-span-2">
            <LockClosedIcon className="mr-2 text-blue-500 h-6 w-6" />
            <label htmlFor="password" className="text-gray-800">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:opacity-90"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={() => navigate("/company/register")}
            className="text-blue-500 hover:underline"
          >
            Register here
          </button>
        </div>
      </motion.div>
      <div className="mt-4 text-center gap-1 hover:text-blue-500 bg-white p-1 rounded-md w-[23rem] hover:bg-slate-50 shadow-lg flex justify-center item-center">
      <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
          <button
            onClick={() => navigate("/home")}
            className="text-blue-500 "
          >
            Student & Admin Login
          </button>
        </div>
      <ToastContainer />
    </motion.div>
  );
};

export { RegisterCompany, LoginCompany };