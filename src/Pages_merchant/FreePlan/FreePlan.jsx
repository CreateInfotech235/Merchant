
import { useEffect, useState } from "react";
import { SubscriptionInfo } from "../../Components_merchant/Api/Subscription";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubscriptionPlanModel from "../SubscriptionPlan/SubscriptionPlanModel";


const FreePlan = () => {
  const [showModel, setShowModel] = useState(false);
  const [subcriptionData, setSubcriptionData] = useState([]);
  const [expiredPopup, setExpiredPopup] = useState(false);
  const navigate = useNavigate()
  const handleShowModal = (data) => {
    setShowModel(true);
  };

  const handleCloseModel = () => {
    setShowModel(false);
  };

//   const fetchSubscriptionInfo = async (id) => {
//     const response = await SubscriptionInfo(id);
//     console.log(response.data, "Data");
//     setSubcriptionData(response.data);

//     if (response.data.length > 0) {
//       setExpiredPopup(true)
//     }
//   };

//   useEffect(() => {
//     const MerchantId = localStorage.getItem("merchnatId");
//     fetchSubscriptionInfo(MerchantId);
//   }, []); // Only run this once on mount
  return (
    <>
    <Modal show={expiredPopup} >
        <Modal.Header >
          <Modal.Title>Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Your other plan has alrady active so you can not able to buy any more plan.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => navigate('/subscription-active')}>
            Active Plan
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Free Plan</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title">
            {`$0`}
            <small className="text-muted">/ mo</small>
          </h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>"30 users included",</li>
            <li>"15 GB storage",</li>
            <li>"Phone and email support",</li>
            <li>"Help center access"</li>
          </ul>
          <button
            className={`btn btn-lg btn-block ${
              true ? "btn-outline-primary" : "btn-primary"
            }`}
            type="button"
            onClick={() => handleShowModal()}
          >
            Sign up for free
          </button>
        </div>
        {showModel && <SubscriptionPlanModel onHide={handleCloseModel} />}
      </div>
    </>
  );
};

export default FreePlan;
