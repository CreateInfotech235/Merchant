import { useEffect, useState } from "react";
import { SubscriptionInfo } from "../../Components_merchant/Api/Subscription";
import { useNavigate} from "react-router-dom";
import SubscriptionPlan1 from "./SubscriptionPlan1";

function Subscriptionactiveplan({ plans }) {
    const [subcriptionData, setSubcriptionData] = useState([]);
    const navigate = useNavigate();

    const fetchSubscriptionInfo = async (id) => {
        const response = await SubscriptionInfo(id);
        setSubcriptionData(response.data);
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
            minute: "2-digit"
        });
    };

    const calculateRemainingDays = (expiryDate) => {
        const currentDate = new Date();
        const expirationDate = new Date(expiryDate);
        const timeDifference = expirationDate - currentDate;
        const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));
        return remainingDays;
    };

    return (
        <>

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold">Your Active Subscription</h2>
                    <div className="mx-auto" style={{ width: '100px', height: '4px', background: '#221F92' }}></div>
                </div>

                <div className="row justify-content-center">
                    {subcriptionData && subcriptionData.length > 0 ? (
                        subcriptionData.map((el, i) => (
                            <div key={i} className="col-lg-10 mb-4">
                                <div className="card shadow-lg border-0 h-100">
                                    <div className="card-body p-4">
                                        <div className="row align-items-center">
                                            <div className="col-md-4 text-center border-end">
                                                <h4 className="text-primary mb-3">{el.subcriptionId.type}</h4>
                                                <h2 className="display-4 fw-bold mb-0">£{el.subcriptionId.amount}</h2>
                                                <p className="text-muted">per agent per {el.subcriptionId.seconds} days</p>
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
                                                        <small className="text-muted">Created</small>
                                                        <p className="mb-0 fw-bold">{formatDate(el.createdAt)}</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <small className="text-muted">Expires</small>
                                                        <p className="mb-0 fw-bold">{formatDate(el.expiry)}</p>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted">Time Remaining</small>
                                                        <p className="mb-0 fw-bold">{calculateRemainingDays(el.expiry)} days</p>
                                                    </div>
                                                </div>

                                                <div className="text-center mt-3">
                                                    <button
                                                        className={`btn ${el.status === 'APPROVED' ? 'btn-success' : 'btn-danger'}`}
                                                    >
                                                        {el.status === 'APPROVED' ? 'Active' : 'Expired'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <h3 className="text-muted">No Active Subscription</h3>
                        </div>
                    )}
                </div>
                <SubscriptionPlan1 plans={plans} />
            </div>
        </>
    );
}

export default Subscriptionactiveplan;
