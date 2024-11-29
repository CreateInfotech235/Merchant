import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import ReactFlagsSelect from "react-flags-select";
import notificationIcon from "../../assets_mercchant/notification.png";
import profileIcon from "../../assets_mercchant/profile.png";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaTimes } from "react-icons/fa";

const Header = ({ themeMode, toggleThemeMode, selected, setSelected }) => {
  // State to control profile menu visibility
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const profileIconRef = useRef(null);

  const handleThemeToggle = () => {
    toggleThemeMode();
  };

  const handleProfileClick = () => {
    // Toggle profile dropdown menu
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing tokens, navigating to login)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("merchantId");
    setIsProfileMenuOpen(false); // Close the profile menu

    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if the click is outside the profile menu or icon
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
    setIsProfileMenuOpen(false); // Close the profile menu
    navigate("/profile");
  };

  // Sample notifications
  const notifications = [
    { id: 1, message: "Your order has been shipped!" },
    { id: 2, message: "New update available for your app." },
    { id: 3, message: "You have a new message from support." },
  ];

  return (
    <div className="d-flex justify-content-between align-items-center nav-bar pb-xxl-3 pb-xl-3 pb-lg-3 pb-md-3 pb-sm-3 pb-0">
      <div className="profile">
        <div className="navbar-options my-3 d-flex align-items-center">
          <div
            type="button"
            className="navbar-option p-2me-2"
            variant="primary"
            onClick={handleShow}
          >
            <img
              src={notificationIcon}
              className="accept"
              alt="Notification Bell"
            />
          </div>

          <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Notifications</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="notification-item border my-1 p-2 rounded d-flex justify-content-between align-items-center"
                >
                  <p className="mb-0">{notification.message}</p>
                  <button
                    className="btn btn-link p-0"
                    // onClick={() => handleRemoveNotification(notification.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
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

            {/* Profile dropdown menu */}
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
