import { Routes, Route, data } from "react-router-dom";
// import GetSubscription from "./getSubscription";
import Subscriptionactiveplan from "./Subscriptionactiveplan";
import PaymentPage from "./PymentPage";
import { getAllSubscription, SubscriptionData } from "../../Components_merchant/Api/Subscription";
import { useEffect, useState } from "react";

function SubscriptionActive() {

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // active plan
  const [activePlan, setActivePlan] = useState(null);
  const [show, setShow] = useState(true);
  const [subcriptionData, setSubcriptionData] = useState(null);
  const [pandingPlan, setPandingPlan] = useState(null);




  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getAllSubscription(); // Adjust page and limit as needed
        // console.log(response.data);
        if (response.status) {
          setSubscriptionData(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to fetch subscription data");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);
  console.log("subscriptionData", subscriptionData);

  const calculateRemainingDays = (expiryDate) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - currentDate;
    const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));
    return remainingDays;
  };
  const findActivePlan = (subscriptions) => {
    const currentDate = new Date();
    return subscriptions.find(sub => {
      const isNotExpired = calculateRemainingDays(sub.expiry) > 0;
      const hasStarted = !sub.startDate || new Date(sub.startDate) < currentDate;
      return isNotExpired && hasStarted;
    });
  };
  const isPandingPlan = (subscriptions) => {
    const currentDate = new Date();
    return subscriptions.some(sub => {
      const startDate = new Date(sub.startDate);
      return currentDate < startDate;
    });
  };

  const fetchSubscriptionInfo = async (id) => {
    try {
      setLoading(true);
      const response = await SubscriptionData(id);
      if (response.show) {
        setSubcriptionData(response.data);
        const active = findActivePlan(response.data);
        const panding = isPandingPlan(response.data);        
        setActivePlan(active);
        setPandingPlan(panding);
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


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Subscriptionactiveplan plans={subscriptionData} pandingPlan={pandingPlan} />}
        />
        <Route
          path="/payment"
          element={<PaymentPage plans={subscriptionData} activePlan={activePlan} expiry={activePlan?.expiry} />}
        />
      </Routes>
    </>
  );
}

export default SubscriptionActive;
