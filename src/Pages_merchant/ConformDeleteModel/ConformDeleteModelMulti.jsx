import { Modal, ModalBody } from "react-bootstrap";
import React, { useEffect } from "react";
import deleteuser from "../../assets_mercchant/deleteuser.png";
import { deleteIOrder, deleteOrderFormMerchantMulti, moveToTrashOrder, moveToTrashOrderMulti, moveToTrashSubOrderMulti } from "../../Components_merchant/Api/Order";
import { deleteCustomer, moveToTrashCustomer } from "../../Components_merchant/Api/Customer";
import { deleteDeliveryMan, moveToTrashDeliveryMan } from "../../Components_merchant/Api/DeliveryMan";
import { FaUndo } from "react-icons/fa";

const ConformDeleteModelMulti = ({ onHide, onDelete, Id, text , subOrderId,undo=false, showDelete}) => {
  console.log(subOrderId , Id , text);


  const handleRemoveOrder = async (onDelete, text, id , type , subOrderId) => {
    console.log("subOrderId", subOrderId , "id", id , "text", text);
    if (text === "Order") {
      if (type === "Undo") {
        const response = await moveToTrashOrderMulti(id);
        if (response.status) {
            onDelete()
        }
        
      }
      else{
        const response = await deleteOrderFormMerchantMulti(id , subOrderId)
        if (response.status) {
            onDelete()
        }
      }
    }
    if (text === "SubOrder") {
      if (type === "Undo") {
        const response = await moveToTrashSubOrderMulti(id , subOrderId);
        if (response.status) {
            onDelete()
        }
      }
      else{
        const response = await deleteOrderFormMerchantMulti(id , subOrderId)
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
       {
        undo ? <FaUndo className="disable-img img-fluid mx-auto" /> : <img src={deleteuser} className="disable-img img-fluid mx-auto" />
       }
        <h2 className="disable-heading text-primary mt-2">{undo ? "Undo" : "Delete"} {text}</h2>
        <p className="disable-content text-secondary">
          Are you sure you want to {undo ? "Undo" : "Delete"} this {text}?

        </p>
        <div className="d-flex justify-content-center mt-3">
          {!showDelete && (
            <button


            className="model-btn btn btn-primary text-white border-0 rounded-2 m-3"
            onClick={() => handleRemoveOrder(onDelete, text, Id, "Undo" , subOrderId)}
          >
            {`Undo ${text}`}
          </button>
          )}
          <button
            className="models-btn btn btn-danger text-white   botder-black border-1 rounded-2 m-3"
            onClick={() => handleRemoveOrder(onDelete, text, Id, "Delete" , subOrderId)}

            // style={{display:undo ? "none" : ""}}
          >
           Conform Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConformDeleteModelMulti;
