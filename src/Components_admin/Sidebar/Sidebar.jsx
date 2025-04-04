import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Button from "@mui/material/Button";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets_admin/logo-new.png";
import dashboard from "../../assets_admin/dashboard.svg";
import subcription from "../../assets_admin/subcription.svg";
import merchent from "../../assets_admin/merchent.svg";
import withdraw from "../../assets_admin/withdraw.svg";
import notification_bell from "../../assets_admin/notification-bell.svg";
import offer1 from "../../assets_admin/offer1.svg";
import mail from "../../assets_admin/mail.svg";
import support_ticket from "../../assets_admin/support-ticket.svg";
import website from "../../assets_admin/website.svg";
import setting from "../../assets_admin/setting.svg";
import invoice1 from "../../assets_admin/invoice1.svg";
import delivery from "../../assets_admin/delivery.svg";
import deposite from "../../assets_admin/deposite.svg";
import customer from "../../assets_admin/customer.png";
import Location from "../../assets_admin/location (1).png";
import billing from "../../assets_admin/billing.png";
// import { FaBox } from "react-icons/fa";
import { CiBoxes } from "react-icons/ci";
const Sidebar = ({ showcount }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation(); // Hook to get current location (URL)
  const [menuData, setMenuData] = useState([]);
  const [activelink, setActiveLink] = useState(null);

  const toggleSubmenu = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const activeItem = menuData.find(item => item.Listofpath.includes(location.pathname));
    if (activeItem) {
      setActiveTab(activeItem.num);
      setActiveLink(location.pathname);
    }
  }, [menuData, location.pathname]); // Update whenever menuData or location changes

  const Dataofmenu = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: dashboard,
      isDropdown: false,
      isActive: false,
      isicon: false,
      num: 0,
      Listofpath: ["/dashboard"]
    },
    {
      path: "/subscription-required",
      label: "Subscription",
      icon: subcription,
      isDropdown: false,
      isActive: false,
      isicon: false,
      num: 1,
      Listofpath: ["/subscription-required"]
    },

    {
      isDropdown: true,
      label: "Merchant",
      icon: merchent,
      items: [
        { path: "/merchant", label: "Merchants" },
        { path: "/subscribed-merchant", label: "Subscribed Merchant" },
        { path: "/unsubscribed-merchant", label: "Unsubscribed Merchant" },
        { path: "/demo-used-merchant", label: "Demo Used Merchant" },
        // { path: "/subscription-required", label: "Subscription Plan" },
      ],
      isActive: false,
      isicon: false,
      num: 3,
      Listofpath: ["/merchant", "/unsubscribed-merchant", "/demo-used-merchant", "/subscription-required"]
    },

    {
      isDropdown: true,
      label: "Delivery Man",
      icon: delivery,
      items: [
        { path: "/delivery-man-admin", label: "Admin Delivery Man" },
        { path: "/delivery-man-merchant", label: "Merchant Delivery Man" },
        { path: "/delivery-man-destination", label: "Delivery Man Locations" },
      ],
      isActive: false,
      isicon: false,
      num: 4,
      Listofpath: ["/delivery-man-admin", "/delivery-man-merchant", "/delivery-man-destination"]
    },
    {
      path: "/order-admin", label: "Order", icon: <CiBoxes className="text-white text-[20px]" />, isDropdown: false, isActive: false,
      isicon: true,
      num: 5,
      Listofpath: ["/order-admin"]
    },
    {
      path: "/all-customer-admin", label: "Customer", icon: customer, isDropdown: false, isActive: false,
      isicon: false,
      num: 6,
      Listofpath: ["/all-customer-admin"]
    },
    {
      path: "/billing-admin", label: "Billing", icon: billing, isDropdown: false, isActive: false,
      isicon: false,
      num: 7,
      Listofpath: ["/billing-admin"]
    },
    {
      path: "/map-setting", label: "Map Setting", icon: Location, isDropdown: false, isActive: false,
      isicon: false,
      num: 8,
      Listofpath: ["/map-setting"]
    },
    {
      isDropdown: true,
      label: "Settings",
      icon: setting,
      items: [
        { path: "/vehicle", label: "Vehicle" },
        { path: "/extra-charge", label: "Extra Charges" },
        { path: "/parcel-type", label: "Parcel Type" },
        { path: "/payment-gateway", label: "Payment Gateway" },
      ],
      isActive: false,
      isicon: false,
      num: 9,
      Listofpath: ["/vehicle", "/extra-charge", "/parcel-type", "/payment-gateway"]
    },
    {
      isDropdown: true,
      label: "Withdraw Request",
      icon: withdraw,
      items: [
        { path: "/pending-admin", label: "Pending" },
        { path: "/approved-admin", label: "Approved" },
        { path: "/rejected-admin", label: "Rejected" },
      ],
      isActive: false,
      isicon: false,
      num: 10,
      Listofpath: ["/pending-admin", "/approved-admin", "/rejected-admin"]
    },
    {
      isDropdown: true,
      label: "Deposit",
      icon: deposite,
      items: [
        { path: "/deposite-delivery-man", label: "Delivery Man" },
        { path: "/deposite-merchant", label: "Merchant" },
      ],
      isActive: false,
      isicon: false,
      num: 11,
      Listofpath: ["/deposite-delivery-man", "/deposite-merchant"]
    },
    {
      path: "/invoice-setting", label: "Invoice Setting", icon: invoice1, isDropdown: false, isActive: false,
      isicon: false,
      num: 12,
      Listofpath: ["/invoice-setting"]
    },
    {
      isDropdown: true,
      label: "App Setting",
      icon: setting,
      items: [
        { path: "/notification-setting", label: "Notification Setting" },
        { path: "/order-setting", label: "Order Setting" },
        { path: "/currency-setting", label: "Currency Setting" },
      ],
      isActive: false,
      isicon: false,
      num: 13,
      Listofpath: ["/notification-setting", "/order-setting", "/currency-setting"]
    },
    {
      isDropdown: true,
      label: "Website Section",
      icon: website,
      items: [
        { path: "/common-component", label: "Common Components" },
        { path: "/home-page", label: "Home Page" },
        { path: "/why-delivery", label: "Why Delivery" },
        { path: "/client-review", label: "Client Review" },
        { path: "/download-app", label: "Download App" },
        { path: "/delivery-patner", label: "Delivery Partner" },
        { path: "/contact-info", label: "Contact Info" },
        { path: "/about-us", label: "About Us" },
        { path: "/privacy-policy", label: "Privacy Policy" },
        { path: "/terms-condition", label: "Terms & Condition" },
        { path: "/walk-through", label: "Walk Through" },
      ],
      isActive: false,
      isicon: false,
      num: 14,
      Listofpath: ["/common-component", "/home-page", "/why-delivery", "/client-review", "/download-app", "/delivery-patner", "/contact-info", "/about-us", "/privacy-policy", "/terms-condition", "/walk-through"]
    },
    {
      path: "/support-ticket", label: "Support Ticket", icon: support_ticket, isDropdown: false, isActive: false,
      isicon: false,
      num: 15,
      Listofpath: ["/support-ticket"]
    },
    {
      path: "/auto-mail", label: "Auto Mail", icon: mail, isDropdown: false, isActive: false,
      isicon: false,
      num: 16,
      Listofpath: ["/auto-mail"]
    },
    {
      path: "/offer", label: "Offer", icon: offer1, isDropdown: false, isActive: false,
      isicon: false,
      num: 17,
      Listofpath: ["/offer"]
    },
    {
      path: "/notification", label: "Notification", icon: notification_bell, isDropdown: false, isActive: false,
      isicon: false,
      num: 18,
      Listofpath: ["/notification"]
    },
 

  ];

  console.log(activeTab, "activeTab");

  useEffect(() => {
    setMenuData(Dataofmenu);
  }, []);
  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div
        className={`col-xxl-2 col-xl-2 p-3 overflow-y-scroll position-fixed h-100 ${isSidebarVisible ? "sidebar visible" : "sidebar"
          }`}
      >
        <div className="col-xs-3 mt-5 mb-3 ms-3 me-3">
          <Link to="/dashboard" className="d-flex items-center justify-content-center align-items-center text-white">
            <img src={logo} width={'200px'} alt="logo" />
          </Link>
        </div>
        <ul>
          {menuData.map((item, index) => (
            item.isDropdown ? (
              <li className="my-2" key={index}>
                <Button
                  className={`w-100 ${activeTab === item.num ? "active" : ""}`}
                  onClick={() => toggleSubmenu(item.num)}
                >
                  {item.isicon ? (
                    <span className="icon">
                      {item.icon}
                    </span>
                  ) : (
                    <span className="icon">
                      <img src={item.icon} alt={item.label} />
                    </span>
                  )}
                  {item.label}
                  <span className={`arrow `}>
                    <FaAngleRight style={{ color: "#fff", transform: `rotate(${activeTab === item.num ? "90deg" : "0deg"})`, transition: "transform 0.2s ease-in-out" }} />
                  </span>
                </Button>
                {activeTab === item.num && (
                  <div className="submenuWrapper">
                    <ul className="submenu">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className={activelink === subItem.path ? "active" : ""}>
                          <Link to={subItem.path}>{subItem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li className="my-2" key={index}>
                <Link to={item.path} className="link ">
                  <Button
                    className={`w-100 relative ${activeTab === item.num ? "active" : ""}`}
                    onClick={() => setActiveTab(item.num)}
                  >
                    {item.isicon ? (
                      <span className="icon">
                        {item.icon}
                      </span>
                    ) : (
                      <span className="icon">
                        <img src={item.icon} alt={item.label} />
                      </span>
                    )}
                    {item.label}
                    {item.path == "/support-ticket" && showcount > 0 && (
                      <span className="absolute top-0 right-0 w-[20px] h-[20px] rounded-full bg-red-500 text-white flex items-center justify-center text-xs">{showcount}</span>
                    )}
                  </Button>
                </Link>
              </li>
            )
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
