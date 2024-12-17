import { Modal, ModalBody } from "react-bootstrap";
import React, { useEffect } from "react";
import deleteuser from "../../assets_mercchant/deleteuser.png";
import { moveToTrashOrder } from "../Api/Order";
import { moveToTrashCustomer } from "../Api/Customer";
import { moveToTrashDeliveryMan } from "../Api/DeliveryMan";

const DeleteModal = ({ onHide, onDelete, Id, text }) => {
  // console.log(Id);
  
  const handleRemoveOrder = async (onDelete, text, id) => {
    if (text === "Order") {
      const response = await moveToTrashOrder(id);
      // console.log(response);

      if (response.status) {
        onHide();
      }
    }
    if (text === "Customer") {
      const response = await moveToTrashCustomer(id);
      if (response.status) {
        onHide();
      }
    }
    if (text === "DeliveryMan") {
     
      const response = await moveToTrashDeliveryMan(id);
      if (response.status) {
        onHide();
      }
    }
  };

  return (
    <Modal show={true} onHide={onHide} centered>
      <ModalBody className="text-center">
        <img src={deleteuser} className="disable-img img-fluid mx-auto" />
        <h2 className="disable-heading text-primary mt-2">Delete {text}</h2>
        <p className="disable-content text-secondary">
          Are you sure you want to delete this {text}?
        </p>
        <div className="d-flex justify-content-center mt-3">
          <button
            className="model-btn btn btn-primary text-white border-0 rounded-2 m-3"
            onClick={() => handleRemoveOrder(onDelete, text, Id)}
          >
            Delete
          </button>
          <button
            className="models-btn btn text-black bg-white border  botder-black border-1 rounded-2 m-3"
            onClick={onHide}
          >
            Cancel
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
