import React, { useEffect, useState } from "react";
import SubscriptionModel from "./SubscriptionModel";
import { getAllSubscription } from "../../Components_admin/Api/Subscription";
function SubscriptionPlan() {
  const [showModel, setShowModel] = useState(false);
  const [type, setType] = useState();
  const [subcriptionData, setSubcriptionData] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const getallSubscriptions = async () => {
    const response = await getAllSubscription(0, 0);
    if (response.status) {
      setSubcriptionData(response.data);
    }
    //   console.log(response.data);
  };
  useEffect(() => {
    getallSubscriptions();
  }, [showModel]);

  console.log(subcriptionData);

  const handleShowModal = (data) => {
    setType(type);
    setSelectedSubscription(data);
    setShowModel(true);
  };
  const handleShowModal1 = (type) => {
    setType(type);

    setShowModel(true);
  };
  const handleCloseModal = () => {
    // setSelectedOrder({});
    setShowModel(false);
    setType(null);
    setSelectedSubscription(null);
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
  return (
    <div className="w-100">
      <div className="w-100 d-flex justify-content-end">
        <button className="p-2 rounded" onClick={() => handleShowModal1("Add")}>
          Add Subscription
        </button>
      </div>
      <div className="subscription  d-flex fluid-container W-100   align-items-center;">
        <div className="row justify-content-center w-100 ">
          {subcriptionData.map((el, i) => (
            <div
              key={i}
              class="col-xxl-2 col-xl-3 col-lg-4 col-md-4  col-sm-6 col-12 p-3 rounded-4 m-3"
              style={{ background: "#CCD6B1", width: "330px" }}
            >
              <div class="d-flex justify-content-end pb-5">
                <button
                  className="bg-transparent border-0"
                  onClick={() => handleShowModal(el)}
                >
                  <img src="./src/assets/subscription-edit.svg" />
                </button>
              </div>
              <h5 class="fw-bold text-center">{el.type}</h5>
              <h1 class="fw-bold text-center">${el.amount}</h1>
              <p class="fw-bold text-center">per agent per {el.seconds} days</p>
              {/* monthCalcuation */}

              <div class="d-flex flex-column align-items-center p-3">
                {el.features.map((features, i) => (
                  <div
                    key={i}
                    class="d-flex align-items-center align-content-center "
                  >
                    <img src="./src/assets/checkbox.svg" class="pe-3" />{" "}
                    <p>{features}</p>{" "}
                  </div>
                ))}
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-primary m-4">purchase now</button>
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
    </div>
  );
}

export default SubscriptionPlan;
