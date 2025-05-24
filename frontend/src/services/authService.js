// Authentication service for handling user auth
import api from './api';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  LOGOUT: '/auth/logout/',
  PROFILE: '/auth/profile/',
  CHANGE_PASSWORD: '/auth/change-password/',
};

const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  async logout() {
    try {
      const token = this.getToken();
      if (token) {
        await api.post(AUTH_ENDPOINTS.LOGOUT);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get(AUTH_ENDPOINTS.PROFILE);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.put(AUTH_ENDPOINTS.CHANGE_PASSWORD, passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get stored token
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Get stored user data
  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  },

  // Clear authentication data
  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};
