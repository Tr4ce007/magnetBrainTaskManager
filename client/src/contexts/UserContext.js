import React, { createContext, useState, useContext } from "react";
import * as api from "../api/index.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Fetch initial user data
  const fetchUsers = async () => {
    try {
      const { data } = await api.fetchUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add a new user
  const addUser = async (user) => {
    try {
      const { data } = await api.addUser(user);
      setUsers([...users, { _id: data._id, ...user }]);
    } catch (error) {
      console.log(error);
    }
  };

  // Update an existing user
  const updateUser = async (id, updatedUser) => {
    try {
      await api.updateUser(id, updatedUser);
      setUsers(users.map((user) => (user._id === id ? { ...user, ...updatedUser } : user)));
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await api.deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ users, fetchUsers, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
