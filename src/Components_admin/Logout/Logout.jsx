import React from 'react';
import axios from 'axios';
import './Logout.css'; // Add CSS file for styling if needed

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken'); // Assume the token is stored in local storage
      if (!refreshToken) {
        console.error('No refresh token found');
        return;
      }

      const response = await axios.patch(
        'https://create-4.onrender.com/admin/auth/logout',
        {
          refreshToken: refreshToken,
          personType: 'ADMIN'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          }
        }
      );

      if (response.status === 200) {
        // Handle successful logout, e.g., redirect to login page
        localStorage.removeItem('refreshToken'); // Remove token
        window.location.href = '/'; // Redirect to login page
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
