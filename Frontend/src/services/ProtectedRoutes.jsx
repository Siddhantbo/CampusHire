import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";

const ProtectedRoutes = () => {
  const { user, revalidateUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define an async function to validate the session
    const validateSession = async () => {
      try {
        await revalidateUser(); // Perform session validation
      } catch (error) {
        console.error("Error validating session:", error);
      } finally {
        setLoading(false); // Ensure loading state ends
      }
    };

    validateSession();
  }, []); // Dependency array left empty to avoid re-render loop

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" /> {/* Replace with a spinner component */}
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoutes;
