import axios from 'axios';
import { store } from '../store';

// Create axios instance with default config
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = store.getState().auth.refreshToken;
        if (refreshToken) {
          const response = await api.post('/auth/refresh', { refreshToken });
          const { token } = response.data;
          
          store.dispatch({ type: 'auth/tokenRefreshed', payload: token });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        store.dispatch({ type: 'auth/logout' });
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials: { username: string; password: string }) => 
    api.post('/auth/login', credentials),
  
  logout: () => 
    api.post('/auth/logout'),
  
  refreshToken: (refreshToken: string) => 
    api.post('/auth/refresh', { refreshToken })
};

export const callsAPI = {
  getLeads: () => 
    api.get('/calls/leads'),
  
  updateCallState: (callId: string, state: string) => 
    api.put(`/calls/${callId}/state`, { state }),
  
  submitDisposition: (callId: string, disposition: any) => 
    api.post(`/calls/${callId}/disposition`, disposition)
};

export const agentAPI = {
  getProfile: () => 
    api.get('/agent/profile'),
  
  updateProfile: (data: any) => 
    api.put('/agent/profile', data),
  
  getTimesheet: (startDate: string, endDate: string) => 
    api.get('/agent/timesheet', { params: { startDate, endDate } })
};

export const adminAPI = {
  getCampaigns: () => 
    api.get('/admin/campaigns'),
  
  createCampaign: (campaign: any) => 
    api.post('/admin/campaigns', campaign),
  
  getAgents: () => 
    api.get('/admin/agents'),
  
  getReports: (params: any) => 
    api.get('/admin/reports', { params })
};