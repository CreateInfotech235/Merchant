import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaAngleRight } from "react-icons/fa";
import logo from "../../assets_mercchant/logo.png";
import dashboard from '../../assets_mercchant/dashboard.svg'
import subcription from '../../assets_mercchant/subcription.svg'
import man from '../../assets_mercchant/man.svg'
import customer from '../../assets_mercchant/customer.png'
import order from '../../assets_mercchant/order-delivery (1).png'
import support from '../../assets_mercchant/support.png'
import "./MerchantSidebar.css";
import transfer_1 from '../../assets_mercchant/transfer 1.svg'

const MerchantSidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation(); // Get current location

  const toggleSubmenu = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const currentPath = location.pathname; // Current path for checking active links

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`col-xxl-2 col-xl-2 p-3 overflow-y-scroll position-fixed h-100 ${isSidebarVisible ? "sidebar visible" : "sidebar"}`}>
        <div className="col-xs-3 mt-5 mb-3 ms-3 me-3">
          <Link to="/merchant" className="d-flex items-center justify-content-center align-items-center text-white">
          {/* <div className="d-flex items-center justify-content-center blur"></div> */}
            <img src={logo} width={'200px'} className="logo" alt="logo" />
          </Link>
        </div>
        <ul>
          <li className="my-2">
            <Link to="/Merchant-dashboard" className="link">
              <Button
                className={`w-100 ${currentPath === "/Merchant-dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab(0)}
              >
                <span className="icon pe-4">
                  <img src={dashboard} alt="dashboard" />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>

          <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 2 ? "active" : ""}`}
              onClick={() => toggleSubmenu(2)}
            >
              <span className="icon pe-4">
                <img src={subcription} style={{ width: "25px" }} alt="subscription" />
              </span>
              Subscription
              <span className={`arrow ${activeTab === 2 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 2 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  {/* <li className={currentPath === "/subscription-plans" ? "active" : ""}>
                    <Link to="/subscription-plans">Subscription Plans</Link>
                  </li> */}
                  <li className={currentPath === "/subscription-active" ? "active" : ""}>
                    <Link to="/subscription-active">Subscription Active Plan</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 3 ? "active" : ""}`}
              onClick={() => toggleSubmenu(3)}
            >
              <span className="icon pe-4">
                <img src={order} style={{ width: "25px" }} alt="order" />
              </span>
              Orders
              <span className={`arrow ${activeTab === 3 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 3 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/create-order" ? "active" : ""}>
                    <Link to="/create-order">Create Order</Link>
                  </li>
                  <li className={currentPath === "/all-order" ? "active" : ""}>
                    <Link to="/all-order">All Orders</Link>
                  </li>
                  <li className={currentPath === "/order-location" ? "active" : ""}>
                    <Link to="/order-location">Orders Location</Link>
                  </li>
                  <li className={currentPath === "/trashed-order" ? "active" : ""}>
                    <Link to="/trashed-order">Trashed Order</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 4 ? "active" : ""}`}
              onClick={() => toggleSubmenu(4)}
            >
              <span className="icon pe-4">
                <img src={customer} style={{ width: "25px" }} alt="order" />
              </span>
              Customers
              <span className={`arrow ${activeTab === 4 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 4 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                <li className={currentPath === "/all-customer" ? "active" : ""}>
                    <Link to="/all-customer">All Customers</Link>
                  </li>
                  <li className={currentPath === "/add-customer" ? "active" : ""}>
                    <Link to="/add-customer">Create Customer</Link>
                  </li>
                  <li className={currentPath === "/trashed-customer" ? "active" : ""}>
                    <Link to="/trashed-customer">Trashed Customer</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 5 ? "active" : ""}`}
              onClick={() => toggleSubmenu(5)}
            >
              <span className="icon pe-4">
                <img src={man} style={{ width: "25px" }} alt="delivery" />
              </span>
              Delivery Mans
              <span className={`arrow ${activeTab === 5 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 5 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/delivery-man" ? "active" : ""}>
                    <Link to="/delivery-man"> All delivery Mans</Link>
                  </li>
                  <li className={currentPath === "/add-delivery-man" ? "active" : ""}>
                    <Link to="/add-delivery-man">Create delivery man</Link>
                  </li>
                  {/* <li className={currentPath === "/document" ? "active" : ""}>
                    <Link to="/deposite">deposite</Link>
                  </li>
                  <li className={currentPath === "/delivery-man-document" ? "active" : ""}>
                    <Link to="/withdraw-request">withdraw request</Link>
                  </li>
                  <li className={currentPath === "/delivery-man-destination" ? "active" : ""}>
                    <Link to="/pending-delivery-man">pending delivery man</Link>
                  </li>
                  <li className={currentPath === "/delivery-man-document" ? "active" : ""}>
                    <Link to="/approved-delivery-man">approved delivery man</Link>
                  </li>
                  <li className={currentPath === "/delivery-man-destination" ? "active" : ""}>
                    <Link to="/document-needed">document needed</Link>
                  </li>
                  <li className={currentPath === "/delivery-man-document" ? "active" : ""}>
                    <Link to="/upload-document">upload document</Link>
                  </li> */}
                  <li className={currentPath === "/delivery-man-destination" ? "active" : ""}>
                    <Link to="/delivery-man-location">delivery man location</Link>
                  </li>
                  <li className={currentPath === "/delivery-man-trashed" ? "active" : ""}>
                    <Link to="/delivery-man-trashed">Trashed delivery man</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 6 ? "active" : ""}`}
              onClick={() => toggleSubmenu(6)}
            >
              <span className="icon pe-4">
                <img src={support} style={{ width: "25px" }} alt="offers" />
              </span>
           Support Ticket
              <span className={`arrow ${activeTab === 6 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 6 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/vehicle" ? "active" : ""}>
                    <Link to="/Show-list-of-support-ticket">Show list of support ticket</Link>
                  </li>
                  <li className={currentPath === "/add-extra-charges" ? "active" : ""}>
                    <Link to="/Show-list-of-support-ticket">Raise issue</Link>
                  </li>
              
                </ul>
              </div>
            )}
          </li>
      
          {/* <li className="my-2">
            <Link to="/offer" className="link">
              <Button
                className={`w-100 ${currentPath === "/offer" ? "active" : ""}`}
                onClick={() => setActiveTab(7)}
              >
                <span className="icon pe-4">
                  <img src={"/src/assets/tag.svg"} style={{ width: "25px" }} alt="vehicle" />
                </span>
     Offers
              </Button>
            </Link>
          </li> */}

          {/* <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 8 ? "active" : ""}`}
              onClick={() => toggleSubmenu(8)}
            >
              <span className="icon pe-4">
                <img src={"/src/assets/truck.svg"} style={{ width: "25px" }} alt="pickup request" />
              </span>
              Pickup Request
              <span className={`arrow ${activeTab === 8 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 8 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/regular-pickup-request" ? "active" : ""}>
                    <Link to="/regular-pickup-request">Regular Pickup Request</Link>
                  </li>
                  <li className={currentPath === "/express-pickup-request" ? "active" : ""}>
                    <Link to="/express-pickup-request">Express Pickup Request</Link>
                  </li>
                </ul>
              </div>
            )}
          </li> */}

          {/* <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 9 ? "active" : ""}`}
              onClick={() => toggleSubmenu(9)}
            >
              <span className="icon pe-4">
                <img src={"/src/assets/delivery-bike.svg"} style={{ width: "25px" }} alt="extra charge" />
              </span>
              
              <span className={`arrow ${activeTab === 9 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 9 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/notification-setting" ? "active" : ""}>
                    <Link to="/all-vehicle">all vehicle</Link>
                  </li>
                  <li className={currentPath === "/order-setting" ? "active" : ""}>
                    <Link to="/express-charges">express charges</Link>
                  </li>
               
                </ul>
              </div>
            )}
          </li> */}

          {/* <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 10 ? "active" : ""}`}
              onClick={() => toggleSubmenu(10)}
            >
              <span className="icon pe-4">
                <img src={"/src/assets/moneym.svg"} style={{ width: "25px" }} alt="extra charge" />
              </span>
              Extra Charge
              <span className={`arrow ${activeTab === 10 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 10 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/notification-setting" ? "active" : ""}>
                    <Link to="/regular-charges">regular charges</Link>
                  </li>
                  <li className={currentPath === "/order-setting" ? "active" : ""}>
                    <Link to="/express-charges">express charges</Link>
                  </li>
               
                </ul>
              </div>
            )}
          </li> */}

          {/* <li className="my-2">
            <Link to="/parcel-type" className="link">
              <Button
                className={`w-100 ${currentPath === "/parcel-type" ? "active" : ""}`}
                onClick={() => setActiveTab(11)}
              >
                <span className="icon pe-4">
                  <img src={"/src/assets/approve.svg"} style={{ width: "25px" }} alt="vehicle" />
                </span>
    Parcel Type
              </Button>
            </Link>
          </li> */}

          {/* <li className="my-2">
            <Link to="/account-details" className="link">
              <Button
                className={`w-100 ${currentPath === "/withdraw-request" ? "active" : ""}`}
                onClick={() => setActiveTab(12)}
              >
                <span className="icon pe-4">
                  <img src={"/src/assets/credit.svg"} style={{ width: "25px" }} alt="account details" />
                </span>
                Account Details
              </Button>
            </Link>
          </li> */}

          {/* <li className="my-2">
            <Button
              className={`gap-4 w-100 ${activeTab === 13 ? "active" : ""}`}
              onClick={() => toggleSubmenu(13)}
            >
              <span className="icon">
                <img src={"/src/assets/transfer 1.svg"} alt="withdraw" />
              </span>
              Withdraw Request
              <span className={`arrow ${activeTab === 13 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 13 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/pending" ? "active" : ""}>
                    <Link to="/pending">Pending</Link>
                  </li>
                  <li className={currentPath === "/approved" ? "active" : ""}>
                    <Link to="/approved">Approved</Link>
                  </li>
                  <li className={currentPath === "/rejected" ? "active" : ""}>
                    <Link to="/rejected">Rejected</Link>
                  </li>
                </ul>
              </div>
            )}
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default MerchantSidebar;
