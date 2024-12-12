import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap";
import { FaIdCard, FaMapMarkerAlt, FaCalendarAlt, FaCashRegister, FaCheck, FaTimes } from "react-icons/fa"; // Icons

const OrderInfoModal = ({ Order, onHide }) => {
    if (!Order) return null; // Return null if no Order is selected

    return (
        <Modal show={true} onHide={onHide} centered>
            <ModalHeader closeButton className="bg-primary text-white" closeVariant="white">
                <h5 className="text-lg font-semibold">Order Details</h5>
            </ModalHeader>
            <ModalBody>
                <div className="order-details px-3">
                    {/* Order Details Section */}
                    <div className="mb-4">
                        <h6 className="text-primary text-base font-medium mb-3">Order Information</h6>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaIdCard className="me-2" />
                                Order ID:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.showOrderNumber ?? '-'}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaIdCard className="me-2" />
                                Customer Name:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.customerName ?? '-'}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaMapMarkerAlt className="me-2" />
                                Pickup Address:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.pickupAddress?.address ?? '-'}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaMapMarkerAlt className="me-2" />
                                Delivery Address:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.deliveryAddress?.address ?? '-'}</span>
                        </div>
                    </div>

                    {/* Delivery Details Section */}
                    <div className="mb-4">
                        <h6 className="text-primary text-base font-medium mb-3">Delivery Details</h6>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaCalendarAlt className="me-2" />
                                Pickup Date:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.pickupDate ?? '-'}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaCalendarAlt className="me-2" />
                                Delivery Date:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.deliveryDate ?? '-'}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaCheck className="me-2" />
                                Status:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.status ?? '-'}</span>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div>
                        <h6 className="text-primary text-base font-medium mb-3">Payment Details</h6>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaCashRegister className="me-2" />
                                Cash on Delivery:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.cashOnDelivery ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="row mb-2">
                            <label className="col-6 d-flex align-items-center text-sm">
                                <FaCashRegister className="me-2" />
                                Amount Collected:
                            </label>
                            <span className="col-6 text-end text-sm py-2">{Order?.paymentCollectionRupees ?? '-'}</span>
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

export default OrderInfoModal;
