import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaAngleRight } from "react-icons/fa";
import logo from "../../assets_mercchant/logo-new.png";
import dashboard from '../../assets_mercchant/hugeicons_dashboard-square-add.png'
import subcription from '../../assets_mercchant/subcription.svg'
import billing from '../../assets_mercchant/billing.png'
import man from '../../assets_mercchant/delivery-man 1.png'
import customer from '../../assets_mercchant/carbon_customer.png'
import order from '../../assets_mercchant/icon-park-outline_transaction-order.png'
import support from '../../assets_mercchant/support.png'
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsBoxSeam } from "react-icons/bs";
import { LuBoxes } from "react-icons/lu";
import "./MerchantSidebar.css";

const MerchantSidebar = ({showcount}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [currentpage, setCurrentpage] = useState(0);
  const [ismobile, setIsmobile] = useState(false);
  const [showsublink, setShowsublink] = useState(true);

  const location = useLocation(); // Get current location

  useEffect(() => {
    const handleResize = () => {
      setIsmobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  
  const patelist = [
    {
      path: ["/Merchant-dashboard"],
      num: 0,
    },
    {
      path: ["/subscription-active"],
      num: 1,
    },
    {
      path: ["/create-order", "/all-order", "/order-location", "/trashed-order"],
      num: 2,
    },
    {
      path: ["/multi-orders", "/all-multi-order", "/trashed-multi-order", "/cancelled-orders"],
      num: 3,
    },
    {
      path: ["/multi-order-parcel"],
      num: 4,
    },
    {
      path: ["/all-customer", "/add-customer", "/trashed-customer"],
      num: 5,
    },
    {
      path: ["/delivery-man", "/add-delivery-man", "/delivery-man-location", "/delivery-man-trashed"],
      num: 6,
    },
    {
      path: ["/Show-list-of-support-ticket"],
      num: 7,
    },
    {
      path: ["/invoice-format"],
      num: 8,
    },
    {
      path: ["/All-billing"],
      num: 9,
    },
  ]

  const findIndex = () => {
    const currentPath = location.pathname; // Current path for checking active links
    return patelist.findIndex(item => item.path.includes(currentPath));
  }

  useEffect(() => {
    setCurrentpage(findIndex());
  }, []);

  useEffect(() => {
    setCurrentpage(findIndex());
  }, [location.pathname]);


  const currentPath = location.pathname; // Current path for checking active links

  const handleSublinkClick = (page) => {
    if (showsublink) {
      setShowsublink(false);
    } else {
      setShowsublink(true);
    }
    if (currentpage !== page) {
      setShowsublink(true);
      setCurrentpage(page);
    }
  }

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`col-xxl-2 col-xl-2 p-3 overflow-y-scroll position-fixed h-100 ${isSidebarVisible ? "sidebar visible" : "sidebar"}`}>
        <div className="col-xs-3 mt-5 mb-3 ms-3 me-3">
          <Link to="/Merchant-dashboard" className="d-flex items-center justify-content-center align-items-center text-white">
            <img src={logo} width={'200px'} className="" alt="logo" />
          </Link>
        </div>
        <ul>
          <li className="my-2">
            <Link to="/Merchant-dashboard" className="link" >
              <Button
                className={`w-100 ${currentpage === 0 ? "active" : ""}`}
                onClick={() => { setCurrentpage(0); setSidebarVisible(false) }}
              >
                <span className=" pe-4">
                  <img src={dashboard} alt="dashboard" />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>




          {/* 
          <li className="my-2">
            <Button
              className={`w-100 ${currentpage === 2 ? "active" : ""}`}
              onClick={() => {handleSublinkClick(2);}}
            >
              <span className=" pe-4">
                <img src={order} style={{ width: "25px" }} alt="order" />
              </span>
              Orders
              <span className={`arrow ${currentpage === 2 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {(currentpage === 2 && showsublink === true) && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/create-order" ? "active" : ""}>
                    <Link to="/create-order" onClick={() => setSidebarVisible(false)}>Create Order</Link>
                  </li>
               
                  <li className={currentPath === "/all-order" ? "active" : ""}>
                    <Link to="/all-order" onClick={() => setSidebarVisible(false)}>All Orders</Link>
                  </li>
                  <li className={currentPath === "/order-location" ? "active" : ""}>
                    <Link to="/order-location" onClick={() => setSidebarVisible(false)} >Orders Location</Link>
                  </li>
                  <li className={currentPath === "/trashed-order" ? "active" : ""}>
                    <Link to="/trashed-order" onClick={() => setSidebarVisible(false)}>Trashed Order</Link>
                  </li>
            
                </ul>
              </div>
            )}
          </li> */}

          <li className="my-2">
            <Button
              className={`w-100 ${currentpage === 3 ? "active" : ""}`}
              onClick={() => { handleSublinkClick(3); }}
            >
              <span className=" pe-4">
                <LuBoxes style={{ fontSize: "27px", color: "#fff", fontWeight: "lighter" }} alt="order" />
              </span>
              Orders
              <span className={`arrow ${currentpage === 3 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {(currentpage === 3 && showsublink === true) && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/multi-orders" ? "active" : ""}>
                    <Link to="/multi-orders" onClick={() => setSidebarVisible(false)}>Create Order</Link>
                  </li>
                  <li className={currentPath === "/all-multi-order" ? "active" : ""}>
                    <Link to="/all-multi-order" onClick={() => setSidebarVisible(false)}>All Orders</Link>
                  </li>
                  <li className={currentPath === "/cancelled-orders" ? "active" : ""}>  
                    <Link to="/cancelled-orders" onClick={() => setSidebarVisible(false)}>Cancelled Orders</Link>
                  </li>
                  <li className={currentPath === "/trashed-multi-order" ? "active" : ""}>
                    <Link to="/trashed-multi-order" onClick={() => setSidebarVisible(false)}>Trash Orders</Link>
                  </li>
                  {/* <li className={currentPath === "/multi-order-parcel" ? "active" : ""}>
                    <Link to="/multi-order-parcel" onClick={() => setSidebarVisible(false)}>Multi Order Parcel Details</Link>
                  </li>              */}
                </ul>
              </div>
            )}
          </li>
          <li className="my-2">
            <Link to="/All-billing" className="link" >
              <Button
                className={`w-100 ${currentpage === 9 ? "active" : ""}`}
                onClick={() => { setCurrentpage(9); setSidebarVisible(false) }}
              >
                <span className=" pe-4">
                  <img src={billing} style={{ width: "25px" }} alt="billing" />
                </span>
                Billing
              </Button>
            </Link>
          </li>

          <li className="my-2">
            <Link to="/multi-order-parcel" className="link" >
              <Button
                className={`w-100 ${currentpage === 4 ? "active" : ""}`}
                onClick={() => { setCurrentpage(4); setSidebarVisible(false) }}
              >
                <span className=" pe-4">
                  <BsBoxSeam style={{ fontSize: "27px", color: "#fff", fontWeight: "lighter" }} alt="order" />
                </span>
                Parcel Type
              </Button>
            </Link>
          </li>
          <li className="my-2">
            <Link to="/invoice-format" className="link" >
              <Button
                className={`w-100 ${currentpage === 8 ? "active" : ""}`}
                onClick={() => { setCurrentpage(8); setSidebarVisible(false) }}
              >
                <span className=" pe-4">
                  <LiaFileInvoiceDollarSolid style={{ fontSize: "27px", color: "#fff" }} alt="order" />
                </span>
                Invoice Format
              </Button>
            </Link>
          </li>
          {/* 
          <li className="my-2">
            <Button
              className={`w-100 ${currentpage === 4 ? "active" : ""}`}
              onClick={() => {handleSublinkClick(4);}}
            >
              <span className=" pe-4">
                <img src={order} style={{ width: "25px" }} alt="order" />
              </span>
              multi order parcel
              <span className={`arrow ${currentpage === 4 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
              {(currentpage === 4 && showsublink === true) && (
              <div className="submenuWrapper">
                <ul className="submenu">                    
                  <li className={currentPath === "/multi-order-parcel" ? "active" : ""}>
                    <Link to="/multi-order-parcel" onClick={() => setSidebarVisible(false)}></Link>
                  </li>             
                </ul>
              </div>
            )}
          </li> */}

          <li className="my-2">
            <Button
              className={`w-100 ${currentpage === 5 ? "active" : ""}`}
              onClick={() => { handleSublinkClick(5); }}
            >
              <span className=" pe-4">
                <img src={customer} style={{ width: "25px" }} alt="order" />
              </span>
              Customers
              <span className={`arrow ${currentpage === 5 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {(currentpage === 5 && showsublink === true) && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/all-customer" ? "active" : ""}>
                    <Link to="/all-customer" onClick={() => setSidebarVisible(false)}>All Customers</Link>
                  </li>
                  <li className={currentPath === "/add-customer" ? "active" : ""}>
                    <Link to="/add-customer" onClick={() => setSidebarVisible(false)} >Create Customer</Link>
                  </li>
                  <li className={currentPath === "/trashed-customer" ? "active" : ""}>
                    <Link to="/trashed-customer" onClick={() => setSidebarVisible(false)}>Trash Customer</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li className="my-2">
            <Button
              className={`w-100 ${currentpage === 6 ? "active" : ""}`}
              onClick={() => { handleSublinkClick(6); }}
            >
              <span className=" pe-4">
                <img src={man} style={{ width: "25px" }} alt="delivery" />
              </span>
              Delivery Men
              <span className={`arrow ${currentpage === 6 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {(currentpage === 6 && showsublink === true) && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/delivery-man" ? "active" : ""}>
                    <Link to="/delivery-man" onClick={() => setSidebarVisible(false)}>All Delivery Men</Link>
                  </li>
                  <li className={currentPath === "/add-delivery-man" ? "active" : ""}>
                    <Link to="/add-delivery-man" onClick={() => setSidebarVisible(false)}>Create Delivery Man</Link>
                  </li>
                  <li className={currentPath === "/delivery-man-destination" ? "active" : ""}>
                    <Link to="/delivery-man-location" onClick={() => setSidebarVisible(false)}>Delivery Men Location</Link>
                  </li>
                  <li className={currentPath === "/delivery-man-trashed" ? "active" : ""}>
                    <Link to="/delivery-man-trashed" onClick={() => setSidebarVisible(false)}>Trash Delivery Men</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          {/* 
          <li className="my-2">
            <Button
              className={`w-100 ${currentpage === 7 ? "active" : ""}`}
              onClick={() => {handleSublinkClick(7);}}
            >
              <span className=" pe-4">
                <img src={support} style={{ width: "25px" }} alt="offers" />
              </span>
    
              <span className={`arrow ${currentpage === 7 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {(currentpage === 7 && showsublink === true) && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={currentPath === "/Show-list-of-support-ticket" ? "active" : ""}>
                    <Link to="/Show-list-of-support-ticket" onClick={() => setSidebarVisible(false)}>Show list of support ticket</Link>
                  </li>
               
                </ul>
              </div>
            )}
          </li> */}



          <li className="my-2">
            <Link to="/Show-list-of-support-ticket" className="link" >
              <Button
                className={`w-100 relative ${currentpage === 7 ? "active" : ""}`}
                onClick={() => { setCurrentpage(7); setSidebarVisible(false) }}
              >
                <span className=" pe-4">
                  <img src={support} style={{ width: "25px" }} alt="offers" />
                </span>
                Support Ticket
                {showcount > 0 && (
                  <span className="absolute top-0 right-0 w-[20px] h-[20px] rounded-full bg-red-500 text-white flex items-center justify-center text-xs">{showcount}</span>
                )}

              </Button>
            </Link>
          </li>

          <li className="my-2">
            <Link to="/subscription-active" className="link" >
              <Button
                className={`w-100 ${currentpage === 1 ? "active" : ""}`}
                onClick={() => { setCurrentpage(1); setSidebarVisible(false) }}
              >
                <span className=" pe-4">
                  <img src={subcription} style={{ width: "25px" }} alt="subscription" />
                </span>
                Subscription
              </Button>
            </Link>
          </li>
        

          {/* <li className="my-2">
            <Link to="/offer" className="link">
              <Button
                className={`w-100 ${currentPath === "/offer" ? "active" : ""}`}
                onClick={() => setActiveTab(7)}
              >
                <span className=" pe-4">
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
              <span className=" pe-4">
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
              <span className=" pe-4">
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
              <span className=" pe-4">
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
                <span className=" pe-4">
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
                <span className=" pe-4">
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
              <span className="">
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
