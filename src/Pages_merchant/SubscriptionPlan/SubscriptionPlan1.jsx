import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getAllSubscription } from "../../Components_merchant/Api/Subscription";

const SubscriptionPlan1 = ({ plans }) => {

  // console.log(plans);
  
  
  
  const featureLabels = {
    websites: 'Website number',
    storage: 'Server storage',
    database: 'Database', 
    bandwidth: 'Unmetered Bandwidth',
    ssd: 'SSD Disk',
    vcpus: 'VCPUS Fontworld',
    wordpress: 'WordPress install',
    speed: 'Server speed'
  };
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
    <section className="py-4">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="text-secondary" style={{fontSize: '2.5rem'}}>Subscription Plans</h2>
          <p className="text-muted" style={{fontSize: '1.2rem'}}>
            Choose the plan that works best for you
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {plans.filter(plan => plan.type !== "1 Month Free Trial").map((plan, i) => (
            <div key={i} className="col">
              <div className={`card border ${plan.type ? 'border-primary' : 'border-light'} h-100`}>
                <div className="card-header bg-transparent border-bottom-0 pt-4">
                  {plan.type && (
                    <span className="badge bg-primary float-end fs-6">Popular</span>
                  )}
                  <h4 className="mb-0 text-secondary" style={{fontSize: '1.8rem'}}>{plan.type}</h4>
                </div>
                <div className="card-body">
                  <div className="text-center mb-4">
                    <span className="display-5 fw-bold">£{plan.amount}</span>
                    <span className="fs-4 text-muted">/{convertSecondsToMonths(plan.seconds)} Months</span>
                  </div>
                  
                  <div className="fs-5">
                    {/* {Object.entries(featureLabels).map(([key, label]) => (
                      <div key={key} className="d-flex align-items-center mb-3">
                        {typeof plan.features[key] === 'boolean' ? (
                          plan.features[key] ? (
                            <>
                              <i className="bi bi-check2 text-success me-3 fs-4"></i>
                              <span>{label}</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-dash text-muted me-3 fs-4"></i>
                              <span className="text-muted">{label}</span>
                            </>
                          )
                        ) : (
                          <>
                            <i className="bi bi-check2 text-success me-3 fs-4"></i>
                            <span>{label}: {plan.features[key]}</span>
                          </>
                        )}
                      </div>
                    ))} */}
                    {plan.features.map((feature, index) => (
                      <div key={index} className="d-flex align-items-center mb-3">
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top-0 pb-4">
                  <Link 
                    to={`/subscription-active/Payment/?plan=${plan._id}`}
                    className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline-secondary'} w-100 fs-5 py-2`}
                  >
                    Choose Plan
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
  ).isRequired
};

export default SubscriptionPlan1;
