import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

const AppRoutes = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/" replace />;
  
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      <Route path="/*" element={<AppRoutes />} />
    </Routes>
  </AuthProvider>
);

export default App;
