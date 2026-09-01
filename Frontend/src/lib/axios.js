import axios from 'axios';
import { toast } from 'react-toastify';
import { removeStorageItem } from './helper';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🛡️ Global 401/403 handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      toast.error('Session expired or unauthorized. Please log in again.');
      if (typeof window !== 'undefined') {
        removeStorageItem('token');
        window.location.href = '/login'; // or use navigate if inside React
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
