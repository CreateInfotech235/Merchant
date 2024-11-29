import React, { useEffect, useState } from "react";
import subscribe from "../../assets_mercchant/subscribe.svg";
import notsubscribe from "../../assets_mercchant/not-subscribe.svg";
import totalorder from "../../assets_mercchant/total-order.svg";
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

const MerchantDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [counts, setCounts] = useState({});
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [showSubscriptionModel, setShowSubscriptionModel] = useState(false);
  const [Error, setError] = useState(null);

  const fetchCount = async () => {
    const res = await getCounts();
    console.log(res);
    setCounts(res.data);
  };

  // const fetchSubscriptionInfo = async (id) => {
  //   const response = await SubscriptionInfo(id);
  //   console.log(response);

  //   // Function to calculate remaining days
  //   const calculateRemainingDays = (expiryDate) => {
  //     const currentDate = new Date();
  //     const expirationDate = new Date(expiryDate); // Use expiryDate parameter
  //     const timeDifference = expirationDate - currentDate;
  //     const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert time difference to days

  //     if (remainingDays < 0) {
  //       setShowModal(false);
  //       setError("Your Plan expire");
  //     }
  //   };

  //   if (response.status) {
  //     setShowModal(false);
  //   } else {
  //     setShowModal(false);
  //   }

  //   // Call calculateRemainingDays with the correct expiry date
  //   if (response.data && response.data[0] && response.data[0].expiry) {
  //     calculateRemainingDays(response.data[0].expiry); // Pass the expiry date here
  //   }
  // };

  useEffect(() => {
    const MerchantId = localStorage.getItem("merchnatId");
    fetchCount();

  //   fetchSubscriptionInfo(MerchantId);
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

  return (
    <>
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
      <div className="d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between  d-lg-flex justify-content-lg-between  d-md-flex justify-content-md-between d-sm-flex justify-content-sm-center d-flex flex-column  flex-xxl-row   flex-xl-row  flex-lg-row   flex-md-row   flex-sm-column align-items-center nav-bar pb-3">
        <div className="navbar-options d-flex my-2 col-12 items-center">
          <input
            type="search"
            className="search-btn rounded-start-4 p-3"
            placeholder="Search your delivery"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-img rounded-end-4 border-0 flex justify-center items-center">
            <img src={searchIcon} className="search" alt="search icon" />
          </button>
        </div>
        <div></div>
      </div>

      <div className="container-fluid">
        <div
          class="dashboard row pt-3 h-100 w-120"
          style={{ marginLeft: "-10px" }}
        >
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-5 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "10px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.totalOrders || 0}</h5>
              <p className="box-para">Total orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">
                {counts.acceptedOrders || 0}
              </h5>
              <p className="box-para">Accepted orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">
                {counts.arrivedOrders || 0}
              </h5>
              <p className="box-para">Arrived orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">
                {counts.assignedOrders || 0}
              </h5>
              <p className="box-para">Assigned orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">
                {counts.cancelledOrders || 0}
              </h5>
              <p className="box-para">Cancelled orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">
                {counts.createdOrders || 0}
              </h5>
              <p className="box-para">Created orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">
                {counts.deliveredOrders || 0}
              </h5>
              <p className="box-para">Delivered orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">
                {counts.departedOrders || 0}
              </h5>
              <p className="box-para">Departed orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">
                {counts.pickedOrders || 0}
              </h5>
              <p className="box-para">Picked orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.deliveryMan || 0}</h5>
              <p className="box-para">DeliveryMan</p>
            </div>
          </div>

        </div>

        <div className="mt-4">
          <Example />
          <div className="m-5"></div>
          <OrderCountsChart />
        </div>

        <div className="my-4">
          <h2>Recent Order</h2>
          <RecentOrder />
        </div>
      </div>
    </>
  );
};

export default MerchantDashboard;
