import axios from 'axios';

const API_URL = 'http://localhost:5000/api/parking'; // Update with your backend URL

const getDashboardData = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

const getParkingSpots = async () => {
  const response = await axios.get(`${API_URL}/spots`);
  return response.data;
};

const addParkingSpot = async (spotData) => {
  const response = await axios.post(`${API_URL}/spots`, spotData);
  return response.data;
};

const updateParkingSpot = async (id, spotData) => {
  const response = await axios.put(`${API_URL}/spots/${id}`, spotData);
  return response.data;
};

const deleteParkingSpot = async (id) => {
  const response = await axios.delete(`${API_URL}/spots/${id}`);
  return response.data;
};

const getParkingHistory = async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};

export {
  getDashboardData,
  getParkingSpots,
  addParkingSpot,
  updateParkingSpot,
  deleteParkingSpot,
  getParkingHistory,
};