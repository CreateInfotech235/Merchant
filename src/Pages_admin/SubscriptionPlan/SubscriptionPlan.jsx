import React, { useEffect, useState } from "react";
import SubscriptionModel from "./SubscriptionModel";
import { getAllSubscription } from "../../Components_admin/Api/Subscription";
import Loader from "../../Components_admin/Loader/Loader";
import { FaEdit, FaCheck, FaPlus } from 'react-icons/fa';

function SubscriptionPlan() {
  const [showModel, setShowModel] = useState(false);
  const [type, setType] = useState();
  const [subcriptionData, setSubcriptionData] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const getallSubscriptions = async () => {
    setLoading(true);
    const response = await getAllSubscription(0, 0);
    console.log(response.data);
    if (response.status) {
      setSubcriptionData(response.data);
      setLoading(false);
    }
    //   console.log(response.data);
  };
  useEffect(() => {
    getallSubscriptions();
  }, []);

  // Add new useEffect to handle body scroll
  useEffect(() => {
    if (showModel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModel]);

  // console.log(subcriptionData);

  const handleShowModal = (data) => {
    setType("Edit"); // Ensure the type is set explicitly
    setSelectedSubscription(data);
    setShowModel(true);
  };

  const handleShowModal1 = () => {
    setType("Add");
    setSelectedSubscription(null); // Clear previous subscription data
    setShowModel(true);
  };

  const handleCloseModal = () => {
    // setSelectedOrder({});
    setShowModel(false);
    setType(null);
    setSelectedSubscription(null);
    // getallSubscriptions();
  };

  const monthCalcuation = (milliseconds) => {
    const msInADay = 24 * 60 * 60 * 1000; // 86,400,000 ms
    const daysInAMonth = 30.44; // Average days in a month
    const msInAMonth = msInADay * daysInAMonth; // 2,629,746,000 ms
    if (milliseconds) {
      const months = milliseconds / msInAMonth;
      return months.toFixed(2);
    } else {
      return null;
    }
  };
  const convertSecondsToMonths = (seconds) => {
    // Number of seconds in a day
    const secInDay = 24 * 60 * 60;

    // Average days in a month (approx.)
    const daysInMonth = 30.44;

    // Convert seconds to months
    const months = seconds / secInDay / daysInMonth;

    // If the result is less than 1, round it to 1
    return months < 1 ? 1 : Math.round(months);
  };

  return (
    <div className="w-100 min-h-[calc(100vh-187px)] p-4">
      <div className="w-100 d-flex justify-content-end mb-4">
        <button
          className="p-3 rounded bg-[#253A71] text-white flex items-center gap-2 hover:bg-[#1a2a57] transition-colors"
          onClick={() => handleShowModal1("Add")}
        >
          <FaPlus /> Add Subscription
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {loading && <Loader />}
          <div className="subscription d-flex fluid-container W-100 align-items-center">
            <div className="row justify-content-center w-100 gap-4">
              {subcriptionData.sort((a, b) => a.isDesable - b.isDesable).map((el, i) => (
                <div
                  key={i}
                  className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 p-4 rounded-lg m-2 shadow-lg hover:shadow-xl transition-shadow"
                  style={{
                    background: !el.isDesable ? "linear-gradient(145deg, #CCD6B1, #F0F4E5FF)" : "linear-gradient(145deg, #C5C5C5FF, #D9D9D9FF)",
                    width: "330px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onDoubleClick={() => handleShowModal(el)}
                >
                  <div>
                    <div className="d-flex justify-content-end pb-3">
                      <button
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                        onClick={() => handleShowModal(el)}
                      >
                        <FaEdit size={20} className="text-[#253A71]" />
                      </button>
                    </div>
                    <h5 className="fw-bold text-center text-xl mb-3">{el.type}</h5>
                    <h1 className="fw-bold text-center text-4xl mb-2">
                      {el.discount > 0 ? (
                        <>
                          <span className="line-through text-gray-500 text-2xl">${el.amount}</span>
                          <span className="ml-2">
                            ${(el.amount - (el.amount * el.discount) / 100).toFixed(2)}
                          </span>
                          <span className="text-green-600 text-lg ml-2">(-{el.discount}%)</span>
                        </>
                      ) : (
                        `$${el.amount}`
                      )}
                    </h1>
                    <p className="fw-bold text-center text-gray-700 mb-4">
                      {el.seconds < (30 * 24 * 60 * 60) ? (
                        `Per ${Math.floor(el.seconds / (24 * 60 * 60))} Days`
                      ) : (
                        `Per ${convertSecondsToMonths(el.seconds)} Months`
                      )}
                    </p>

                    <p className="fw-bold text-center text-gray-700 mb-0">
                      {el.isDesable ? "Inactive" : "Active to use"}
                    </p>

                    <div className="d-flex flex-column align-items-start p-3">
                      {el.features.map((features, i) => (
                        <div key={i} className="d-flex items-center gap-3 mb-2">
                          <FaCheck className="text-green-600" />
                          <p className="m-0">{features}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {showModel && (
              <SubscriptionModel
                subscription={selectedSubscription}
                onHide={handleCloseModal}
                onUpdate={getallSubscriptions}
                types={type}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SubscriptionPlan;
