// Authentication page component
import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm/LoginForm';
import RegisterForm from '../components/auth/RegisterForm/RegisterForm';
import '../components/auth/LoginForm/AuthForm.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div className="auth-container">
      {isLogin ? (
        <LoginForm onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthPage;
