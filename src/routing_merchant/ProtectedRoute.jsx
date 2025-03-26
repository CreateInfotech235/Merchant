import React, { cloneElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MerchantSidebar from "../Components_merchant/MerchantSidebar/MerchantSidebar";
import Header from "../Components_merchant/Header/Header";
import Breadcrumb from "../Components_merchant/Breadcrumb/Breadcrumb";
import { SubscriptionInfo } from "../Components_merchant/Api/Subscription";
import { Button, Modal } from "react-bootstrap";
import SubscriptionPlanModel from "../Pages_merchant/SubscriptionPlan/SubscriptionPlanModel";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { socket } from "../Components_merchant/Api/Api";


const ProtectedRoute = ({ children }) => {
  const [showModel, setShowModel] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [expiredPopup, setExpiredPopup] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const token = localStorage.getItem("accessToken");
  const merchantId = localStorage.getItem("merchnatId");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [showcount, setShowcount] = useState(0);
  const navigate = useNavigate();


  // Check authentication
  useEffect(() => {
    if (!token || !merchantId) {
      navigate("/login");
    }
  }, [token, merchantId, navigate]);

  useEffect(() => {
    if (userData.freeSubscription === false) {
      setShowModel(true);
    }
  }, [userData?.freeSubscription]);

  // Theme mode effect
  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [themeMode]);




  useEffect(() => {
    // socket connection aollradey
    socket.connect();
    socket.on("Messagedataupdate", (data) => {
      console.log("Messagedataupdate", data);
      if (data.unreadMessages.for === "admin") {
        setUnreadMessages(data.unreadMessages.unreadMessages);
        setShowcount(data.unreadMessages.totalUnreadMessages);
      }
      // fetchMessages();
    });

    return () => {
      socket.off("Messagedataupdate");
    };
  }, []);

  // Fetch subscription info
  useEffect(() => {
    const fetchSubscriptionInfo = async (id) => {
      const response = await SubscriptionInfo(id);

      if (response.message == "Token is invalid") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("merchantId");
        localStorage.removeItem("userData");
        navigate("/");
        window.location.reload();
      }

      if (response?.message?.includes("admin rejected your request")) {
        console.log(response.message);
        navigate("/");
      }

      if (response?.message?.includes("admin not approved your request")) {
        console.log(response.message);
        navigate("/");
      }

      if (response?.message?.includes("Your subcription is expired")) {
        if (!window.location.pathname.includes("/subscription-active")) {
          navigate("/subscription-active");
        }
      }
      localStorage.setItem(
        "SubscriptionId",
        response.data[0].subcriptionId._id
      );
      setSubscriptionData(response.data);
    };

    if (merchantId && userData.freeSubscription === true) {
      fetchSubscriptionInfo(merchantId);
    }
  }, [merchantId, userData.freeSubscription, navigate]);

  // Check for subscription expiry at specific time
  useEffect(() => {
    const now = new Date();
    subscriptionData.forEach((plan) => {
      const expiryTime = new Date(plan.expiry) - now;
      if (expiryTime > 0 && expiryTime <= 3 * 60 * 1000) {
        setTimeout(() => setExpiredPopup(true), expiryTime);
      }
    });
  }, [subscriptionData]);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handlePopupClose = () => {
    navigate("/subscription-active");
    setExpiredPopup(false);
  };

  const handleCloseModel = () => {
    setShowModel(false);
  };

  const fetchMessages = async () => {
    try {
      const merchantId = localStorage.getItem("merchnatId");
      const response = await axios.get(`https://create-courier-8.onrender.com/mobile/auth/unreadMessages/${merchantId}`);

      if (response.data) {
        if (response.data.for === "admin") {
          setUnreadMessages(response.data.unreadMessages || {});
          setShowcount(response.data.totalUnreadMessages || 0);
        }
      }
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  console.log(unreadMessages, "unreadMessages");



  return (
    <>
      <div className={`app ${themeMode}`}>
        <div className="container-fluid p-0">
          <div className="main row d-xxl-flex flex-row justify-content-xxl-between d-xl-flex justify-content-xl-between">
            <div className="sidebarWrapper col-xxl-2 col-xl-2">
              <MerchantSidebar showcount={showcount} />
            </div>
            <div className="content min-h-screen col-xxl-10 col-xl-10 col-lg-12 col-md-12 p-xxl-5 p-xl-5 p-lg-4 p-md-4 p-4">
              <div className="d-flex flex-xxl-row-reverse justify-content-xxl-between flex-xl-row-reverse justify-content-xl-between flex-lg-row-reverse justify-content-lg-between flex-md-row-reverse justify-content-md-between flex-sm-column justify-content-sm-center align-items-sm-center flex-column justify-content-center align-items-center">
                <Header toggleThemeMode={toggleThemeMode} themeMode={themeMode} />
                <Breadcrumb />
              </div>
              {showModel && (
                <SubscriptionPlanModel
                  showmodel={userData.freeSubscription ? false : true}
                  onHide={handleCloseModel}
                />
              )}
              <Modal show={expiredPopup}>
                <Modal.Header>
                  <Modal.Title>Your Plan Has Expired</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Please renew your plan to continue using the services.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handlePopupClose}>
                    Renew Subscription
                  </Button>
                </Modal.Footer>
              </Modal>

              {token ? cloneElement(children, {
                unreadMessages,
                fetchMessages
              }) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedRoute;
