import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getAllSubscription } from "../../Components_merchant/Api/Subscription";
import { BsCheckCircleFill } from 'react-icons/bs';
import "./SubscriptionPlan1.css";

const SubscriptionPlan1 = ({ plans, subcriptionData }) => {
  const [activePlan, setActivePlan] = useState(null);


  useEffect(() => {
    if (subcriptionData && subcriptionData?.length > 0) {
      const currentDate = new Date();
      const active = subcriptionData?.find(sub => {
        const expiryDate = new Date(sub.expiry);
        const startDate = sub.startDate ? new Date(sub.startDate) : null;
        return expiryDate > currentDate && (!startDate || startDate < currentDate);
      });
      setActivePlan(active);
    }
  }, [subcriptionData]);

  const convertSecondsToMonths = (seconds) => {
    // Number of seconds in a day
    const secInDay = 24 * 60 * 60;

    // Average days in a month (approx.)
    const daysInMonth = 30.44;

    // Convert seconds to months
    const months = (seconds / secInDay) / daysInMonth;

    // If the result is less than 1, round it to 1
    return months < 1 ? 1 : Math.round(months);
  };

  return (
    <section className="  bg-gradient-to-br ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Subscription Plans
          </h2>
          {activePlan && (
            <div className="bg-blue-50 border-2 border-blue-400 rounded-2xl p-6 mt-3 shadow-lg">
              <h5 className="text-blue-600 text-xl font-semibold">Current Active Plan: {activePlan.subcriptionId.type}</h5>
              <p className="mb-0">Expires: {new Date(activePlan.expiry).toLocaleDateString()}</p>
            </div>
          )}
          <p className="text-gray-600 text-xl">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans
            .filter(plan => {
              if (plan.type === "1 Month Free Trial") return false;
              if (subcriptionData?.subcriptionId?._id === plan._id) return true;
              if (plan.isDesable && activePlan?.subcriptionId?._id !== plan._id) return false;
              return true;
            })
            .sort((a, b) => a.amount - b.amount)
            .map((plan, i) => (
              <div key={i} className="flex flex-col">
                <div className={`card-glass h-full rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 
                  ${plan._id.toString() === subcriptionData?.subcriptionId?._id.toString()
                    ? 'border-2 border-green-400 bg-gradient-to-br  from-[#cdffd5] to-[#f0f0f0]'
                    : 'border border-gray-100 bg-white'
                  }`}>
                  <div className="mb-4">
                    {plan.type && (
                      <span className="float-right px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                        {i == 1 ? 'Popular' : 'Normal'}
                      </span>
                    )}
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      {plan.type}
                    </h4>
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-green-500">£{plan.amount}</span>
                    <span className="text-gray-500">/{convertSecondsToMonths(plan.seconds)} Months</span>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-1 hover:bg-blue-50 rounded-lg transition-colors">
                        <BsCheckCircleFill className="text-green-500 mr-2" size={14} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link
                      to={plan.isDesable ? '#' : `/subscription-active/Payment`}
                      state={{ plan: plan }}
                      className={`w-full py-2 px-4 rounded-full font-semibold text-white text-center block transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                        ${plan._id.toString() === subcriptionData?.subcriptionId?._id.toString()
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                          : (plan.amount < subcriptionData?.subcriptionId?.amount
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : 'bg-gradient-to-r from-orange-400 to-orange-600')
                        }`}
                      onClick={plan.isDesable ? (e) => e.preventDefault() : undefined}
                    >
                      {plan._id.toString() === subcriptionData?.subcriptionId?._id.toString()
                        ? 'Active Plan'
                        : (plan.amount < subcriptionData?.subcriptionId?.amount
                          ? 'Choose Plan'
                          : 'Upgrade Plan')
                      }
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

SubscriptionPlan1.propTypes = {
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
        speed: PropTypes.bool.isRequired
      }).isRequired
    })
  ).isRequired,
  subcriptionData: PropTypes.array
};

export default SubscriptionPlan1;
