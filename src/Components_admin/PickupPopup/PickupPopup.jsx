import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap";
import car from '../../assets_admin/car.png'; // Assuming you have the car image

const PickupPopup = ({ vehicle, onHide }) => {
  if (!vehicle) return null; // Return null if no vehicle data is provided

  return (
    <Modal show={true} onHide={onHide} centered>
      <ModalHeader closeButton>
        <h5>Vehicle Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="pickup-details">
          {/* Vehicle Image */}
          <div className="text-center mb-3">
            <img src={car} alt="Vehicle" className="img-fluid" style={{ maxWidth: "200px" }} />
          </div>

          {/* Vehicle Details */}
          <div className="row mb-2">
            <label className="col-6">Vehicle Name:</label>
            <span className="col-6">{vehicle.vehicleName || "N/A"}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Vehicle Size:</label>
            <span className="col-6">{vehicle.vehicleSize || "N/A"}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Vehicle Capacity:</label>
            <span className="col-6">{vehicle.vehicleCapacity || "N/A"}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Description:</label>
            <span className="col-6">{vehicle.description || "N/A"}</span>
          </div>
          <div className="row mb-2">
            <label className="col-6">Status:</label>
            <span className="col-6">{vehicle.status || "N/A"}</span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default PickupPopup;
