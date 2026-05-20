import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
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
