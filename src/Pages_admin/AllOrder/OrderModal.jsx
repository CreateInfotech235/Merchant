import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap';

const OrderModal = ({ order, onHide }) => {
  return (
    <Modal show={true} onHide={onHide}>
      <ModalHeader closeButton>
        <h5>Order Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="order-details">
          <div className="row">
            <label className="col-6">Order ID:</label>
            <span className="col-6">{order.showOrderNumber}</span>
          </div>
          <div className="row">
            <label className="col-6">Customer Name:</label>
            <span className="col-6">{order.customerName}</span>
          </div>
          <div className="row">
            <label className="col-6">Pickup Address:</label>
            <span className="col-6">{order.pickupAddress}</span>
          </div>
          <div className="row">
            <label className="col-6">Delivery Address:</label>
            <span className="col-6">{order.deliveryAddress}</span>
          </div>
          <div className="row">
            <label className="col-6">Delivery Man:</label>
            <span className="col-6">{order.deliveryMan || '-'}</span>
          </div>
          <div className="row">
            <label className="col-6">Pickup Date:</label>
            <span className="col-6">{order.pickupDate}</span>
          </div>
          <div className="row">
            <label className="col-6">Delivery Date:</label>
            <span className="col-6">{order.deliveryDate}</span>
          </div>
          <div className="row">
            <label className="col-6">Invoice:</label>
            <span className="col-6">{order.invoice || '-'}</span>
          </div>
          <div className="row">
            <label className="col-6">Created Date:</label>
            <span className="col-6">{order.createdDate}</span>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default OrderModal;