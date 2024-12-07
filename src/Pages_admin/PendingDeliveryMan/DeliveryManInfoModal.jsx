import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap";

const DeliveryManInfoModal = ({ deliveryman, onHide }) => {
  if (!deliveryman) return null;

  return (
    <Modal show={true} onHide={onHide} centered>
      <ModalHeader closeButton>
        <h5>Delivery Man Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="delivery-details">
          <div className="row mb-2">
            <label className="col-6">Name:</label>
            <span className="col-6">{deliveryman.name}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Contact Number:</label>
            <span className="col-6">{deliveryman.countryCode} {deliveryman.contactNumber}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Email:</label>
            <span className="col-6">{deliveryman.email}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Country:</label>
            <span className="col-6">{deliveryman.country || '-'}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">City:</label>
            <span className="col-6">{deliveryman.city || '-'}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Register Date:</label>
            <span className="col-6">{new Date(deliveryman.registerDate).toLocaleString()}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Status:</label>
            <span className="col-6">{deliveryman.status}</span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeliveryManInfoModal;
