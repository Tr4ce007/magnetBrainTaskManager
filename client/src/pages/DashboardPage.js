import React, { useState } from "react";
import TaskManager from "../components/Dashboard/TaskManager";
import UserManager from "../components/Dashboard/UserManager";

import "./Dashboard.css";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
        <button className={activeTab === "tasks" ? "selectedButton" : "managerButtons"} onClick={() => setActiveTab("tasks")}>Tasks Dashboard</button>
        <button className={activeTab === "users" ? "selectedButton" : "managerButtons"} onClick={() => setActiveTab("users")}>Users Dashboard</button>
      </header>
      {activeTab === "tasks" ? <TaskManager /> : <UserManager />}
    </div>
  );
};

export default DashboardPage;
