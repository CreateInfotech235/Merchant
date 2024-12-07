import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { formatDateTime } from "../../helper_admin/common"; // Format date helper function

const UnsubscriptionUserPopup = ({ user, onHide }) => {
  if (!user) return null; // Return null if no user is selected

  return (
    <Modal show={true} onHide={onHide}>
      <ModalHeader closeButton>
        <h5>User Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="user-details">
          <div className="row mb-2">
            <label className="col-6">User ID:</label>
            <span className="col-6">{user.userId}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">User Name:</label>
            <span className="col-6">{user.userName}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Email:</label>
            <span className="col-6">{user.email}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Country:</label>
            <span className="col-6">{user.countryCode}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">City:</label>
            <span className="col-6">{user.city || "N/A"}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Contact Number:</label>
            <span className="col-6">{user.contactNumber}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Register Date:</label>
            <span className="col-6">{formatDateTime(user.registerDate)}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Status:</label>
            <span className="col-6">{user.status === "ENABLE" ? "Enabled" : "Disabled"}</span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UnsubscriptionUserPopup;
