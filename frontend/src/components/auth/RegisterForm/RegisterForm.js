// Register form component
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../common/Button/Button';
import '../LoginForm/AuthForm.css';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last name is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.password_confirm) {
      errors.password_confirm = 'Password confirmation is required';
    } else if (formData.password !== formData.password_confirm) {
      errors.password_confirm = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form-header">
        <h2>Sign Up</h2>
        <p>Create a new account to get started.</p>
      </div>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form-body">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="first_name"
              className={`form-control ${formErrors.first_name ? 'is-invalid' : ''}`}
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleInputChange}
              disabled={loading}
              required
            />
            {formErrors.first_name && <span className="form-error">{formErrors.first_name}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              className={`form-control ${formErrors.last_name ? 'is-invalid' : ''}`}
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleInputChange}
              disabled={loading}
              required
            />
            {formErrors.last_name && <span className="form-error">{formErrors.last_name}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          {formErrors.username && <span className="form-error">{formErrors.username}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          {formErrors.email && <span className="form-error">{formErrors.email}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
            placeholder="Choose a password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          {formErrors.password && <span className="form-error">{formErrors.password}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="password_confirm"
            className={`form-control ${formErrors.password_confirm ? 'is-invalid' : ''}`}
            placeholder="Confirm your password"
            value={formData.password_confirm}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          {formErrors.password_confirm && <span className="form-error">{formErrors.password_confirm}</span>}
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          size="large" 
          className="auth-submit-btn"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
      
      <div className="auth-form-footer">
        <p>
          Already have an account?{' '}
          <button 
            type="button" 
            className="auth-link" 
            onClick={onSwitchToLogin}
            disabled={loading}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
