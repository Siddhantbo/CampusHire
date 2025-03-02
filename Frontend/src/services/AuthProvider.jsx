import { useState, createContext, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // For session revalidation

  const login = (userData, userRole) => {
    if (userData && userRole) {
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userRole", userRole);
      setUser(userData);
      setRole(userRole);
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    setUser(null);
    setRole(null);
  };
  const revalidateUser = async () => {
    const savedUser = localStorage.getItem("userData");
    const savedRole = localStorage.getItem("userRole");
  
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser)); // Update state only if data is valid
      setRole(savedRole);
    } else {
      setUser(null); // Clear invalid user data
      setRole(null);
    }
  };
  

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    const savedRole = localStorage.getItem("userRole");

    // Only set state if data exists to avoid unnecessary re-renders
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole);
    }

    setLoading(false); // Complete session validation
  }, []); // Empty dependency array ensures this runs only once

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading,revalidateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
