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

const CheckoutForm = ({ plans }) => {
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [duration, setDuration] = useState("1");
  const [expiryDate, setExpiryDate] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const calculateExpiryDate = (months) => {
    const date = new Date();
    date.setMonth(date.getMonth() + parseInt(months, 10));
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateTotalAmount = () => {
    if (!selectedPlan) return 0;
    const months = parseInt(duration, 10);
    return selectedPlan.amount * months;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const planFromUrl = searchParams.get("plan");
    setPlanId(planFromUrl);

    const plan = plans.find((p) => p._id === planFromUrl) || plans[0];
    setSelectedPlan(plan);
  }, [location, plans]);

  useEffect(() => {
    if (selectedPlan && duration) {
      const calculatedDate = calculateExpiryDate(duration);
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
      const { data } = await stripPayment(amount, planId, duration,merchantId._id, expiryDate);
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
                  <div className="plan-header mb-4 text-center d-md-block d-flex flex-column align-items-center">
                    <div className="d-flex align-items-center justify-content-center flex-column gap-2">
                      <h4 className="text-primary mb-0">
                        {selectedPlan.type} Plan
                      </h4>
                      {selectedPlan.type && (
                        <span className="badge bg-warning ms-2 d-none d-md-inline">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <h3 className="display-6 fw-bold">
                      £{selectedPlan.amount}
                    </h3>
                    <p className="text-muted">
                      {convertSecondsToMonths(selectedPlan.seconds)} Months
                    </p>
                    {selectedPlan.type && (
                      <span className="badge bg-warning d-md-none">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="plan-features mb-4">
                    <h5 className="mb-3 text-center d-md-block">
                      Plan Features:
                    </h5>
                    <ul className="list-group">
                      {selectedPlan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="list-group-item text-center d-md-block"
                        >
                          <i className="fas fa-check text-success me-2"></i>
                          {feature}
                        </li>
                      ))}
                      {selectedPlan.features.bandwidth && (
                        <li className="list-group-item text-center d-md-block">
                          <i className="fas fa-check text-success me-2"></i>
                          Unlimited Bandwidth
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pricing-details mt-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Base Price:</span>
                      <span>£{selectedPlan.amount}/month</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Duration:</span>
                      <span>
                        {convertSecondsToMonths(selectedPlan.seconds)} Months
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Start Date:</span>
                      <span>
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Expiry Date:</span>
                      <span>{expiryDate}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold mt-2 pt-2 border-top">
                      <span>Total Amount:</span>
                      <span>£{calculateTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>
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

const PaymentPage = ({ plans }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm plans={plans} />
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
