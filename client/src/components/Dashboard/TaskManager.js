import React, { useState, useEffect } from "react";
import { useTask } from "../../contexts/TaskContext";
import { useUser } from "../../contexts/UserContext";
import ManagerLayout from "../Layout/ManagerLayout";
import "./TaskManager.css";

const priorityColors = {
  high: "#ff6961",
  medium: "#fdfd96",
  low: "#77dd77",
};

const TaskManager = () => {
  const { tasks, fetchTasks, addTask, updateTask, deleteTask } = useTask();
  const { fetchUsers, users } = useUser();
  const [selectedTask, setSelectedTask] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    priority: "medium",
    assignedTo: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    handlePageClick({ selected: 0 });
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      updateTask(selectedTask._id, formState);
    } else {
      addTask(formState);
    }
    resetForm();
  };

  const resetForm = () => {
    setSelectedTask(null);
    setFormState({ title: "", description: "", dueDate: "", status: "pending", priority: "low", assignedTo: "" });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setFormState(task);
  };

  return (
    <ManagerLayout
      listComponent={
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`task-item ${selectedTask?.id === task.id ? "task-item-selected" : ""
                }`}
              style={{ backgroundColor: priorityColors[task.priority] }}
              onClick={() => handleTaskClick(task)}
            >
              <strong className="task-title">{task.title}</strong>
              <p className="task-details">Description: {task.description}</p>
              <p className="task-details">Status: {task.status}</p>
              <p className="task-details">Due: {task.dueDate}</p>
              <p className="task-details">Assigned to: {task.assignedTo}</p>
              <p className="task-button"><button className="task-delete-button" onClick={() => deleteTask(task._id)}>Delete</button></p>
            </li>
          ))}
        </ul>

      }
      formComponent={
        <form onSubmit={handleFormSubmit} className="task-form">
          <h2 className="task-form-title">{selectedTask ? "Edit Task" : "Add Task"}</h2>
          <input
            type="text"
            name="title"
            className="task-form-input"
            placeholder="Task Title"
            value={formState.title}
            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
            required
          />
          <textarea
            name="description"
            className="task-form-textarea"
            placeholder="Task Description"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            required
          />
          <input
            type="date"
            name="dueDate"
            className="task-form-input"
            value={formState.dueDate}
            onChange={(e) => setFormState({ ...formState, dueDate: e.target.value })}
            required
          />
          <input
            type="text"
            name="status"
            className="task-form-input"
            value={formState.status}
            onChange={(e) => setFormState({ ...formState, status: e.target.value })}
            required
          />
          <select
            name="priority"
            className="task-form-select"
            value={formState.priority}
            onChange={(e) => setFormState({ ...formState, priority: e.target.value })}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            name="assignedTo"
            className="task-form-select"
            value={formState.assignedTo}
            onChange={(e) => setFormState({ ...formState, assignedTo: e.target.value })}
          >
            <option value="">Assign to</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <div className="task-form-buttons">
            <button type="submit" className="task-form-button task-form-submit">
              {selectedTask ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              className="task-form-button task-form-clear"
              onClick={resetForm}
            >
              Clear
            </button>
          </div>
        </form>

      }
      paginationComponent={
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      }
    />
  );
};

export default TaskManager;
