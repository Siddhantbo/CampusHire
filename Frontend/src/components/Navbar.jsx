import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../services/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = ({ name }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border shadow-lg overflow-hidden p-2 bg-white border-stone-200 shadow-stone-950/5 mx-auto w-full max-w-full"
    >
      <div className="flex items-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#"
          className="font-sans antialiased text-lg text-current ml-2 mr-2 block py-1 font-semibold"
        >
          {name?"Welcome : "+name : "Welcome"}
        </motion.a>
        <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
        <div className="hidden lg:block">
          <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
            <li>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="font-sans antialiased text-lg text-current flex items-center gap-x-2 p-1 hover:text-primary"
              >
                <svg
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Account
              </motion.a>
            </li>
          </ul>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={()=>{
            logout();
            navigate("/home");
          }} 
          className="items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-lg py-1.5 px-3 shadow-sm hover:shadow bg-red-600 hover:bg-red-500 relative bg-gradient-to-b from-red-500 to-red-600 border-red-700 text-white rounded-lg hover:bg-gradient-to-b hover:from-red-600 hover:to-red-600 hover:border-red-700 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased hidden lg:ml-auto lg:inline-block">
          Logout
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none ml-auto grid lg:hidden"
        >
          <svg
            width="1.5em"
            height="1.5em"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className="h-5 w-5"
          >
            <path
              d="M3 5H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;