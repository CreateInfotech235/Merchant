import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap"; 

const DeliveryBoyInfoModal = ({ deliveryBoy, onHide }) => {
    
    if (!deliveryBoy) return null; // Return null if no deliveryBoy is selected


    return (
        <Modal show={true} onHide={onHide} >
            <ModalHeader closeButton>
                <h5>DeliveryBoy Details</h5>
            </ModalHeader>
            <ModalBody>
                <div className="deliveryBoy-details">
                    <div className="row mb-2">
                        <label className="col-6">deliveryBoy Name:</label>
                        <span className="col-6">{deliveryBoy.name}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">deliveryBoy ID:</label>
                        <span className="col-6">{deliveryBoy._id}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Email</label>
                        <span className="col-6">{deliveryBoy.email}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">CountryCode</label>
                        <span className="col-6">{deliveryBoy.countryCode}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Contact No</label>
                        <span className="col-6">{deliveryBoy.contactNumber}</span>
                    </div>

                </div>
            </ModalBody>
        </Modal>
    );
};

export default DeliveryBoyInfoModal;
