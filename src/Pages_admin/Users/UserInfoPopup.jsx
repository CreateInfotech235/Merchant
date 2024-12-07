import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";

const UserInfoModal = ({ user, onHide }) => {
    if (!user) return null; // Return null if no user is selected

    return (
        <Modal show={true} onHide={onHide}>
            <ModalHeader closeButton>
                <h5>User Details</h5>
            </ModalHeader>
            <ModalBody>
                <div className="user-details">
                    <div className="row mb-2">
                        <label className="col-6">Name:</label>
                        <span className="col-6">{user.name}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Email:</label>
                        <span className="col-6">{user.email}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Contact Number:</label>
                        <span className="col-6">{user.contactNumber}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Country Code:</label>
                        <span className="col-6">{user.countryCode}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Created By Admin:</label>
                        <span className="col-6">{user.createdByAdmin ? "Yes" : "No"}</span>
                    </div>
                    <div className="row mt-3">
                        <h6 className="col-12">Address</h6>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Street:</label>
                        <span className="col-6">{user.address.street}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">City:</label>
                        <span className="col-6">{user.address.city}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Postal Code:</label>
                        <span className="col-6">{user.address.postalCode}</span>
                    </div>
                    <div className="row mb-2">
                        <label className="col-6">Country:</label>
                        <span className="col-6">{user.address.country}</span>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default UserInfoModal;
