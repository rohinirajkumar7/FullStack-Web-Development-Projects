import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const AI_BASE = import.meta.env.VITE_AI_URL || 'http://localhost:8001';

// ✅ FIXED: Increased timeout from 15000 to 60000
export const axiosInstance = axios.create({ baseURL: API_BASE, timeout: 60000 });

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (payload) => axiosInstance.post('/auth/register', payload),
  login: (payload) => axiosInstance.post('/auth/login', payload)
};

export const expenseAPI = {
  list: () => axiosInstance.get('/expenses'),
  create: (formData) => axiosInstance.post('/expenses', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  // ✅ NEW APIs
  update: (id, data) => axiosInstance.put(`/expenses/${id}`, data),
  delete: (id) => axiosInstance.delete(`/expenses/${id}`)
};

const aiAxios = axios.create({ baseURL: AI_BASE, timeout: 30000 });

export const aiAPI = {
  parseReceipt: (formData) => aiAxios.post('/parse_receipt', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
};

export default axiosInstance;
