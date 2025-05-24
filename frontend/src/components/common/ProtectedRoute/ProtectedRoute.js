// Protected route component
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import Loading from '../Loading/Loading';
import AuthPage from '../../../pages/AuthPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return children;
};

export default ProtectedRoute;
