import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap";

const CountryInfoModal = ({ country, onHide }) => {
  if (!country) return null;

  return (
    <Modal show={true} onHide={onHide} centered>
      <ModalHeader closeButton>
        <h5>Country Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="country-details">
          <div className="row mb-2">
            <label className="col-6">Country:</label>
            <span className="col-6">{country.countryName}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Distance Type:</label>
            <span className="col-6">{country.distanceType}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Weight Type:</label>
            <span className="col-6">{country.weightType}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Created Date:</label>
            <span className="col-6">{new Date(country.createdDate).toLocaleString()}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Status:</label>
            <span className="col-6">{country.isActive ? "Active" : "Inactive"}</span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CountryInfoModal;
