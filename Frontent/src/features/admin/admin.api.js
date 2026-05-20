import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getAdminOverview = async () => {
  try {
    const { data } = await api.get('/admin/overview');
    return data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch admin overview';
    throw new Error(message);
  }
};
