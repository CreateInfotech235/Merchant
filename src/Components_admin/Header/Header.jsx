import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Header.css";
import notificationIcon from "../../assets_admin/bell.png";
import profileIcon from "../../assets_admin/profile.png";
import ReactFlagsSelect from "react-flags-select";

import Offcanvas from "react-bootstrap/Offcanvas";
import logoutIcon from "../../assets_admin/logo.png";
import { FaTimes, FaCheck, FaCheckDouble } from "react-icons/fa";
import { deleteNotification, getAllNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "../Api/Notification";
const Header = ({ toggleThemeMode, themeMode }) => {
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await markNotificationAsRead(notificationId);
      if (response.status) {
        setNotifications(notifications.map(notification => 
          notification._id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        ));
        setUnreadCount(prev => prev - 1);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await markAllNotificationsAsRead();
      if (response.status) {
        setNotifications(notifications.map(notification => ({
          ...notification,
          isRead: true
        })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const handleDeleteNotification = async (notificationId, e) => {
    e.stopPropagation();
    try {
      const response = await deleteNotification(notificationId);
      if (response.status) {
        setNotifications(notifications.filter(n => n._id !== notificationId));
        if (!notifications.find(n => n._id === notificationId)?.isRead) {
          setUnreadCount(prev => prev - 1);
        }
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getAllNotifications();
      // console.log(res);
      
      if (res.status) {
        setNotifications(res.data);
        setUnreadCount(res.data.filter(n => !n.isRead).length);
      }
    };
    fetchNotifications();
  }, []);


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
        // console.log('Logout successful:', response.data.message);
  
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
          {/* <div className="navbar-option d-flex justify-content-center align-items-center">
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
          </div> */}
          {/* <div className="navbar-option bg-white m-2 rounded-3 d-flex align-items-center">
            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
              className="accept"
            />
          </div> */}
            <div className="navbar-option p-2me-2 position-relative cursor-pointer" onClick={handleShow}>
            <img src={notificationIcon} className="accept" alt="Notification Bell" />
            {unreadCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {unreadCount}
              </span>
            )}
          </div>
        <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "400px" }}>
            <Offcanvas.Header closeButton className="border-bottom bg-light d-flex justify-content-between">
              <Offcanvas.Title className="fw-bold text-dark">
                Notifications
              </Offcanvas.Title>
              {unreadCount > 0 && (
                <button 
                  className="btn btn-link text-primary"
                  onClick={handleMarkAllAsRead}
                >
                  <FaCheckDouble /> Mark all as read
                </button>
              )}
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`notification-item p-3 hover-bg-light border-bottom d-flex align-items-start ${
                    !notification.isRead ? 'bg-light' : ''
                  }`}
                  style={{
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                    borderLeft: notification.isRead ? "none" : "4px solid #0d6efd",
                  }}
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  <div className="flex-grow-1">
                    <h6 className="mb-1 text-primary fw-semibold d-flex align-items-center">
                      {notification.title}
                      {!notification.isRead && (
                        <span className="ms-2 badge bg-primary">New</span>
                      )}
                    </h6>
                    <p className="mb-1 text-secondary small">
                      {notification.message}
                    </p>
                    <small className="text-muted">
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </div>
                  <div className="d-flex flex-column">
                    <button
                      className="btn btn-sm text-danger p-0 mb-2"
                      onClick={(e) => handleDeleteNotification(notification._id, e)}
                      title="Delete notification"
                    >
                      <FaTimes />
                    </button>
                    {!notification.isRead && (
                      <button
                        className="btn btn-sm text-primary p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification._id);
                        }}
                        title="Mark as read"
                      >
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <img
                    src={logoutIcon}
                    alt="No notifications"
                    className="mb-3"
                    style={{ opacity: 0.6 }}
                  />
                  <p>No notifications yet</p>
                </div>
              )}
            </Offcanvas.Body>
          </Offcanvas>
          <div className="navbar-option p-2 cursor-pointer" onClick={handleDropdownToggle} ref={dropdownRef}>
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
