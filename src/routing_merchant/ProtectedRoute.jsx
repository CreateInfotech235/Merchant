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
import { getSupportTicket } from "../Components_merchant/Api/SupportTicket";


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
  const [ticketIdData, setTicketIdData] = useState(null);
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

  // Fetch subscription info
  useEffect(() => {
    const fetchSubscriptionInfo = async (id) => {
      const response = await SubscriptionInfo(id);
      console.log(response, "response123");

      if (response.message == "Token is invalid") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("merchantId");
        localStorage.removeItem("userData");
        navigate("/");
        window.location.reload();
      }
      console.log("response.message123", response.message);

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

  function getunreadmessages(data) {
    const unreadCounts = {};
    const unreadCount = data.messages.filter(
      msg => msg.sender.toLowerCase() === "admin" && !msg.isRead
    )?.length || 0;
    if (unreadCount > 0) {
      unreadCounts[data._id] = unreadCount;
    }
    return unreadCounts;
  }


  const fetchMessages = async () => {
    try {
      const response = await getSupportTicket();
      console.log("Support ticket response:", response);
      if (response.data.message.includes("Support ticket get successfully")) {
        // Calculate unread messages per ticket
        const unreadCounts = {};
        response.data.data.forEach(ticket => {
          const unreadCount = getunreadmessages(ticket);
          unreadCounts[ticket._id] = unreadCount[ticket._id];
        });
        setUnreadMessages(unreadCounts);

        // Calculate total unread messages
        const totalUnread = Object.values(unreadCounts).reduce((total, count) => {
          return count !== undefined ? total + count : total;
        }, 0);
        setShowcount(totalUnread);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };



  useEffect(() => {


    fetchMessages();

    // Socket connection with debug logs
    console.log("Attempting socket connection...");
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Listen for new messages
    socket.on("SupportTicketssendMessage", (message) => {
      if (message.sender.toLowerCase() === "admin") {
        setUnreadMessages(prev => {
          const newCounts = {
            ...prev,
            [message.ticketId]: (prev[message.ticketId] || 0) + 1
          };
          return newCounts;
        });
      }
    });

    // Update the messageRead socket handler
    socket.on("messageRead", ({ ticketId, update }) => {
      console.log("received messageRead event");
      setUnreadMessages(prevUnreadMessages => {
        const newUnreadMessages = { ...prevUnreadMessages };
        // Count unread admin messages for this ticket
        const unreadCount = update.messages.filter(
          msg => msg.sender.toLowerCase() === "admin" && !msg.isRead
        ).length;

        // Update count for this ticket
        if (unreadCount > 0) {
          newUnreadMessages[ticketId] = unreadCount;
        } else {
          delete newUnreadMessages[ticketId]; // Remove ticket if no unread messages
        }

        return newUnreadMessages;
      });
    });

    return () => {
      console.log("Cleaning up socket connection...");
      socket.off("SupportTicketssendMessage");
      socket.off("messageRead");
      socket.disconnect();
    };
  }, []);

  // Separate useEffect for updating showcount when unreadMessages changes
  useEffect(() => {
    const totalUnread = Object.values(unreadMessages).reduce((total, count) => {
      return count !== undefined ? total + count : total;
    }, 0);
    setShowcount(totalUnread);
  }, [unreadMessages]);

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
                socket
              }) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedRoute;
