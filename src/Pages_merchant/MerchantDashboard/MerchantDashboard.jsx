import React, { useEffect, useState } from "react";
import subscribe from "../../assets_mercchant/subscribe.svg";
import notsubscribe from "../../assets_mercchant/not-subscribe.svg";
import { Modal, Button } from "react-bootstrap";
import deliveryorder from "../../assets_mercchant/delivery-order.svg";
import cancelorder from "../../assets_mercchant/cancel-order.svg";
import exchange from "../../assets_mercchant/exchange.svg";
import deliverybike from "../../assets_mercchant/deliverybike.svg";
import "./MerchantDashboard.css";
import BarChart from "../../Components_merchant/Barchart/Barchart";
import statement from "../../assets_mercchant/statement.svg";
import arrow from "../../assets_mercchant/arrow.png";
import searchIcon from "../../assets_mercchant/search.png";
import { getCounts } from "../../Components_merchant/Api/Dashboard";
import { SubscriptionInfo } from "../../Components_merchant/Api/Subscription";
import SubscriptionPlanModel from "../SubscriptionPlan/SubscriptionPlanModel";
import Example from "../DashboardChart/Chart";
import RecentOrder from "../Recent Order/RecentOrder";
import OrderCountsChart from "../DashboardChart/Chart1";
// icon
import totalorder from "../../assets_mercchant/total-order.svg";
import Totalorders from "../../assets_mercchant/Total orders.png";
import Acceptedorders from "../../assets_mercchant/Accepted orders.png";
import Arrivedorders from "../../assets_mercchant/Arrived orders.png";
import Assignedorders from "../../assets_mercchant/Assigned orders.png";
import Cancelledorders from "../../assets_mercchant/Cancelled orders.png";
import Createdorders from "../../assets_mercchant/management-service.png";
import Departedorders from "../../assets_mercchant/Departed orders.png";
import Pickedorders from "../../assets_mercchant/Picked orders.png";
import DeliveryMan from "../../assets_mercchant/DeliveryMan.png";
import Loader from "../../Components_admin/Loader/Loader";
import { Link } from "react-router-dom";

const MerchantDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [counts, setCounts] = useState({
    arrivedOrders:""
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [showSubscriptionModel, setShowSubscriptionModel] = useState(false);
  const [Error, setError] = useState(null);

  const fetchCount = async () => {
    setLoading(true);
    const res = await getCounts();
    if (res.status) {
      setCounts(res.data);
      setLoading(false);
    }
  };

  const fetchSubscriptionInfo = async (id) => {
    const response = await SubscriptionInfo(id);
    console.log(response);

    // Function to calculate remaining days
    const calculateRemainingDays = (expiryDate) => {
      const currentDate = new Date();
      const expirationDate = new Date(expiryDate); // Use expiryDate parameter
      const timeDifference = expirationDate - currentDate;
      const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert time difference to days

      if (remainingDays < 0) {
        setShowModal(false);
        setError("Your Plan expire");
      }
    };

    if (response.status) {
      setShowModal(false);
    } else {
      setShowModal(false);
    }

    // Call calculateRemainingDays with the correct expiry date
    if (response.data && response.data[0] && response.data[0].expiry) {
      calculateRemainingDays(response.data[0].expiry); // Pass the expiry date here
    }
  };

  useEffect(() => {
    const MerchantId = localStorage.getItem("merchnatId");
    fetchCount();

      fetchSubscriptionInfo(MerchantId);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setShowSubscriptionModel(false);
  };

  const handleOpenModal = () => {
    setShowSubscriptionModel(true);
  }; // Function to close the modal
const arrayofdata=[
  {
    title:"Total orders",
    icon:Totalorders,
    value:counts?.maintotelOrders || 0,
    link:"/all-multi-order"
  },
  {
    title:"Total sub orders",
    icon:Totalorders,
    value:counts?.totalOrders || 0,
    link:"/all-multi-order"
  },
  {
    title:"Assigned orders",
    icon:Assignedorders,
    value:counts?.assignedOrders || 0,
    link:"/all-multi-order?status=Assigned"
  },
  {
    title:"Arrived orders",
    icon:Arrivedorders,
    value:counts?.arrivedOrders || 0,
    link:"/all-multi-order?status=Arrived"
  },
  {
    title:"Picked orders",
    icon:Pickedorders,
    value:counts?.pickedOrders || 0,
    link:"/all-multi-order?status=Picked_Up"
  },
  {
    title:"Departed orders",
    icon:Departedorders,
    value:counts?.departedOrders || 0,
    link:"/all-multi-order?status=Departed"
  },

  {
    title:"Delivered orders",
      icon:totalorder,
    value:counts?.deliveredOrders || 0,
    link:"/all-multi-order?status=Delivered"
  },
 
  // {
  //   title:"Cancelled orders",
  //   icon:Cancelledorders,
  //   value:counts?.cancelledOrders || 0
  // },

  {
    title:"Unassigned orders",
    icon:Cancelledorders,
    value:counts?.cancelledOrders || 0,
    link:"/cancelled-orders"
  },
  {
    title:"Total customer",
    icon:Totalorders,
    value:counts?.totelcustomer || 0,
    link:"/all-customer"
  },
  {
    title:"Delivery Men",
    icon:DeliveryMan,
    value:counts?.deliveryMan || 0,
    link:"/delivery-man"
  },

  // {
  //   title:"Total trashed orders",
  //   icon:Totalorders,
  //   value:counts?.toteltrashed || 0
  // },
  
]



  return (
    <div className="min-h-[calc(100vh-187px)]">
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>Welcome to Your Dashboard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {Error? "Your plan is Expire"   : <p>Subscribe now and get 1 month FREE with your first month’s subscription! 🎉</p> } */}
          <p>
            Subscribe now and get 1 month FREE with your first month’s
            subscription! 🎉
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleOpenModal()}>
            subscribed
          </Button>
        </Modal.Footer>
      </Modal>
      {showSubscriptionModel && (
        <SubscriptionPlanModel
          showmodel={showModal}
          onHide={handleCloseModal}
        />
      )}

      <div className="d-xxl-flex justify-content-xxl-end d-xl-flex justify-content-xl-end d-lg-flex justify-content-lg-end d-md-flex justify-content-center align-items-center justify-content-md-between d-sm-flex  flex-sm-column  flex-column  flex-lg-row  flex-md-row   flex-xl-row align-items-center"></div>
      <div className="container-fluid">
        {loading ? (
          <div className="flex justify-center items-center min-h-[calc(100vh-187px)]">
            <Loader />
          </div>
        ) : (
          <>
            {loading && (
              <div className="flex justify-center items-center min-h-[calc(100vh-187px)]">
                <Loader />
              </div>
            )}
            <div
              className="dashboard row pt-3 h-100 w-120"
              style={{ marginLeft: "-10px" }}
            >
              
              {arrayofdata.map((item,index)=>(
              <Link to={item.link} className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{ width: "55px" }}
                    />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-5 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "10px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {item.value}
                  </h5>
                  <p className="box-para">{item.title}</p>
                </div>
              </Link>
              ))}
              
            </div>

            <div className="mt-4">
              {/* <Example /> */}
              <div className="m-5"></div>
              <OrderCountsChart />
            </div>

            <div className="my-4">
              <h2 className="font-bold text-[30px] mb-4 underline">
                Recent Order
              </h2>
              <RecentOrder />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MerchantDashboard;
