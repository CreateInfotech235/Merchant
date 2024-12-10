import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Header.css";
import notificationIcon from "../../assets_admin/notification.png";
import profileIcon from "../../assets_admin/profile.png";
import ReactFlagsSelect from "react-flags-select";

const Header = ({ toggleThemeMode, themeMode }) => {
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // Retrieve the refresh token from local storage
      const refreshToken = localStorage.getItem('refreshTokenForAdmin');
      
      // Check if refreshToken is found
      if (!refreshToken) {
        console.error('No refresh token found in localStorage');
        return;
      }
      
      // console.log('Found refreshToken:', refreshToken);
  
      // Make the PATCH request to log out
      const response = await axios.patch(
        'https://create-4.onrender.com/admin/auth/logout',
        {
          refreshToken: refreshToken,
          personType: 'ADMIN',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
        }
      );
  
      // Handle successful logout
      if (response.status === 200 && response.data.status === 'SUCCESS') {
        console.log('Logout successful:', response.data.message);
  
        // Remove the tokens from local storage
        localStorage.removeItem('refreshTokenForAdmin');
        localStorage.removeItem('accessTokenForAdmin');
  
        // Redirect to login page after logout
        window.location.href = '/';
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  
  return (
    <div className="d-xxl-flex justify-content-xxl-between align-items-center nav-bar pb-3 d-xl-flex flex-xl-row justify-content-xl-between d-lg-flex flex-lg-row justify-content-lg-between d-md-flex flex-md-row justify-content-md-between d-sm-flex flex-sm-column justify-content-sm-start d-flex flex-column justify-content-between">
      <div className="profile">
        <div className="navbar-options my-3 align-items-center justify-content-center d-xxl-flex flex-xxl-row justify-content-xxl-evenly align-items-center d-xl-flex flex-xl-row justify-content-xl-evenly d-lg-flex flex-lg-row justify-content-lg-evenly d-md-flex flex-md-row justify-content-md-center d-sm-flex flex-sm-row justify-content-sm-evenly d-flex flex-row justify-content-evenly">
          <div className="navbar-option d-flex justify-content-center align-items-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={toggleThemeMode}
                checked={themeMode === "dark"}
              />
              <label
                className="form-check-label appearance-none"
                htmlFor="flexSwitchCheckDefault"
              ></label>
            </div>
          </div>
          <div className="navbar-option bg-white m-2 rounded-3 d-flex align-items-center">
            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
              className="accept"
            />
          </div>
          <div className="navbar-option p-2">
            <img src={notificationIcon} className="accept" alt="Notification" />
          </div>
          <div className="navbar-option p-2" onClick={handleDropdownToggle} ref={dropdownRef}>
            <img src={profileIcon} alt="Profile" />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/admin-profile" className="dropdown-item">View Profile</Link>
                <button type="button" className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
