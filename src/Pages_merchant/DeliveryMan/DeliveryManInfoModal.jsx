import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaMapPin, FaIdCard } from "react-icons/fa";

const DeliveryBoyInfoModal = ({ deliveryBoy, onHide }) => {
    if (!deliveryBoy) return null;

    return (
        <Modal show={true} onHide={onHide} centered>
            <ModalHeader closeButton className="bg-primary text-white" closeVariant="white">
                <h5 className="text-lg font-semibold">Delivery Partner Details</h5>
            </ModalHeader>
            <ModalBody>
                <div className="delivery-details px-3">
                    <div className="mb-4">
                        <h6 className="text-primary text-base font-medium mb-3">Personal Information</h6>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaUser className="me-2" />
                                Full Name:
                            </label>
                            <span className="col-6 text-end text-sm py-2 fw-semibold">
                                {`${deliveryBoy.firstName} ${deliveryBoy.lastName}`}
                            </span>
                        </div>
                      
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaEnvelope className="me-2" />
                                Email:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{deliveryBoy.email}</span>
                        </div>

                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaPhone className="me-2" />
                                Contact:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{deliveryBoy.contactNumber}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaIdCard className="me-2" />
                                Delivery Man ID:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{deliveryBoy.showDeliveryManNumber}</span>
                        </div>
                        
                    </div>

                    <div>
                        <h6 className="text-primary text-base font-medium mb-3">Location Details</h6>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaMapMarkerAlt className="me-2" />
                                Address:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{deliveryBoy?.address}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaMapPin className="me-2" />
                                Post Code:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{deliveryBoy?.postCode}</span>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <div className="text-center py-3">
                <Button variant="secondary" onClick={onHide} className="text-sm">
                    Close
                </Button>
            </div>
        </Modal>
    );
};

export default DeliveryBoyInfoModal;
