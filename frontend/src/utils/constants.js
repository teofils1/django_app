// Application constants
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 10000,
};

export const ROUTES = {
  HOME: '/',
  ITEMS: '/items',
  ITEM_DETAIL: '/items/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
};

export const ITEM_FIELDS = {
  NAME: 'name',
  DESCRIPTION: 'description',
  PRICE: 'price',
  CREATED_AT: 'created_at',
};

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const MESSAGES = {
  LOADING: 'Loading...',
  ERROR_FETCH: 'Failed to fetch data',
  ERROR_CREATE: 'Failed to create item',
  ERROR_UPDATE: 'Failed to update item',
  ERROR_DELETE: 'Failed to delete item',
  SUCCESS_CREATE: 'Item created successfully',
  SUCCESS_UPDATE: 'Item updated successfully',
  SUCCESS_DELETE: 'Item deleted successfully',
  NO_ITEMS: 'No items found',
  CONFIRM_DELETE: 'Are you sure you want to delete this item?',
};

export const VALIDATION = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 200,
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 1000,
  PRICE_MIN: 0,
  PRICE_MAX: 999999.99,
};
