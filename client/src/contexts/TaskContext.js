import React, { createContext, useState, useContext } from "react";
import * as api from "../api/index.js";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.fetchTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    try {
      const { data } = await api.addTask(task);
      setTasks([...tasks, { _id: data._id, ...task }]);
    } catch (error) {
      console.log(error);  
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await api.updateTask(id, updatedTask);
      setTasks(tasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task)));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;
  
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
