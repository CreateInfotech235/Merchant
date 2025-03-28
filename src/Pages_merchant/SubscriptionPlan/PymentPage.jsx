import { useState, useEffect } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { stripPayment } from "../../Components_merchant/Api/Subscription";
import { toast } from "react-toastify";

// Set your publishable key here
const stripePromise = loadStripe(
  "pk_test_51QWXp5FWojz9eouiboeh9IFFnK9AFnwQwgZ1kxG7i3rIGhvb69u0ZxqL4u9fBoufp2d77c2Dmk839MWuQhK8Wzgl00z7R9RF8c"
);

const CheckoutForm = ({ plans, activePlan, expiry }) => {
  

  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const isrecharge = location.state?.isrecharge;
  if (isrecharge) {
    activePlan = null;
  }
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [oldPlandata, setOldPlandata] = useState(null);
  const [duration, setDuration] = useState("1");
  const [expiryDate, setExpiryDate] = useState("");
  const [oldPlanid, setOldPlanid] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);


  useEffect(() => {
    if (activePlan) {
      setOldPlanid(activePlan._id);
      setOldPlandata(activePlan);
    }
  }, [activePlan]);
  const calculateRemainingDays = (expiryDate) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - currentDate;
    const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));
    return remainingDays;
  };
  useEffect(() => {
    if (oldPlandata?.expiry) {
      const daysLeft = calculateRemainingDays(oldPlandata.expiry);
      console.log(daysLeft, 'daysLeft');

      const calculateDaysLeft = () => {
        setDaysLeft(daysLeft);
      };

      calculateDaysLeft();
      const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60 * 24);
      return () => clearInterval(interval);
    }
  }, [oldPlandata]);


  const calculateExpiryDate = (months) => {
    const date = new Date();
    console.log(months, 'months');
    console.log(date, 'date');

    date.setMonth(date.getMonth() + parseInt(months, 10));
    console.log(date, 'date');
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateTotalAmount = () => {
    if (!selectedPlan) return 0;
    const months = parseInt(duration, 10);
    const baseAmount = selectedPlan.amount;
    let totalAmount;

    // Calculate base amount with discount if available
    if (selectedPlan.discount > 0) {
      totalAmount = (baseAmount - (baseAmount * selectedPlan.discount) / 100) * months;
    } else {
      totalAmount = baseAmount * months;
    }

    // If there's an old plan, subtract the remaining value
    if (oldPlandata && daysLeft !== null) {
      // Calculate daily rate of old plan
      const oldPlanTotalDays = Math.floor((new Date(oldPlandata.expiry) - new Date(oldPlandata.startDate)) / (1000 * 60 * 60 * 24));
      const oldPlanDailyRate = (oldPlandata.subcriptionId?.amount - (oldPlandata.subcriptionId?.amount * oldPlandata.subcriptionId?.discount) / 100) / oldPlanTotalDays;
      const remainingValue = oldPlanDailyRate * daysLeft;

      // Subtract remaining value from new plan total
      totalAmount = totalAmount - remainingValue;
    }

    return totalAmount;
  };

  useEffect(() => {
    // const location = useLocation();
    const planid = location.state?.planid;

    if (!planid) {
      navigate("/subscription-active");
    }

    // const searchParams = new URLSearchParams(location.search);
    // const planFromUrl = searchParams.get("plan");
    setPlanId(planid);

    const plan = plans.find((p) => p._id === planid) || navigate("/subscription-active");
    setSelectedPlan(plan);
  }, [location, plans]);

  useEffect(() => {
    if (selectedPlan && duration) {
      console.log(duration, 'duration');
      const calculatedDate = calculateExpiryDate(duration);
      console.log(calculatedDate, 'calculatedDate');
      setExpiryDate(calculatedDate);
    }
  }, [selectedPlan, duration]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !selectedPlan) return;

    const card = elements.getElement(CardNumberElement);
    console.log(card);
    if (!card) {
      setError("Card element not found.");
      return;
    }

    const amount = calculateTotalAmount();

    try {
      // Call API to get client secret
      const merchantId = await JSON.parse(localStorage.getItem("userData"));
      const { data } = await stripPayment(amount, planId, duration, merchantId._id, expiryDate, oldPlanid);
      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        setError("Client secret not found.");
        return;
      }

      // Confirm the payment using Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: `${merchantId.firstName} ${merchantId.lastName}`, // Replace with dynamic customer name if available
              email: merchantId.email,
              phone: merchantId.contactNumber,
            },
          },
        }
      );
      console.log(paymentIntent);
      console.log(stripeError);

      if (stripeError) {
        setError(stripeError.message); // Display error message
      } else if (paymentIntent.status === "succeeded") {

        setSucceeded(true); // Payment successful
        toast.success("Payment successful");
        navigate("/Merchant-dashboard");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again later.");
    }
  };

  const convertSecondsToMonths = (seconds) => {
    const secInDay = 24 * 60 * 60;
    const daysInMonth = 30.44;
    const months = seconds / secInDay / daysInMonth;
    return months < 1 ? 1 : Math.round(months);
  };

  return (
    <div className="container py-5 bg-[#f8f9fa]">
      <div className="row">
        {/* Plan Details Column */}
        <div className="col-md-6 mt-3">
          <div
            className="card shadow-lg border-0 h-100"
            style={{ borderBottom: "5px solid #221F92" }}
          >
            <div className="card-body p-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Link
                  to="/subscription-active"
                  className="btn flex items-center gap-2 text-white d-none d-md-flex"
                  style={{
                    backgroundColor: "#221F92",
                    borderBottom: "4px solid #1a1863",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1a1863")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#221F92")
                  }
                >
                  <i className="fas fa-arrow-left"></i>
                  Back to Plans
                </Link>
                <Link
                  to="/subscription-active"
                  className="d-md-none"
                  style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "30px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#221F92",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    zIndex: 1000,
                  }}
                >
                  <FaArrowLeft />
                </Link>
                <div className="text-center flex-grow-1">
                  <h2 className="fw-bold mb-2">Plan Details</h2>
                  <div
                    className="mx-auto"
                    style={{
                      width: "60px",
                      height: "4px",
                      background: "#221F92",
                    }}
                  ></div>
                </div>
                <div style={{ width: "120px" }}></div>
              </div>

              {selectedPlan && (
                <>
                  <div className="row">
                    {/* Current/Old Plan */}
                    {oldPlandata && (
                      <div className="col-md-6 mb-4 text-center">
                        <div className="card h-100 border-warning">
                          <div className="card-header bg-warning bg-opacity-10 border-warning">
                            <h5 className="text-warning mb-0">
                              <i className="fas fa-clock me-2"></i>
                              Current Plan
                            </h5>
                          </div>
                          <div className="card-body">
                            <div className="text-center mb-3">
                              <h4 className="text-primary mb-2">
                                {oldPlandata.subcriptionId?.type}
                              </h4>
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                <span className="text-danger line-through">
                                  £{oldPlandata.subcriptionId?.amount}
                                </span>
                                <h3 className="display-6 fw-bold text-success">
                                  £{(oldPlandata.subcriptionId?.amount - (oldPlandata.subcriptionId?.amount * oldPlandata.subcriptionId?.discount) / 100).toFixed(2)}
                                </h3>
                                <span className="text-success ms-1">(-{oldPlandata.subcriptionId?.discount}%)</span>
                              </div>
                              <p className="text-muted mb-2">
                                Expires: {new Date(oldPlandata.expiry).toLocaleDateString()}
                              </p>
                              <div className="days-left-badge">
                                {daysLeft !== null && (
                                  <span className={`badge ${daysLeft <= 7 ? 'bg-danger' : 'bg-warning'} text-white`}>
                                    {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="plan-features">
                              <h6 className="mb-3">Current Features:</h6>
                              <ul className="list-group">
                                {oldPlandata.subcriptionId?.features.map((feature, index) => (
                                  <li key={index} className="list-group-item">
                                    <i className="fas fa-check text-success me-2"></i>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* New Plan */}
                    <div className={`col-md-${oldPlandata ? '6' : '12'} mb-4 text-center`}>
                      <div className="card h-100 border-primary">
                        <div className="card-header bg-primary bg-opacity-10 border-primary">
                          <h5 className="text-primary mb-0">
                            <i className="fas fa-arrow-up-circle me-2"></i>
                            {oldPlandata ? 'New Plan' : 'Selected Plan'}
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="text-center mb-3">
                            <h4 className="text-primary mb-2">
                              {selectedPlan.type}
                            </h4>
                            {selectedPlan.type && (
                              <span className="badge bg-warning ms-2">
                                {selectedPlan.poulartext}
                              </span>
                            )}
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <span className="text-danger line-through">
                                £{selectedPlan.amount}
                              </span>
                              <h3 className="display-6 fw-bold text-success">
                                £{(selectedPlan.amount - (selectedPlan.amount * selectedPlan.discount) / 100).toFixed(2)}
                              </h3>
                              <span className="text-success ms-1">(-{selectedPlan.discount}%)</span>
                            </div>
                            <p className="text-muted">
                              {convertSecondsToMonths(selectedPlan.seconds)} Months
                            </p>
                          </div>
                          <div className="plan-features">
                            <h6 className="mb-3">Features:</h6>
                            <ul className="list-group">
                              {selectedPlan.features.map((feature, index) => (
                                <li key={index} className="list-group-item">
                                  <i className="fas fa-check text-success me-2"></i>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pricing-details mt-3 p-3 bg-light rounded">
                    {oldPlandata ? (
                      <>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-bold">Days Left in Old Plan:</span>
                          <div className="text-end">
                            {daysLeft !== null && (
                              <span className="text-muted">
                                {daysLeft} {daysLeft === 1 ? 'day' : 'days'} remaining
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-bold">Remaining Value of Old Plan:</span>
                          <div className="text-end">
                            {daysLeft !== null && (
                              <span className="text-muted">
                                £ {(((oldPlandata.subcriptionId?.amount - (oldPlandata.subcriptionId?.amount * oldPlandata.subcriptionId?.discount) / 100).toFixed(2)) / Math.floor((new Date(oldPlandata.expiry) - new Date(oldPlandata.startDate)) / (1000 * 60 * 60 * 24)) * daysLeft).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-bold">New Plan Base Price:</span>
                          <div className="text-end">
                            {selectedPlan.discount > 0 ? (
                              <>
                                <span className="text-danger line-through me-2">£{selectedPlan.amount}</span>
                                <span className="text-success">
                                  £{(selectedPlan.amount - (selectedPlan.amount * selectedPlan.discount) / 100).toFixed(2)}
                                </span>
                                <span className="text-success ms-1">(-{selectedPlan.discount}%)</span>
                              </>
                            ) : (
                              <span>£{selectedPlan.amount}/month</span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-bold">Price Difference:</span>
                          <div className="text-end">
                            {daysLeft !== null && (
                              <span className="text-muted">
                                £{(
                                  ((oldPlandata.subcriptionId?.amount -
                                    (oldPlandata.subcriptionId?.amount * oldPlandata.subcriptionId?.discount) / 100) /
                                    Math.floor((new Date(oldPlandata.expiry) - new Date(oldPlandata.startDate)) /
                                      (1000 * 60 * 60 * 24)) * daysLeft)
                                ).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-4 pt-3 border-top">
                          <div>
                            <h5 className="mb-1">Total Amount</h5>
                          </div>
                          <div className="text-end">
                            <h4 className="mb-0">
                              <span className="text-[#7c7c7c]">£{(selectedPlan.amount - (selectedPlan.amount * selectedPlan.discount) / 100).toFixed(2)}</span>
                              <span className="text-[#7c7c7c]"> - </span>
                              <span className="text-[#7c7c7c]">£{(
                                ((oldPlandata.subcriptionId?.amount -
                                  (oldPlandata.subcriptionId?.amount * oldPlandata.subcriptionId?.discount) / 100) /
                                  Math.floor((new Date(oldPlandata.expiry) - new Date(oldPlandata.startDate)) /
                                    (1000 * 60 * 60 * 24)) * daysLeft)
                              ).toFixed(2)}</span>
                              <span className="text-[#7c7c7c]"> = </span>
                              <span className={`${calculateTotalAmount() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                £{calculateTotalAmount().toFixed(2)}
                              </span>
                            </h4>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-bold">Base Price:</span>
                          <div className="text-end">
                            {selectedPlan.discount > 0 ? (
                              <>
                                <span className="text-danger line-through me-2">£{selectedPlan.amount}</span>
                                <span className="text-success">
                                  £{(selectedPlan.amount - (selectedPlan.amount * selectedPlan.discount) / 100).toFixed(2)}
                                </span>
                                <span className="text-success ms-1">(-{selectedPlan.discount}%)</span>
                              </>
                            ) : (
                              <span>£{selectedPlan.amount}/month</span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-bold">Duration:</span>
                          <span>
                            {convertSecondsToMonths(selectedPlan.seconds)} Months
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">Start Date:</span>
                            <span>
                              {expiry ? new Date(expiry).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }) : new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">Expiry Date:</span>
                            <span>
                              {expiry ? 
                                new Date(new Date(expiry).getTime() + selectedPlan.seconds * 1000).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }) : 
                                new Date(new Date().getTime() + selectedPlan.seconds * 1000).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long", 
                                  day: "numeric",
                                })
                              }
                            </span>
                          </div>
                        <div className="d-flex justify-content-between fw-bold mt-4 pt-3 border-top">
                          <div>
                            <h5 className="mb-1">Total Amount</h5>
                          </div>
                          <div className="text-end">
                            <h4 className="mb-0">
                              <span className={`${calculateTotalAmount() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                £{calculateTotalAmount().toFixed(2)}
                              </span>
                            </h4>
                          </div>
                        </div>
                      </>
                    )}

                  </div>

                  {
                    oldPlandata && (
                      <>
                        <div className="text-center mt-3">
                          <h5 className="fw-bold">Now plan details</h5>
                        </div>
                        <div className="pricing-details  p-3 bg-light rounded">
                          {/* <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">Base Price:</span>
                            <div className="text-end">
                              {selectedPlan.discount > 0 ? (
                                <>
                                  <span className="text-danger line-through me-2">£{selectedPlan.amount}</span>
                                  <span className="text-success">
                                    £{(selectedPlan.amount - (selectedPlan.amount * selectedPlan.discount) / 100).toFixed(2)}
                                  </span>
                                  <span className="text-success ms-1">(-{selectedPlan.discount}%)</span>
                                </>
                              ) : (
                                <span>£{selectedPlan.amount}/month</span>
                              )}
                            </div>
                          </div> */}
                          <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">Duration:</span>
                            <span>
                              {convertSecondsToMonths(selectedPlan.seconds)} Months
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">Start Date:</span>
                            <span>
                              {new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">Expiry Date:</span>
                            <span>{new Date(new Date().getTime() + selectedPlan.seconds * 1000).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}</span>
                          </div>
                          <div className="d-flex justify-content-between fw-bold mt-4 pt-3 border-top">
                            <div>
                              <h5 className="mb-1">Bying Amount</h5>
                            </div>
                            <div className="text-end">
                              <h4 className="mb-0">
                                <span className={`${calculateTotalAmount() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  £{calculateTotalAmount().toFixed(2)}
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                </>
              )}
            </div>
          </div>
        </div>

        {/* Payment Form Column */}
        <div className="col-md-6 pt-3 md:mt-0 sm:mt-5">
          <div
            className="card shadow-lg border-0"
            style={{ borderBottom: "5px solid #221F92" }}
          >
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Payment Details</h2>
                <div
                  className="mx-auto"
                  style={{
                    width: "60px",
                    height: "4px",
                    background: "#221F92",
                  }}
                ></div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <CardNumberElement
                    id="cardNumber"
                    className="form-control p-3"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                      showIcon: true,
                    }}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label" htmlFor="cardExpiry">
                        Expiry Date
                      </label>
                      <CardExpiryElement
                        id="cardExpiry"
                        className="form-control p-3"
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label" htmlFor="cardCvc">
                        CVC
                      </label>
                      <CardCvcElement
                        id="cardCvc"
                        className="form-control p-3"
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="btn w-100 py-2 fw-bold text-white"
                  type="submit"
                  disabled={!stripe || !selectedPlan}
                  style={{
                    backgroundColor: "#221F92",
                    borderBottom: "4px solid #1a1863",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1a1863")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#221F92")
                  }
                >
                  Pay £{calculateTotalAmount().toFixed(2)}
                </button>

                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}

                {succeeded && (
                  <div className="alert alert-success mt-3" role="alert">
                    Payment Successful!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutForm.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      period: PropTypes.string.isRequired,
      popular: PropTypes.bool,
      features: PropTypes.shape({
        websites: PropTypes.string.isRequired,
        storage: PropTypes.string.isRequired,
        database: PropTypes.string.isRequired,
        bandwidth: PropTypes.bool.isRequired,
        ssd: PropTypes.bool.isRequired,
        vcpus: PropTypes.bool.isRequired,
        wordpress: PropTypes.bool.isRequired,
        speed: PropTypes.bool.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

const PaymentPage = ({ plans, activePlan, expiry }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm plans={plans} activePlan={activePlan} expiry={expiry} />
  </Elements>
);

PaymentPage.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      period: PropTypes.string.isRequired,
      features: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default PaymentPage;
