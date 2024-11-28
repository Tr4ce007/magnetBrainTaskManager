import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as api from '../api/index.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const { data } = await api.logIn({ username, password });
      setUser({ name: username, token: data.password });
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
