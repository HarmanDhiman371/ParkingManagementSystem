import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth'; // Update with your backend URL

const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  console.log('Registration response:', response);
  return response.data;
};

const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};

export { loginUser, registerUser, logoutUser, getCurrentUser };