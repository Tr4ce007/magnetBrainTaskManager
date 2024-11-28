import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";  // Import Router
import App from "./App";
import { TaskProvider } from "./contexts/TaskContext";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TaskProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </TaskProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
