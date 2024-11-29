
import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap"; 

const OrderInfoModal = ({ Order, onHide }) => {

    console.log(Order);
    
    
    if (!Order) return null; // Return null if no Order is selected


    return (
        <Modal show={true} onHide={onHide} >
            <ModalHeader closeButton>
                <h5>DeliveryBoy Details</h5>
            </ModalHeader>
            <ModalBody>
                <div className="Order-details">
                    <div className="row mb-2">
                        <label className="col-6">Order ID:</label>
                        <span className="col-6">{Order?.orderId ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">customerName</label>
                        <span className="col-6">{Order?.customerName ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">pickupAddress:</label>
                        <span className="col-6">{Order?.pickupAddress?.address ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">deliveryAddress</label>
                        <span className="col-6">{Order?.deliveryAddress?.address ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">deliveryMan</label>
                        <span className="col-6">{Order?.deliveryMan ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Date:</label>
                        <span className="col-6">{Order?.dateTime ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">pickupDate</label>
                        <span className="col-6">{Order?.pickupDate ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">deliveryDate</label>
                        <span className="col-6">{Order?.deliveryDate ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">cashOnDelivery</label>
                        <span className="col-6">{Order?.cashOnDelivery ? 'Yes' : 'No'}</span>
                    </div>
                   
                    <div className="row mb-2">
                        <label className="col-6">paymentCollectionRupees</label>
                        <span className="col-6">{Order?.paymentCollectionRupees?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">postCode</label>
                        <span className="col-6">{Order?.postCode ?? '-'}</span>
                    </div>
                   
                    <div className="row mb-2">
                        <label className="col-6">status</label>
                        <span className="col-6">{Order?.status ?? '-'}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">trashed</label>
                        <span className="col-6">{Order?._trashed ? 'Yes' : 'No'}</span>
                    </div>

                   
                </div>
            </ModalBody>
        </Modal>
    );
};

export default OrderInfoModal;
