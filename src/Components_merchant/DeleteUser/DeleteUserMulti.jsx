import { Modal, ModalBody } from "react-bootstrap";
import React, { useState } from "react";
import deleteuser from "../../assets_mercchant/deleteuser.png";
import { moveToTrashOrder, moveToTrashOrderMulti, moveToTrashSubOrderMulti } from "../Api/Order";
import { moveToTrashCustomer } from "../Api/Customer";
import { moveToTrashDeliveryMan } from "../Api/DeliveryMan";

const DeleteUserMulti = ({ onHide, onDelete, Id, text , subOrderId }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(Id , text , subOrderId);
  
  const handleRemoveOrder = async (onDelete, text, id,settrashed) => {
    setIsLoading(true);
    if (text === "Order") {
      const response = await moveToTrashOrderMulti(id,settrashed);
      if (response.status) {
        onHide();
        onDelete();
      }
    }
    if (text === "SubOrder") {
      const response = await moveToTrashSubOrderMulti(Id, subOrderId);
      if (response.status) {
        onHide();
        onDelete();
      }
    }
    if (text === "Customer") {
      const response = await moveToTrashCustomer(id);
      if (response.status) {
        onHide();
        onDelete();
      }
    }
    if (text === "DeliveryMan") {
     
      const response = await moveToTrashDeliveryMan(id);
      if (response.status) {
        onHide();
        onDelete();
      }
    }
    setIsLoading(false);
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
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
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

export default DeleteUserMulti;
