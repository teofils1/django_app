// Header component with authentication
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../Button/Button';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <h1>Item Manager</h1>
        </div>
        
        {isAuthenticated && user && (
          <div className="header-user">
            <div className="user-info">
              <span className="user-name">
                Welcome, {user.first_name || user.username}!
              </span>
              <span className="user-email">{user.email}</span>
            </div>
            <Button 
              variant="secondary" 
              size="small" 
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
