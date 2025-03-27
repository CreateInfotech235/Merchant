import { useEffect, useState } from "react";
import { SubscriptionData, SubscriptionInfo } from "../../Components_merchant/Api/Subscription";
import { useNavigate } from "react-router-dom";
import SubscriptionPlan1 from "./SubscriptionPlan1";
import Loader from "../../Components_admin/Loader/Loader";

function Subscriptionactiveplan({ plans }) {
  const [subcriptionData, setSubcriptionData] = useState([]);
  const [show, setShow] = useState(true);
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(null);

  const findActivePlan = (subscriptions) => {
    const currentDate = new Date();
    return subscriptions.find(sub => {
      const isNotExpired = calculateRemainingDays(sub.expiry) > 0;
      const hasStarted = !sub.startDate || new Date(sub.startDate) < currentDate;
      return isNotExpired && hasStarted;
    });
  };

  const fetchSubscriptionInfo = async (id) => {
    try {
      setLoading(true);
      const response = await SubscriptionData(id);
      if (response.show) {
        setSubcriptionData(response.data);
        const active = findActivePlan(response.data);
        setActivePlan(active);
      } else {
        setShow(false);
      }
    } finally {
      setLoading(false);
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

  const Cardmodel = ({ data }) => {
    return (
      <div className="card shadow-lg border-0 ">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-4 text-center border-end">
              <h4 className="text-primary mb-3">
                {data.subcriptionId.type}
              </h4>
              <h2 className="display-4 fw-bold mb-0">
                £{data.subcriptionId.amount}
              </h2>
              <p className="text-muted">
                per agent per {secondsToDays(data.subcriptionId.seconds)} days
              </p>
            </div>

            <div className="col-md-4 py-3">
              <h5 className="mb-3">Features</h5>
              {data.subcriptionId.features.map((feature, i) => (
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
                    {formatDate(data.createdAt)}
                  </p>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Start Date</small>
                  <p className="mb-0 fw-bold">
                    {data?.startDate ? formatDate(data?.startDate) : 'N/A'}
                  </p>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Expires</small>
                  <p className="mb-0 fw-bold">
                    {formatDate(data.expiry)}
                  </p>
                </div>

                {calculateRemainingDays(data.expiry) > 0 ?
                  data?.startDate ? new Date(data?.startDate) < new Date() ?
                    (<div>
                      <small className="text-muted">Time Remaining</small>
                      <p className="mb-0 fw-bold" style={{ color: calculateRemainingDays(data.expiry) < 0 ? 'red' : 'inherit' }}>
                        {calculateRemainingDays(data.expiry) < 0
                          ? `${Math.abs(calculateRemainingDays(data.expiry))} days ago`
                          : `${calculateRemainingDays(data.expiry)} days`}
                      </p>
                    </div>) :
                    (<div>
                      <small className="text-muted">Active after</small>
                      <p className="mb-0 fw-bold" style={{ color: calculateRemainingDays(data.expiry) < 0 ? 'red' : 'inherit' }}>
                        {data?.startDate ? `${calculateRemainingDays(data.startDate)} days left` : 'N/A'}
                      </p>
                    </div>)
                    :
                    (<div>
                      <small className="text-muted">Time Remaining</small>
                      <p className="mb-0 fw-bold" style={{ color: calculateRemainingDays(data.expiry) < 0 ? 'red' : 'inherit' }}>
                        {calculateRemainingDays(data.expiry) < 0
                          ? `${Math.abs(calculateRemainingDays(data.expiry))} days ago`
                          : `${calculateRemainingDays(data.expiry)} days`}
                      </p>
                    </div>) :
                  "Expired"}
              </div>

              <div className="text-center mt-3">
                <button
                  className={`btn 
                    ${calculateRemainingDays(data.expiry) > 0 ? data?.startDate ? new Date(data?.startDate) < new Date() ? "btn-success" : "btn-warning" : "btn-success" : "btn-danger"}  
                  `}
                >
                  {calculateRemainingDays(data.expiry) > 0 ? data?.startDate ? new Date(data?.startDate) < new Date() ? "Active" : "Not Active Yet" : "Active" : "Expired"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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

  // Add this function to sort subscriptions
  const sortSubscriptions = (subscriptions) => {
    return [...subscriptions].sort((a, b) => {
      const aIsActive = calculateRemainingDays(a.expiry) > 0 && (!a.startDate || new Date(a.startDate) < new Date());
      const bIsActive = calculateRemainingDays(b.expiry) > 0 && (!b.startDate || new Date(b.startDate) < new Date());

      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;

      // If both are active or both are inactive, sort by expiry date
      return new Date(b.expiry) - new Date(a.expiry);
    });
  };

  // Add this useEffect to handle ollradeshow updates
  useEffect(() => {
    if (subcriptionData.length > 0) {
      const expiredCount = sortSubscriptions(subcriptionData).filter(el => {
        const isExpired = calculateRemainingDays(el.expiry) > 0
          ? el?.startDate
            ? new Date(el?.startDate) < new Date()
              ? false
              : false
            : false
          : true;
        return isExpired;
      }).length;

    }
  }, [subcriptionData]);

  const isExpired = (subscription) => {
    const remainingDays = calculateRemainingDays(subscription.expiry);
    if (remainingDays <= 0) return true;

    if (subscription.startDate) {
      return new Date(subscription.startDate) >= new Date();
    }

    return false;
  };
  let fastindex = null
  let fastindexnotactive = null
  return (
    <>
      <div className="container py-5 min-min-h-[calc(100vh-187px)]">

        <div className="text-end mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            View Subscription History
          </button>
        </div>

        {/* Modal for subscription history */}
        {isModalOpen && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={(e) => {
              if (isModalOpen && e.target === e.currentTarget) {
                setIsModalOpen(false)
              }
            }}
          >
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Subscription History</h5>
                  <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  {
                    loading && (
                      <div className="text-center flex justify-center">
                        <Loader />
                      </div>
                    )
                  }

                  {subcriptionData && subcriptionData.length > 0 && !loading ? (
                    sortSubscriptions(subcriptionData).map((el, i) => {
                      const isActive = calculateRemainingDays(el.expiry) > 0 &&
                        (!el.startDate || new Date(el.startDate) < new Date());

                      const isExpired = calculateRemainingDays(el.expiry) > 0 ? el?.startDate ? new Date(el?.startDate) < new Date() ? false : false : false : true
                      if (isExpired && fastindex == null) {
                        fastindex = i
                      }
                      const isnotactive = calculateRemainingDays(el.expiry) > 0 ?
                        el.startDate ? new Date(el.startDate) > new Date() ? true : false : false : false;
                      if (isnotactive && fastindexnotactive == null) {
                        fastindexnotactive = i
                      }
                      return (
                        <div key={i} className="mb-4">
                          {isActive && i === 0 && (
                            <div className="alert alert-success mb-3">
                              <h6 className="mb-0">Active Subscription</h6>
                            </div>
                          )}

                          {isExpired && fastindex == i && (
                            <>
                              <div className="alert alert-danger mb-3">
                                <h6 className="mb-0">Expired Subscription</h6>
                              </div>
                            </>
                          )}
                          {!isActive && i === fastindexnotactive && (
                              <div className="alert alert-secondary mb-3">
                                <h6 className="mb-0">Previous Subscriptions</h6>
                              </div>
                            )}
                          <Cardmodel data={el} />
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center flex justify-center">
                      <h5>No subscription history Not Available</h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}


        <SubscriptionPlan1 plans={plans} subcriptionData={activePlan} loading={loading} />

      </div>
    </>
  );
}

export default Subscriptionactiveplan;
