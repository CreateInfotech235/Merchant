import { Routes, Route } from "react-router-dom";
// import GetSubscription from "./getSubscription";
import Subscriptionactiveplan from "./Subscriptionactiveplan";
import PaymentPage from "./PymentPage";
import { getAllSubscription } from "../../Components_merchant/Api/Subscription";
import { useEffect, useState } from "react";

function SubscriptionActive() {
  const plans = [
    {
      _id: "1",
      name: 'Team',
      price: 99,
      period: 'Per month',
      features: {
        websites: '10',
        storage: '500 GB',
        database: '15',
        bandwidth: true,
        ssd: false,
        vcpus: false,
        wordpress: false,
        speed: false
      }
    },
    {
      _id: "2",
      name: 'Popular',
      price: 150,
      period: 'For six month',
      popular: true,
      features: {
        websites: '50',
        storage: '1 TB',
        database: 'Unlimited',
        bandwidth: true,
        ssd: true,
        vcpus: true,
        wordpress: true,
        speed: true
      }
    },
    {
      _id: "3",
      name: 'Enterprise',
      price: 490,
      period: 'For one month',
      features: {
        websites: 'Unlimited',
        storage: 'Unlimited',
        database: 'Unlimited',
        bandwidth: true,
        ssd: true,
        vcpus: true,
        wordpress: true,
        speed: true
      }
    }
  ];
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
        <Route path="/" element={<Subscriptionactiveplan plans={subscriptionData} />} />
        <Route path="/payment" element={<PaymentPage plans={subscriptionData} />} />
      </Routes >
    </>
  );
}

export default SubscriptionActive;



