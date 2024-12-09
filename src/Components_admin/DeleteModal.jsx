import { Modal, ModalBody } from "react-bootstrap";
import React from "react";
import deleteuser from "../assets_admin/deleteuser.png";

const DeleteModal = ({ onHide, onDelete, text }) => {
    return (
        <Modal show={true} onHide={onHide} centered>
            <ModalBody className="p-4">
                <div className="text-center">
                    <img 
                        src={deleteuser} 
                        alt="Delete Icon"
                        className="mb-4 mx-auto" 
                        style={{width: "80px", height: "80px"}}
                    />
                    <h4 className="mb-3 fw-bold" style={{color: "#253A71"}}>
                        Delete {text}
                    </h4>
                    <p className="mb-4" style={{color: "#6B7280", fontSize: "16px"}}>
                        Are you sure you want to delete this {text}?
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <button 
                            className="btn px-4 py-2"
                            style={{
                                background: "#D65246",
                                color: "white",
                                minWidth: "120px",
                                borderRadius: "8px"
                            }}
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                        <button 
                            className="btn px-4 py-2"
                            style={{
                                background: "#F3F4F6",
                                color: "#374151",
                                minWidth: "120px",
                                borderRadius: "8px"
                            }}
                            onClick={onHide}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default DeleteModal;

