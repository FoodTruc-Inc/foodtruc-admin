import axios from 'axios';

export const getFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(key);
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getFromLocalStorage('token')}`,
    'x-business': 'true',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
