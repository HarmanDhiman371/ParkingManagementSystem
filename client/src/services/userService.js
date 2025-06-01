import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Update with your backend URL

const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};

const addUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData);
  return response.data;
};

const changePassword = async (passwordData) => {
  const response = await axios.put(`${API_URL}/password`, passwordData);
  return response.data;
};

export {
  getUsers,
  getCurrentUser,
  addUser,
  updateUser,
  deleteUser,
  updateProfile,
  changePassword,
};