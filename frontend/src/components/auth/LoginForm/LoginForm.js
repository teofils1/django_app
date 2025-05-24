// Login form component
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../common/Button/Button';
import './AuthForm.css';

const LoginForm = ({ onSwitchToRegister }) => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
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
      await login(formData);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form-header">
        <h2>Sign In</h2>
        <p>Welcome back! Please sign in to your account.</p>
      </div>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form-body">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          {formErrors.username && <span className="form-error">{formErrors.username}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          {formErrors.password && <span className="form-error">{formErrors.password}</span>}
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          size="large" 
          className="auth-submit-btn"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="auth-form-footer">
        <p>
          Don't have an account?{' '}
          <button 
            type="button" 
            className="auth-link" 
            onClick={onSwitchToRegister}
            disabled={loading}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
