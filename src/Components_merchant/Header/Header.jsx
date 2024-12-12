import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import ReactFlagsSelect from "react-flags-select";
import notificationIcon from "../../assets_mercchant/bell.png";
import profileIcon from "../../assets_mercchant/profile.png";
import logoutIcon from "../../assets_mercchant/logo1.png";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaTimes, FaCheck, FaCheckDouble } from "react-icons/fa";
import { deleteNotification, getAllNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "../Api/Notification";

const Header = ({ themeMode, toggleThemeMode, selected, setSelected }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const profileIconRef = useRef(null);

  const handleThemeToggle = () => {
    toggleThemeMode();
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("merchantId");
    localStorage.removeItem("userData");
    setIsProfileMenuOpen(false);
    navigate("/");
    window.location.reload();
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
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigateToProfile = () => {
    setIsProfileMenuOpen(false);
    navigate("/profile");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getAllNotifications();
      if (res.status) {
        setNotifications(res.data);
        setUnreadCount(res.data.filter(n => !n.isRead).length);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center nav-bar pb-xxl-3 pb-xl-3 pb-lg-3 pb-md-3 pb-sm-3 pb-0">
      <div className="profile">
        <div className="navbar-options my-3 d-flex align-items-center">
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

          <div className="navbar-option p-2 position-relative">
            <img
              src={profileIcon}
              alt="User Profile"
              onClick={handleProfileClick}
              className="profile-icon"
              ref={profileIconRef}
            />

            {isProfileMenuOpen && (
              <div
                className="profile-menu shadow position-absolute bg-white"
                ref={profileMenuRef}
              >
                <ul className="list-unstyled m-0">
                  <li className="p-2" onClick={handleNavigateToProfile}>
                    Profile
                  </li>
                  <li className="p-2" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
