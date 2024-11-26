import React, { useEffect, useState } from "react";
import { SubscriptionInfo } from "../../Components/Api/Subscription";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubscriptionPlan1 from "./SubscriptionPlan1";

function SubscriptionActive() {
  const [expiredPopup, setExpiredPopup] = useState(false); // New state for expired plan popup
  const [subcriptionData, setSubcriptionData] = useState([]);

  const navigate = useNavigate();
  const fetchSubscriptionInfo = async (id) => {
    const response = await SubscriptionInfo(id);
    console.log(response.data, "Data");
    setSubcriptionData(response.data);
  };

  useEffect(() => {
    const MerchantId = localStorage.getItem("merchnatId");
    fetchSubscriptionInfo(MerchantId);
  }, []); // Only run this once on mount

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const calculateRemainingDays = (expiryDate) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - currentDate;
    const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert time difference to days
    return remainingDays;
  };

  //   useEffect(() => {
  //     // Check if any subscription plan is expired
  //     const expiredPlan = subcriptionData.some((el) => {
  //       return calculateRemainingDays(el.expiry) <= 0;
  //     });

  //     if (expiredPlan) {
  //       setExpiredPopup(true);
  //     }
  //   }, [subcriptionData]);
  return (
    <div>
      {/* <Modal show={expiredPopup} >
        <Modal.Header >
          <Modal.Title>Your plan has expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please renew your plan to continue using the services.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => navigate('/subscription-plans')}>
          Renew Subscription 
          </Button>
        </Modal.Footer>
      </Modal> */}

      <div className="w-100">
        <div className="w-100 d-flex justify-content-center">
          <h2>Your Active Plan</h2>
        </div>
        <div className="subscription d-flex flex-wrap justify-content-center fluid-container w-100 align-items-center">
          <div className="row justify-content-center align-items-center w-100">
            {subcriptionData.map((el, i) => (
              <div
                key={i}
                className="col-xxl-12 bg-white align-items-center col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex flex-column flex-xl-row justify-content-between p-3 rounded m-3"
                style={{ background: "#CCD6B1" }}
              >
                {/* Subscription Details */}
                <div className="text-center">
                  <h5 className="fw-bold">{el.subcriptionId.type}</h5>
                  <h1 className="fw-bold">${el.subcriptionId.amount}</h1>
                  <p className="fw-bold">
                    per agent per {el.subcriptionId.seconds} days
                  </p>
                </div>

                {/* Features List */}
                <div className="d-flex flex-column align-items-center p-3 mb-4">
                  {el.subcriptionId.features.map((features, i) => (
                    <div key={i} className="d-flex align-items-center mb-2">
                      <img
                        src="./src/assets/checkbox.svg"
                        alt="checkbox"
                        className="pe-2"
                      />
                      <p className="mb-0">{features}</p>
                    </div>
                  ))}
                </div>

                {/* Dates and Expiry */}
                <div className="d-flex flex-wrap justify-content-center  md:justify-content-between mb-4">
                  <div className="text-center m-2">
                    <p className="fw-bold">Created at:</p>
                    <p>{formatDate(el.createdAt)}</p>
                  </div>
                  <div className="text-center m-2">
                    <p className="fw-bold">Expire at:</p>
                    <p>{formatDate(el.expiry)}</p>
                  </div>
                  <div className="text-center m-2">
                    <p className="fw-bold">Days left to expire:</p>
                    <p>{calculateRemainingDays(el.expiry)} days</p>
                  </div>
                </div>

                {/* Status Button */}
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary">{el.status== 'APPROVED' ? 'Active' : 'Expire'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     
          <SubscriptionPlan1 /> 
    </div>
  );
}

export default SubscriptionActive;
