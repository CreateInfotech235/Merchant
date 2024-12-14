import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MerchantSidebar from "../Components_merchant/MerchantSidebar/MerchantSidebar";
import Header from "../Components_merchant/Header/Header";
import Breadcrumb from "../Components_merchant/Breadcrumb/Breadcrumb";
import { SubscriptionInfo } from "../Components_merchant/Api/Subscription";
import { Button, Modal } from "react-bootstrap";
import SubscriptionPlanModel from "../Pages_merchant/SubscriptionPlan/SubscriptionPlanModel";
import "bootstrap/dist/css/bootstrap.min.css";

const ProtectedRoute = ({ children }) => {
  const [showModel, setShowModel] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [expiredPopup, setExpiredPopup] = useState(false);
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);

  const token = localStorage.getItem("accessToken");
  const merchantId = localStorage.getItem("merchnatId");
  const userData = JSON.parse(localStorage.getItem("userData"));
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
  // Check free subscription

  // Theme mode effect
  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [themeMode]);

  // Fetch subscription info
  useEffect(() => {
    const fetchSubscriptionInfo = async (id) => {
      const response = await SubscriptionInfo(id);
      if (response.message === "Your subcription is expired") {
        if (!window.location.pathname.includes("/subscription-active")) {
          navigate("/subscription-active");
        }
      }
      localStorage.setItem('SubscriptionId', response.data[0].subcriptionId._id);
      setSubscriptionData(response.data);
    };

    if (merchantId && userData.freeSubscription === true) {
      fetchSubscriptionInfo(merchantId);
    }
  }, [merchantId, userData.freeSubscription, navigate]);

  // Check for expired subscription
  useEffect(() => {
    const hasExpiredPlan = subscriptionData.some((plan) => {
      return calculateRemainingDays(plan.expiry) <= 0;
    });

    if (hasExpiredPlan) {
      setExpiredPopup(true);
      setIsAccessDenied(true);
    }
  }, [subscriptionData]);

  const calculateRemainingDays = (expiryDate) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - currentDate;
    const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));
    return remainingDays;
  };

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

  return (
    <div className={`app ${themeMode}`}>
      <div className="container-fluid p-0">
        <div className="main row d-xxl-flex flex-row justify-content-xxl-between d-xl-flex justify-content-xl-between">
          <div className="sidebarWrapper col-xxl-2 col-xl-2">
            <MerchantSidebar />
          </div>
          <div className="content col-xxl-10 col-xl-10 col-lg-12 col-md-12 p-xxl-5 p-xl-5 p-lg-4 p-md-4 p-4">
            <div className="d-flex flex-xxl-row-reverse justify-content-xxl-between flex-xl-row-reverse justify-content-xl-between flex-lg-row-reverse justify-content-lg-between flex-md-row-reverse justify-content-md-between flex-sm-column justify-content-sm-center align-items-sm-center  flex-column justify-content-center align-items-center  ">
              <Header toggleThemeMode={toggleThemeMode} themeMode={themeMode} />
              <Breadcrumb />
            </div>
            {showModel && <SubscriptionPlanModel showmodel={userData.freeSubscription ? false : true} onHide={handleCloseModel} />}
            <Modal show={expiredPopup} onHide={handlePopupClose}>
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
            {token ? children : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
