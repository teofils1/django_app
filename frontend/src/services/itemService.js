// Item-specific API calls
import api from './api';

export const itemService = {
  // Get all items
  getAll: async () => {
    try {
      const response = await api.get('/items/');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch items');
    }
  },

  // Get single item by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/items/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch item');
    }
  },

  // Create new item
  create: async (itemData) => {
    try {
      const response = await api.post('/items/', itemData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create item');
    }
  },

  // Update existing item
  update: async (id, itemData) => {
    try {
      const response = await api.put(`/items/${id}/`, itemData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update item');
    }
  },

  // Partially update item
  partialUpdate: async (id, itemData) => {
    try {
      const response = await api.patch(`/items/${id}/`, itemData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update item');
    }
  },

  // Delete item
  delete: async (id) => {
    try {
      await api.delete(`/items/${id}/`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete item');
    }
  },

  // Get API overview
  getApiOverview: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch API overview');
    }
  }
};
