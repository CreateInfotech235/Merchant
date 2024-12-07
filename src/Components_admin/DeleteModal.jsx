import { Modal, ModalBody } from "react-bootstrap";
import React from "react";
import deleteuser from "../assets_admin/deleteuser.png";

const DeleteModal = ({ onHide, onDelete, text }) => {
    return (
        <Modal show={true} onHide={onHide} centered>
            <ModalBody className="text-center">
                <img src={deleteuser} className="disable-img img-fluid m-3" />
                <h2 className="disable-heading text-primary">Delete {text}</h2>
                <p className="disable-content text-secondary">
                    Are you sure you want to delete this {text}?
                </p>
                <div className="d-flex justify-content-center mt-3">
                    <button className="model-btn text-white border-0 rounded-2 m-3" onClick={onDelete}>
                        Delete
                    </button>
                    <button className="models-btn btn text-black bg-white  border-1 rounded-2 m-3" onClick={onHide}>
                        Cancel
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default DeleteModal;