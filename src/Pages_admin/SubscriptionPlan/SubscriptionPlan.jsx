import React, { useEffect, useState } from "react";
import SubscriptionModel from "./SubscriptionModel";
import { getAllSubscription } from "../../Components_admin/Api/Subscription";
import Loader from "../../Components_admin/Loader/Loader";
function SubscriptionPlan() {
  const [showModel, setShowModel] = useState(false);
  const [type, setType] = useState();
  const [subcriptionData, setSubcriptionData] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const getallSubscriptions = async () => {
    setLoading(true)
    const response = await getAllSubscription(0, 0);
    if (response.status) {
      setSubcriptionData(response.data);
      setLoading(false)
    }
    //   console.log(response.data);
  };
  useEffect(() => {
    getallSubscriptions();
  }, []);

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
    getallSubscriptions()
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
    const months = (seconds / secInDay) / daysInMonth;
  
    // If the result is less than 1, round it to 1
    return months < 1 ? 1 : Math.round(months);
  };
  
  return (
    <div className="w-100 h-[calc(100vh-187px)]">
      <div className="w-100 d-flex justify-content-end ">
        <button className="p-2 rounded bg-[#253A71] text-white" onClick={() => handleShowModal1("Add")}>
          Add Subscription
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {loading && <Loader />}
      <div className="subscription  d-flex fluid-container W-100   align-items-center;">
        <div className="row justify-content-center w-100 ">
          {subcriptionData.map((el, i) => (
            <div
              key={i}
              className="col-xxl-2 col-xl-3 col-lg-4 col-md-4  col-sm-6 col-12 p-3 rounded-4 m-3"
              style={{ background: "#CCD6B1", width: "330px" }}
            >
              <div className="d-flex justify-content-end pb-5">
                <button
                  className="bg-transparent border-0"
                  onClick={() => handleShowModal(el)}
                >
                  <img src="./src/assets_admin/subscription-edit.svg" />
                </button>
              </div>
              <h5 className="fw-bold text-center">{el.type}</h5>
              <h1 className="fw-bold text-center">${el.amount}</h1>
              <p className="fw-bold text-center">per agent per {convertSecondsToMonths(el.seconds)} Months</p>
              {/* monthCalcuation */}

              <div className="d-flex flex-column align-items-start p-3">
                {el.features.map((features, i) => (
                  <div
                    key={i}
                      className="d-flex "
                  >
                    <img src="./src/assets_admin/checkbox.svg" className="pe-3" />{" "}
                    <p>{features}</p>{" "}
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                  <button className="btn btn-primary m-4">purchase now</button>
              </div>
            </div>
          ))}
        </div>
        {showModel && (
          <SubscriptionModel
            subscription={selectedSubscription}
            onHide={handleCloseModal}
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
