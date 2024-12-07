import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { formatDateTime } from "../../helper_admin/common"; // Import the helper function to format dates

const SubscriptionMerchantModal = ({ subscription, onHide }) => {
  if (!subscription) return null; // Return null if no subscription is selected

  return (
    <Modal show={true} onHide={onHide}>
      <ModalHeader closeButton>
        <h5>Subscription Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="subscription-details">
          <div className="row mb-2">
            <label className="col-6">Subscription Type:</label>
            <span className="col-6">{subscription.type}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Seconds:</label>
            <span className="col-6">{subscription.seconds}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Amount:</label>
            <span className="col-6">{subscription.amount}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Active Status:</label>
            <span className="col-6">{subscription.isActive ? "Active" : "Disabled"}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Created Date:</label>
            <span className="col-6">{formatDateTime(subscription.createdDate)}</span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SubscriptionMerchantModal;
