import { Routes, Route } from "react-router-dom";
// import GetSubscription from "./getSubscription";
import Subscriptionactiveplan from "./Subscriptionactiveplan";
import PaymentPage from "./PymentPage";

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


  return (
    <>
      <Routes>
        <Route path="/" element={<Subscriptionactiveplan plans={plans} />} />
        <Route path="/payment" element={<PaymentPage plans={plans} />} />
      </Routes >
    </>
  );
}

export default SubscriptionActive;



