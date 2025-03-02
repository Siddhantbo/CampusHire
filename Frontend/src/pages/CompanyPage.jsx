import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  RegisterCompany,
  LoginCompany,
} from "../components/Companys/RegisterCompany";
import CompanyDashboard from "../components/Companys/CompanyDashboard";
import { useAuth } from "../services/AuthProvider";
import ProtectedRoutes from "../services/ProtectedRoutes";

function CompanyPage() {
  const { role } = useAuth();
 

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginCompany />} />
        <Route path="/register" element={<RegisterCompany />} />
       
        <Route element={<ProtectedRoutes />}>
          {role === "Companys" ? (
            <Route path="/dashboard/*" element={<CompanyDashboard />} />
          ) : (
            <Route path="/dashboard/*" element={<Navigate to="/company" />} />
          )}
        </Route>
      </Routes>
    </>
  );
}

export default CompanyPage;
