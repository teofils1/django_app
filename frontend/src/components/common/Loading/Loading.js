// Loading component
import React from 'react';
import './Loading.css';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className="loading-container">
      <div className={`spinner spinner-${size}`}></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
