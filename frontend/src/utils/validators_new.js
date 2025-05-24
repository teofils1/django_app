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
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return null;
};

export const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (username.length > 30) {
    return 'Username must be less than 30 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
};

export const validateLoginForm = (formData) => {
  const errors = {};

  const usernameError = validateUsername(formData.username);
  if (usernameError) errors.username = usernameError;

  const passwordError = validateRequired(formData.password, 'Password');
  if (passwordError) errors.password = passwordError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegisterForm = (formData) => {
  const errors = {};

  const usernameError = validateUsername(formData.username);
  if (usernameError) errors.username = usernameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const firstNameError = validateRequired(formData.first_name, 'First name');
  if (firstNameError) errors.first_name = firstNameError;

  const lastNameError = validateRequired(formData.last_name, 'Last name');
  if (lastNameError) errors.last_name = lastNameError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  if (!formData.password_confirm) {
    errors.password_confirm = 'Please confirm your password';
  } else if (formData.password !== formData.password_confirm) {
    errors.password_confirm = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
