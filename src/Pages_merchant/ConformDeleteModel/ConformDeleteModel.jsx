import { Modal, ModalBody } from "react-bootstrap";
import React, { useEffect } from "react";
import deleteuser from "../../assets_mercchant/deleteuser.png";
import { deleteIOrder, moveToTrashOrder } from "../../Components_merchant/Api/Order";
import { deleteCustomer, moveToTrashCustomer } from "../../Components_merchant/Api/Customer";
import { deleteDeliveryMan, moveToTrashDeliveryMan } from "../../Components_merchant/Api/DeliveryMan";

const ConformDeleteModel = ({ onHide, onDelete, Id, text }) => {


  const handleRemoveOrder = async (onDelete, text, id , type) => {
    if (text === "Order") {
      if (type === "Undo") {
        const response = await moveToTrashOrder(id);
        if (response.status) {
            onDelete()
        }
        
      }
      else{
        const response = await deleteIOrder(id)
        if (response.status) {
            onDelete()
        }
      }
    }
    if (text === "Customer") {
      if (type === "Undo") {
        const response = await moveToTrashCustomer(id);
        if (response.status) {
            onDelete()
        }
        
      }
      else{
        const response = await deleteCustomer(id)
        if (response.status) {
            onDelete()
        }
      }
    }
    if (text === "DeliveryMan") {
      if (type === "Undo") {
        const response = await moveToTrashDeliveryMan(id);
        if (response.status) {
            onDelete()
        }
        
      }
      else{
        const response = await deleteDeliveryMan(id)
        if (response.status) {
            onDelete()
        }
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
            onClick={() => handleRemoveOrder(onDelete, text, Id, "Undo")}
          >
            {`Undo ${text}`}
          </button>
          <button
            className="models-btn btn btn-danger text-white   botder-black border-1 rounded-2 m-3"
            onClick={() => handleRemoveOrder(onDelete, text, Id, "Delete")}
          >
           Conform Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConformDeleteModel;
