import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import ManagerLayout from "../Layout/ManagerLayout";
import "./UserManager.css";

const UserManager = () => {
  const { users, fetchUsers, addUser, updateUser, deleteUser } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [formState, setFormState] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser(selectedUser._id, formState);
    } else {
      addUser(formState);
    }
    resetForm();
  };

  const resetForm = () => {
    setSelectedUser(null);
    setFormState({ name: "", email: "" });
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setFormState(user);
  };

  return (
    <ManagerLayout
      listComponent={
        <ul className="user-list">
          {users.map((user) => (
            <li
              key={user._id}
              className={`user-item ${selectedUser?._id === user._id ? "user-item-selected" : ""
                }`}
              onClick={() => handleUserClick(user)}
            >
              <div className="user-info">
                <strong className="user-name">{user.name}</strong>
                <p className="user-email">{user.email}</p>
              </div>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUser(user._id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      }
      formComponent={
        <form className="user-form" onSubmit={handleFormSubmit}>
          <h2 className="form-title">{selectedUser ? "Edit User" : "Add User"}</h2>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="User Name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            required
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="User Email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              {selectedUser ? "Update User" : "Create User"}
            </button>
            <button type="button" className="clear-button" onClick={resetForm}>
              Clear
            </button>
          </div>
        </form>

      }
    />
  );
};

export default UserManager;
