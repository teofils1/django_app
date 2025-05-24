// Form validation functions
import { VALIDATION } from './constants';

export const validateItemForm = (formData) => {
  const errors = {};

  // Validate name
  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (formData.name.length < VALIDATION.NAME_MIN_LENGTH) {
    errors.name = `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  } else if (formData.name.length > VALIDATION.NAME_MAX_LENGTH) {
    errors.name = `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`;
  }

  // Validate description
  if (!formData.description || formData.description.trim().length === 0) {
    errors.description = 'Description is required';
  } else if (formData.description.length < VALIDATION.DESCRIPTION_MIN_LENGTH) {
    errors.description = `Description must be at least ${VALIDATION.DESCRIPTION_MIN_LENGTH} characters`;
  } else if (formData.description.length > VALIDATION.DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description must be less than ${VALIDATION.DESCRIPTION_MAX_LENGTH} characters`;
  }

  // Validate price
  if (!formData.price) {
    errors.price = 'Price is required';
  } else {
    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      errors.price = 'Price must be a valid number';
    } else if (price < VALIDATION.PRICE_MIN) {
      errors.price = `Price must be at least ${VALIDATION.PRICE_MIN}`;
    } else if (price > VALIDATION.PRICE_MAX) {
      errors.price = `Price must be less than ${VALIDATION.PRICE_MAX}`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validateMinLength = (value, minLength, fieldName) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  return null;
};
