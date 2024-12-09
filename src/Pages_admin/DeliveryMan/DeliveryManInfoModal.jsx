import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap";

const DeliveryBoyInfoModal = ({ deliveryBoy, onHide }) => {
    
    if (!deliveryBoy) return null;

    return (
        <Modal show={true} onHide={onHide} centered>
            <ModalHeader closeButton className="bg-primary text-white">
                <h5 className="mb-0">Delivery Boy Details</h5>
            </ModalHeader>
            <ModalBody className="p-4">
                <div className="deliveryBoy-details">
                    <div className="info-row d-flex align-items-center mb-3 pb-2 border-bottom">
                        <div className="info-label fw-bold text-primary col-5">Name:</div>
                        <div className="info-value col-7">{deliveryBoy.name || '-'}</div>
                    </div>
                    <div className="info-row d-flex align-items-center mb-3 pb-2 border-bottom">
                        <div className="info-label fw-bold text-primary col-5">ID:</div>
                        <div className="info-value col-7">{deliveryBoy._id || '-'}</div>
                    </div>
                    <div className="info-row d-flex align-items-center mb-3 pb-2 border-bottom">
                        <div className="info-label fw-bold text-primary col-5">Email:</div>
                        <div className="info-value col-7">{deliveryBoy.email || '-'}</div>
                    </div>
                    <div className="info-row d-flex align-items-center mb-3 pb-2 border-bottom">
                        <div className="info-label fw-bold text-primary col-5">Country Code:</div>
                        <div className="info-value col-7">{deliveryBoy.countryCode || '-'}</div>
                    </div>
                    <div className="info-row d-flex align-items-center mb-3">
                        <div className="info-label fw-bold text-primary col-5">Contact No:</div>
                        <div className="info-value col-7">{deliveryBoy.contactNumber || '-'}</div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeliveryBoyInfoModal;
