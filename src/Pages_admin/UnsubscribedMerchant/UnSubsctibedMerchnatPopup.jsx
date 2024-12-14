import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { formatDateTime } from "../../helper_admin/common";

const UnsubscriptionUserPopup = ({ user, onHide }) => {
  if (!user) return null;
  console.log(user);
  

  return (
    <Modal show={true} onHide={onHide} centered>
      <ModalHeader closeButton className="border-0">
        <h5 className="modal-title fw-bold" style={{color: "#253A71"}}>User Details</h5>
      </ModalHeader>
      <ModalBody className="px-4 py-3">
        <div className="user-details">
          <div className="d-flex align-items-center mb-3 p-2" style={{background: "#F8F9FA", borderRadius: "8px"}}>
            <label className="fw-semibold me-3" style={{minWidth: "140px", color: "#6C757D"}}>User ID:</label>
            <span className="text-dark">{user.userId}</span>
          </div>
          
          <div className="d-flex align-items-center mb-3 p-2" style={{background: "#F8F9FA", borderRadius: "8px"}}>
            <label className="fw-semibold me-3" style={{minWidth: "140px", color: "#6C757D"}}>User Name:</label>
            <span className="text-dark">{user.firstName} {user.lastName}</span>
          </div>

          <div className="d-flex align-items-center mb-3 p-2" style={{background: "#F8F9FA", borderRadius: "8px"}}>
            <label className="fw-semibold me-3" style={{minWidth: "140px", color: "#6C757D"}}>Email:</label>
            <span className="text-dark">{user.email}</span>
          </div>

          <div className="d-flex align-items-center mb-3 p-2" style={{background: "#F8F9FA", borderRadius: "8px"}}>
            <label className="fw-semibold me-3" style={{minWidth: "140px", color: "#6C757D"}}>Country:</label>
            <span className="text-dark">{user.countryCode}</span>
          </div>

          <div className="d-flex align-items-center mb-3 p-2" style={{background: "#F8F9FA", borderRadius: "8px"}}>
            <label className="fw-semibold me-3" style={{minWidth: "140px", color: "#6C757D"}}>City:</label>
            <span className="text-dark">{user.city || "N/A"}</span>
          </div>

          <div className="d-flex align-items-center mb-3 p-2" style={{background: "#F8F9FA", borderRadius: "8px"}}>
            <label className="fw-semibold me-3" style={{minWidth: "140px", color: "#6C757D"}}>Contact Number:</label>
            <span className="text-dark">{user.contactNumber}</span>
          </div>

          <div className="d-flex align-items-center mb-3 p-2" style={{background: "#F8F9FA", borderRadius: "8px"}}>
            <label className="fw-semibold me-3" style={{minWidth: "140px", color: "#6C757D"}}>Register Date:</label>
            <span className="text-dark">{formatDateTime(user.registerDate)}</span>
          </div>

          <div className="d-flex align-items-center mb-3 p-2" style={{background: "#F8F9FA", borderRadius: "8px"}}>
            <label className="fw-semibold me-3" style={{minWidth: "140px", color: "#6C757D"}}>Status:</label>
            <span className={`badge ${user.status === "ENABLE" ? "bg-success" : "bg-danger"}`}>
              {user.status}
            </span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UnsubscriptionUserPopup;
