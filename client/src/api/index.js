import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchUsers = () => API.get('/users');
export const fetchTasks = () => API.get('/tasks');
export const fetchTaskCount = () => API.get('/tasks/count');
export const fetchTasksByPage = (page) => API.get(`/tasks/page/${page}`);

export const logIn = (formData) => API.post('/auth/signin', formData);
export const addTask = (task) => API.post('/tasks', task);
export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const addUser = (user) => API.post('/users', user);
export const updateUser = (id, updatedUser) => API.put(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);