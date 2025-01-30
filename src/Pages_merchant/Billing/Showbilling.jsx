import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap";
import {
  FaIdCard,
  FaCalendarAlt,
  FaCashRegister,
  FaCheck,
  FaUser,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Showbilling = ({ order, onHide }) => {
  console.log(order);
  if (!order) return null;

  return (
    <Modal show={true} onHide={onHide} centered size="lg">
      <ModalHeader
        closeButton
        className="bg-primary text-white"
        closeVariant="white"
      >
        <h5 className="text-lg font-semibold">Order Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="order-details px-3">
          {/* Order Details Section */}
          <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Order Information
            </h6>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaIdCard className="me-2" />
                Order ID:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {order?.orderId ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCalendarAlt className="me-2" />
                Created Date:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {new Date(order?.createdAt).toLocaleString() ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCalendarAlt className="me-2" />
                Updated Date:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {new Date(order?.updatedAt).toLocaleString() ?? "-"}
              </span>
            </div>
          </div>

          {/* Delivery Man Details */}
          <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Delivery Man Details
            </h6>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaUser className="me-2" />
                Name:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {`${order?.deliveryMan?.firstName ?? "-"} ${order?.deliveryMan?.lastName ?? ""}`}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaEnvelope className="me-2" />
                Email:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {order?.deliveryMan?.email ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaPhone className="me-2" />
                Contact Number:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {order?.deliveryMan?.contactNumber ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCashRegister className="me-2" />
                Charge:
              </label>
              <span className="col-6 text-end text-sm py-2">
                ₹{order?.deliveryMan?.charge ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCashRegister className="me-2" />
                Admin Charge:
              </label>
              <span className="col-6 text-end text-sm py-2">
                ₹{order?.deliveryMan?.adminCharge ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCheck className="me-2" />
                Created By:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {order?.deliveryMan?.createdByAdmin ? "Admin" : "Merchant"}
              </span>
            </div>
          </div>

          {/* Sub Order Details */}
          <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Sub Order Details
            </h6>
            {order?.subdata?.map((subOrder, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaIdCard className="me-2" />
                    Sub Order ID:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {subOrder?.subOrderId ?? "-"}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaCalendarAlt className="me-2" />
                    Pickup Time:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {new Date(subOrder?.pickupTime).toLocaleString() ?? "-"}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaCashRegister className="me-2" />
                    Charge:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    ₹{subOrder?.charge ?? "-"}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaCheck className="me-2" />
                    Status:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {subOrder?.orderStatus ?? "-"}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaCashRegister className="me-2" />
                    Charge Method:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {subOrder?.chargeMethod ?? "-"}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaCheck className="me-2" />
                    Approved:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {subOrder?.isApproved ? "Yes" : "No"}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaCheck className="me-2" />
                    Paid:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {subOrder?.isPaid ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalBody>
      <div className="text-center py-3">
        <Button variant="secondary" onClick={onHide} className="text-sm">
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default Showbilling;
