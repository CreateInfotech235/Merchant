import React, { useState } from "react";
import "./Sidebar.css";
import Button from "@mui/material/Button";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets_admin/logo.png";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation(); // Hook to get current location (URL)

  const toggleSubmenu = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Function to determine if a submenu item should be active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div
        className={`col-xxl-2 col-xl-2 p-3 overflow-y-scroll position-fixed h-100 ${
          isSidebarVisible ? "sidebar visible" : "sidebar"
        }`}
      >
        <div className="col-xs-3 mt-5 mb-3 ms-3 me-3">
          <Link to={"/"} className="d-flex align-items-center text-white">
            <img src={logo} className="logo" alt="logo" />
            <span className="ml-2 fs-4 ps-3">Create Courier</span>
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/dashboard" className="link">
              <Button
                className={`w-100 ${isActive("/dashboard") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/dashboard.svg"} alt="dashboard" />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 1 ? "active" : ""}`}
              onClick={() => toggleSubmenu(1)}
            >
              <span className="icon">
                <img src={"/src/assets/subcription.svg"} alt="subscription" />
              </span>
              Subscription
              <span className={`arrow ${activeTab === 1 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 1 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/subscribed-merchant") ? "active" : ""}>
                    <Link to="/subscribed-merchant">Subscribed Merchant</Link>
                  </li>
                  <li className={isActive("/unsubscribed-merchant") ? "active" : ""}>
                    <Link to="/unsubscribed-merchant">Unsubscribed Merchant</Link>
                  </li>
                  <li className={isActive("/demo-used-merchant") ? "active" : ""}>
                    <Link to="/demo-used-merchant">Demo Used Merchant</Link>
                  </li>
                  <li className={isActive("/pending-merchant-document") ? "active" : ""}>
                    <Link to="/pending-merchant-document">unverified Merchants</Link>
                  </li>
                  <li className={isActive("/documents-required") ? "active" : ""}>
                    <Link to="/documents-required">Documents Required</Link>
                  </li>
                  <li className={isActive("/subscription-required") ? "active" : ""}>
                    <Link to="/subscription-required">Subscription Plan</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 4 ? "active" : ""}`}
              onClick={() => toggleSubmenu(4)}
            >
              <span className="icon">
                <img src={"/src/assets/order.svg"} alt="order" />
              </span>
              Order
              <span className={`arrow ${activeTab === 4 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 4 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/create-order") ? "active" : ""}>
                    <Link to="/create-order">Create Order</Link>
                  </li>
                  {/* <li className={isActive("/schedule-order") ? "active" : ""}>
                    <Link to="/schedule-order">Schedule Order</Link>
                  </li> */}
                  <li className={isActive("/all-order") ? "active" : ""}>
                    <Link to="/all-order">All Orders</Link>
                  </li>
                  <li className={isActive("/order-location") ? "active" : ""}>
                    <Link to="/order-location">Orders Location</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/merchant" className="link">
              <Button
                className={`w-100 ${isActive("/merchant") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/merchent.svg"} alt="merchant" />
                </span>
                Merchants
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 6 ? "active" : ""}`}
              onClick={() => toggleSubmenu(6)}
            >
              <span className="icon">
                <img src={"/src/assets/delivery.svg"} alt="delivery" />
              </span>
              Delivery Man
              <span className={`arrow ${activeTab === 6 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 6 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/delivery-man") ? "active" : ""}>
                    <Link to="/delivery-man">Delivery Man</Link>
                  </li>
                  <li className={isActive("/pending-delivery-man") ? "active" : ""}>
                    <Link to="/pending-delivery-man">Pending Delivery Man</Link>
                  </li>
                  <li className={isActive("/document") ? "active" : ""}>
                    <Link to="/document">Documents Required</Link>
                  </li>
                  <li className={isActive("/delivery-man-destination") ? "active" : ""}>
                    <Link to="/delivery-man-destination">Delivery Man Locations</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          
          <li>
            <Link to="/country" className="link">
              <Button
                className={`w-100 ${isActive("/country") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/country.svg"} alt="country" />
                </span>
                Country
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/all-customer" className="link">
              <Button
                className={`w-100 ${isActive("/all-customer") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/country.svg"} alt="country" />
                </span>
                Customer
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/city" className="link">
              <Button
                className={`w-100 ${isActive("/city") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/city.svg"} alt="city" />
                </span>
                City
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 7 ? "active" : ""}`}
              onClick={() => toggleSubmenu(7)}
            >
              <span className="icon">
                <img src={"/src/assets/setting.svg"} alt="settings" />
              </span>
              Settings
              <span className={`arrow ${activeTab === 7 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 7 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/vehicle") ? "active" : ""}>
                    <Link to="/vehicle">Vehicle</Link>
                  </li>
                  <li className={isActive("/add-extra-charges") ? "active" : ""}>
                    <Link to="/extra-charge">Extra Charges</Link>
                  </li>
                  <li className={isActive("/parcel-type") ? "active" : ""}>
                    <Link to="/parcel-type">Parcel Type</Link>
                  </li>
                  <li className={isActive("/payment-gateway") ? "active" : ""}>
                    <Link to="/payment-gateway">Payment Gateway</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 8 ? "active" : ""}`}
              onClick={() => toggleSubmenu(8)}
            >
              <span className="icon">
                <img src={"/src/assets/withdraw.svg"} alt="withdraw" />
              </span>
              Withdraw Request
              <span className={`arrow ${activeTab === 8 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 8 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/pending") ? "active" : ""}>
                    <Link to="/pending">Pending</Link>
                  </li>
                  <li className={isActive("/approved") ? "active" : ""}>
                    <Link to="/approved">Approved</Link>
                  </li>
                  <li className={isActive("/rejected") ? "active" : ""}>
                    <Link to="/rejected">Rejected</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 9 ? "active" : ""}`}
              onClick={() => toggleSubmenu(9)}
            >
              <span className="icon">
                <img src={"/src/assets/deposite.svg"} alt="deposit" />
              </span>
              Deposit
              <span className={`arrow ${activeTab === 9 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 9 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/deposite-delivery-man") ? "active" : ""}>
                    <Link to="/deposite-delivery-man">Delivery Man</Link>
                  </li>
                  <li className={isActive("/deposite-merchant") ? "active" : ""}>
                    <Link to="/deposite-merchant">Merchant</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/invoice-setting" className="link">
              <Button
                className={`w-100 ${isActive("/invoice-setting") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/invoice1.svg"} alt="invoice setting" />
                </span>
                Invoice Setting
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 11 ? "active" : ""}`}
              onClick={() => toggleSubmenu(11)}
            >
              <span className="icon">
                <img src={"/src/assets/setting.svg"} alt="app setting" />
              </span>
              App Setting
              <span className={`arrow ${activeTab === 11 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 11 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/notification-setting") ? "active" : ""}>
                    <Link to="/notification-setting">Notification Setting</Link>
                  </li>
                  <li className={isActive("/order-setting") ? "active" : ""}>
                    <Link to="/order-setting">Order Setting</Link>
                  </li>
                  <li className={isActive("/currency-setting") ? "active" : ""}>
                    <Link to="/currency-setting">Currency Setting</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 12 ? "active" : ""}`}
              onClick={() => toggleSubmenu(12)}
            >
              <span className="icon">
                <img src={"/src/assets/website.svg"} alt="website section" />
              </span>
              Website Section
              <span className={`arrow ${activeTab === 12 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 12 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/information") ? "active" : ""}>
                    <Link to="/information">Information</Link>
                  </li>
                  <li className={isActive("/why-delivery") ? "active" : ""}>
                    <Link to="/why-delivery">Why Delivery</Link>
                  </li>
                  <li className={isActive("/client-review") ? "active" : ""}>
                    <Link to="/client-review">Client Review</Link>
                  </li>
                  <li className={isActive("/download-app") ? "active" : ""}>
                    <Link to="/download-app">Download App</Link>
                  </li>
                  <li className={isActive("/delivery-patner") ? "active" : ""}>
                    <Link to="/delivery-patner">Delivery Partner</Link>
                  </li>
                  <li className={isActive("/contact-info") ? "active" : ""}>
                    <Link to="/contact-info">Contact Info</Link>
                  </li>
                  <li className={isActive("/about-us") ? "active" : ""}>
                    <Link to="/about-us">About Us</Link>
                  </li>
                  <li className={isActive("/privacy-policy") ? "active" : ""}>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className={isActive("/terms-condition") ? "active" : ""}>
                    <Link to="/terms-condition">Terms & Condition</Link>
                  </li>
                  <li className={isActive("/walk-through") ? "active" : ""}>
                    <Link to="/walk-through">Walk Through</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 13 ? "active" : ""}`}
              onClick={() => toggleSubmenu(13)}
            >
              <span className="icon">
                <img src={"/src/assets/pickup-request.svg"} alt="pickup request" />
              </span>
              Pickup Request
              <span className={`arrow ${activeTab === 13 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 13 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/regular-pickup-request") ? "active" : ""}>
                    <Link to="/regular-pickup-request">Regular Pickup Request</Link>
                  </li>
                  <li className={isActive("/express-pickup-request") ? "active" : ""}>
                    <Link to="/express-pickup-request">Express Pickup Request</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/support-ticket" className="link">
              <Button
                className={`w-100 ${isActive("/support-ticket") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/support-ticket.svg"} alt="support ticket" />
                </span>
                Support Ticket
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/auto-mail" className="link">
              <Button
                className={`w-100 ${isActive("/auto-mail") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/mail.svg"} alt="auto mail" />
                </span>
                Auto Mail
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/offer" className="link">
              <Button
                className={`w-100 ${isActive("/offer") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/offer1.svg"} alt="offer" />
                </span>
                Offer
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/notification" className="link">
              <Button
                className={`w-100 ${isActive("/notification") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={"/src/assets/notification-bell.svg"} alt="notification" />
                </span>
                Notification
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;