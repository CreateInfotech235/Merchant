import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap"; 

const CutomerInfoModal = ({ customer, onHide }) => {
    if (!customer) return null; // Return null if no customer is selected

    return (
        <Modal show={true} onHide={onHide} >
            <ModalHeader closeButton>
                <h5>Customer Details</h5>
            </ModalHeader>
            <ModalBody>
                <div className="customer-details">
                    <div className="row mb-2">
                        <label className="col-6">customer Name:</label>
                        <span className="col-6">{customer.firstName}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">customer ID:</label>
                        <span className="col-6">{customer._id}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Email</label>
                        <span className="col-6">{customer.email}</span>
                    </div>
                  

                    <div className="row mb-2">
                        <label className="col-6">Post Code</label>
                        <span className="col-6">{customer.postCode}</span>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default CutomerInfoModal;
