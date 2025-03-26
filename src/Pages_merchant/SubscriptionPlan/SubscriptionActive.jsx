import { Routes, Route } from "react-router-dom";
// import GetSubscription from "./getSubscription";
import Subscriptionactiveplan from "./Subscriptionactiveplan";
import PaymentPage from "./PymentPage";
import { getAllSubscription } from "../../Components_merchant/Api/Subscription";
import { useEffect, useState } from "react";

function SubscriptionActive() {

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Subscriptionactiveplan plans={subscriptionData} />}
        />
        <Route
          path="/payment"
          element={<PaymentPage plans={subscriptionData} />}
        />
      </Routes>
    </>
  );
}

export default SubscriptionActive;
