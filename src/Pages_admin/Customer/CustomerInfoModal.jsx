import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap";
import { FaIdCard, FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const CutomerInfoModal = ({ customer, onHide }) => {
    if (!customer) return null; // Return null if no customer is selected

    return (
        <Modal show={true} onHide={onHide} centered>
            <ModalHeader closeButton className="bg-primary text-white">
                <h5 className="mb-0">Customer Details</h5>
            </ModalHeader>
            <ModalBody>
                <div className="customer-details">
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaIdCard className="me-2" />
                            Customer ID:
                        </label>
                        <span className="col-6">{customer.customerId}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaUser className="me-2" />
                             Name:
                        </label>
                        <span className="col-6">{customer.name}</span>
                    </div>
                    
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaEnvelope className="me-2" />
                            Email:
                        </label>
                        <span className="col-6">{customer.email}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaPhone className="me-2" />
                            Mobile Number:
                        </label>
                        <span className="col-6">{customer.mobileNumber}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2" />
                            Country:
                        </label>
                        <span className="col-6">{customer.country}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2" />
                            City:
                        </label>
                        <span className="col-6">{customer.city}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2" />
                            Address:
                        </label>
                        <span className="col-6">{customer.address}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2" />
                            Post Code:
                        </label>
                        <span className="col-6">{customer.postCode}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6 d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2" />
                            Location:
                        </label>
                        <span className="col-6">
                            {customer.location?.coordinates?.join(', ') || 'N/A'}
                        </span>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default CutomerInfoModal;
