import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap";
import { FaUser, FaIdCard, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const CutomerInfoModal = ({ customer, onHide }) => {
    if (!customer) return null;

    return (
        <Modal show={true} onHide={onHide} centered>
            <ModalHeader closeButton className="bg-primary text-white" closeVariant="white">
                <h5 className="text-lg font-semibold">Customer Details</h5>
            </ModalHeader>
            <ModalBody>
                <div className="customer-details px-3">
                    <div className="mb-4">
                        <h6 className="text-primary text-base font-medium mb-3">Personal Information</h6>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaUser className="me-2" />
                                First Name:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{customer.firstName}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaUser className="me-2" />
                                Last Name:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{customer.lastName}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaIdCard className="me-2" />
                                Customer ID:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{customer.showCustomerNumber}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaEnvelope className="me-2" />
                                Email:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{customer.email}</span>
                        </div>
                    </div>

                    <div>
                        <h6 className="text-primary text-base font-medium mb-3">Address Details</h6>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaMapMarkerAlt className="me-2" />
                                Address:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{customer.address}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaMapMarkerAlt className="me-2" />
                                Post Code:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{customer.postCode}</span>
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

export default CutomerInfoModal;
