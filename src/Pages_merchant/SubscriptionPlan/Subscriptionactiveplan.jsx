import { useEffect, useState } from "react";
import { SubscriptionData, SubscriptionInfo } from "../../Components_merchant/Api/Subscription";
import { useNavigate } from "react-router-dom";
import SubscriptionPlan1 from "./SubscriptionPlan1";
import Loader from "../../Components_admin/Loader/Loader";

function Subscriptionactiveplan({ plans }) {
  const [subcriptionData, setSubcriptionData] = useState([]);
  const [show, setShow] = useState(true);
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);
  const navigate = useNavigate();

  const fetchSubscriptionInfo = async (id) => {
    const response = await SubscriptionData(id);
    if (response.show) {
      setSubcriptionData(response.data);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    const MerchantId = localStorage.getItem("merchnatId");
    fetchSubscriptionInfo(MerchantId);
  }, []);

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
    const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));
    return remainingDays;
  };


  const secondsToDays = (seconds) => {
    return Math.floor(seconds / (24 * 60 * 60));
  };

  const getFilteredSubscriptions = () => {
    if (showAllSubscriptions) {
      return subcriptionData;
    }
    return subcriptionData.filter(el => {
      const isNotExpired = calculateRemainingDays(el.expiry) > 0;
      const hasStarted = !el.startDate || new Date(el.startDate) < new Date();
      return isNotExpired && hasStarted;
    });
  };

  return (
    <>
      <div className="container py-5 min-min-h-[calc(100vh-187px)]">
        {show && (
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold">Your Active Subscription</h2>
            <div
              className="mx-auto"
              style={{ width: "100px", height: "4px", background: "#221F92" }}
            ></div>

          </div>
        )}
        {show && (
          <>
            <div className="row justify-content-center ">
              {subcriptionData && subcriptionData.length > 0 ? (
                getFilteredSubscriptions().map((el, i) => (
                  <div key={i} className="col-lg-10 mb-4">
                    <div className="card shadow-lg border-0 h-100">
                      <div className="card-body p-4">
                        <div className="row align-items-center">
                          <div className="col-md-4 text-center border-end">
                            <h4 className="text-primary mb-3">
                              {el.subcriptionId.type}
                            </h4>
                            <h2 className="display-4 fw-bold mb-0">
                              £{el.subcriptionId.amount}
                            </h2>
                            <p className="text-muted">
                              per agent per {secondsToDays(el.subcriptionId.seconds)} days
                            </p>
                          </div>

                          <div className="col-md-4 py-3">
                            <h5 className="mb-3">Features</h5>
                            {el.subcriptionId.features.map((feature, i) => (
                              <div key={i} className="d-flex align-items-center mb-2">
                                <i className="fas fa-check text-success me-2"></i>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="col-md-4">
                            <div className="p-3 bg-light rounded">
                              <div className="mb-3">
                                <small className="text-muted">Subscription By Date</small>
                                <p className="mb-0 fw-bold">
                                  {formatDate(el.createdAt)}
                                </p>
                              </div>
                              <div className="mb-3">
                                <small className="text-muted">Start Date</small>
                                <p className="mb-0 fw-bold">
                                  {el?.startDate ? formatDate(el?.startDate) : 'N/A'}
                                </p>
                              </div>
                              <div className="mb-3">
                                <small className="text-muted">Expires</small>
                                <p className="mb-0 fw-bold">
                                  {formatDate(el.expiry)}
                                </p>
                              </div>

                              {calculateRemainingDays(el.expiry) > 0 ?
                                el?.startDate ? new Date(el?.startDate) < new Date() ?
                                  (<div>
                                    <small className="text-muted">Time Remaining</small>
                                    <p className="mb-0 fw-bold" style={{ color: calculateRemainingDays(el.expiry) < 0 ? 'red' : 'inherit' }}>
                                      {calculateRemainingDays(el.expiry) < 0
                                        ? `${Math.abs(calculateRemainingDays(el.expiry))} days ago`
                                        : `${calculateRemainingDays(el.expiry)} days`}
                                    </p>
                                  </div>) :
                                  (<div>
                                    <small className="text-muted">Active after</small>
                                    <p className="mb-0 fw-bold" style={{ color: calculateRemainingDays(el.expiry) < 0 ? 'red' : 'inherit' }}>
                                      {el?.startDate ? `${calculateRemainingDays(el.startDate)} days left` : 'N/A'}
                                    </p>
                                  </div>)
                                  :
                                  (<div>
                                    <small className="text-muted">Time Remaining</small>
                                    <p className="mb-0 fw-bold" style={{ color: calculateRemainingDays(el.expiry) < 0 ? 'red' : 'inherit' }}>
                                      {calculateRemainingDays(el.expiry) < 0
                                        ? `${Math.abs(calculateRemainingDays(el.expiry))} days ago`
                                        : `${calculateRemainingDays(el.expiry)} days`}
                                    </p>
                                  </div>) :
                                "Expired"}
                            </div>

                            <div className="text-center mt-3">
                              <button
                                className={`btn 
                              ${calculateRemainingDays(el.expiry) > 0 ? el?.startDate ? new Date(el?.startDate) < new Date() ? "btn-success" : "btn-warning" : "btn-success" : "btn-danger"}  
                              `}

                              >
                                {calculateRemainingDays(el.expiry) > 0 ? el?.startDate ? new Date(el?.startDate) < new Date() ? "Active" : "Not Active Yet" : "Active" : "Expired"}
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-100 h-[300px] d-flex justify-content-center align-items-center">
                  <Loader />
                </div>
              )}
            </div>
            <div className="text-end">
              <button
                className="btn btn-primary"
                onClick={() => setShowAllSubscriptions(!showAllSubscriptions)}
              >
                {showAllSubscriptions ? "Show Active Only" : "Show All Subscriptions"}
              </button>
            </div>
          </>
        )}

        <SubscriptionPlan1 plans={plans} />
      </div>
    </>
  );
}

export default Subscriptionactiveplan;
