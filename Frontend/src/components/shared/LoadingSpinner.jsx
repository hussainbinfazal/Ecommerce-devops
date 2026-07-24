import React from 'react';
import '../../App.css'; // Adjust the path as necessary

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading your awesome stuff...</p>
    </div>
  );
};

export default LoadingSpinner;