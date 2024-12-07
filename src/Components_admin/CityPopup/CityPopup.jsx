import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap";
import { formatDateTime } from "../../helper_admin/common"; // Import the helper function to format dates

const CityPopup = ({ city, onHide }) => {
  if (!city) return null; // Return null if no city is selected

  return (
    <Modal show={true} onHide={onHide} >
      <ModalHeader closeButton>
        <h5>City Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="city-details">
          <div className="row mb-2">
            <label className="col-6">City Name:</label>
            <span className="col-6">{city.cityName}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">City ID:</label>
            <span className="col-6">{city.cityId}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Country Name:</label>
            <span className="col-6">{city.countryName || "-"}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Per Distance Charge:</label>
            <span className="col-6">{city.perDistanceCharge || 0}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Per Weight Charge:</label>
            <span className="col-6">{city.perWeightCharge || 0}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Admin Commission:</label>
            <span className="col-6">{city.adminCommission || 0}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Currency:</label>
            <span className="col-6">{city.currency || "$"}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Created Date:</label>
            <span className="col-6">{formatDateTime(city.createdDate)}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Status:</label>
            <span className="col-6">{city.isActive ? "Active" : "Blocked"}</span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CityPopup;
