import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api/axios";
import { useAuth } from "../services/AuthProvider";

const LoginPage = () => {
  const { login, role } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await API.post("/login", formData)
        .then((res) => {
          login(res.data.token, res.data.role);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              token: res.data.token,
              userid: res.data.userid,
              role: res.data.role,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              email: res.data.email,
            })
          );
          setTimeout(() => {
            if (role === "Admins") {
              toast.success("Successful login as ADMIN");
              navigate("/admin/");
            }
            if (role === "Students") {
              toast.success("Successful login as STUDENT");
              navigate("/student/");
            }
          }, 500);
        })
        .catch((error) => {
          toast.error("Login failed");
          console.error("Login error:", error);
        });
    } catch (error) {
      toast.error("Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <InputWithIcon
            iconName="mail"
            placeholder="Email Address"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <InputWithIcon
            iconName="lock"
            placeholder="Password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </motion.button>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
          >
            Forgot Password ?
          </motion.span>
        </motion.form>
        <hr className="mb-5" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/home/register"}
              className="text-blue-500 hover:text-blue-600"
            >
              Register here
            </Link>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-4"
        >
          <Link
            to="/company"
            className="text-sm text-gray-600 hover:text-blue-500 flex items-center justify-center gap-2"
          >
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
            Company Login
          </Link>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

const InputWithIcon = ({ iconName, placeholder, name, value, onChange }) => {
  const icons = {
    mail: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2.94 6.94a1 1 0 011.32-.08L10 10.586l5.74-3.726a1 1 0 111.32 1.496l-6 3.9a1 1 0 01-1.08 0l-6-3.9a1 1 0 01-.08-1.32z" />
      </svg>
    ),
    lock: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4z" />
      </svg>
    ),
  };
  return (
    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">{icons[iconName]}<input className="pl-2 w-full outline-none border-none" type={name === "password" ? "password" : "text"} name={name} value={value} onChange={onChange} placeholder={placeholder} /></div>
  );
};

export default LoginPage;
