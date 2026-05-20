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

const handleApiError = (error, fallbackMessage) => {
  const message = error.response?.data?.error || error.response?.data?.message || fallbackMessage;
  throw new Error(message);
};

export const generateInterviewReport = async ({ jobDescription, selfDescription, resume }) => {
  try {
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('selfDescription', selfDescription);
    formData.append('jobDescription', jobDescription);

    const { data } = await api.post('/interview', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to generate interview report');
  }
};

export const getInterviewReportById = async (interviewId) => {
  try {
    const { data } = await api.get(`/interview/${interviewId}`);
    return data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch interview report');
  }
};

export const getAllInterviewReports = async () => {
  try {
    const { data } = await api.get('/interview');
    return data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch interview history');
  }
};
