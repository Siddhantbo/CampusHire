import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./errors/NotFound";
import CompanyPage from "./pages/CompanyPage";
import ProtectedRoutes from "./services/ProtectedRoutes";
import { useAuth } from "./services/AuthProvider";
import { Navigate } from "react-router-dom";

function App() {
  const { role } = useAuth();
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home/*" element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
          {role === "Students" ? (
            <Route path="/student/*" element={<StudentPage />} />
          ) : (
            <Route path="/student/*" element={<Navigate to="/home" />} />
          )}
          </Route>
          {role === "Admins" ? (
            <Route path="/admin/*" element={<AdminPage />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/home" />} />
          )}
          <Route path="*" element={<NotFound />} />
          <Route path="/company/*" element={<CompanyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
