import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap";
import {
  FaIdCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCashRegister,
  FaCheck,
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBox,
} from "react-icons/fa";
import { GiPathDistance, GiDuration } from "react-icons/gi";

const OrderInfoModalMulti = ({ Order, onHide }) => {
  console.log(Order, "Order");
  if (!Order) return null;

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
                {Order?.orderId ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaIdCard className="me-2" />
                Show Order Number:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.showOrderNumber ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCheck className="me-2" />
                Status:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.status ?? "-"}
              </span>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Pickup Details
            </h6>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaUser className="me-2" />
                Name:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.pickupAddress?.name ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaMapMarkerAlt className="me-2" />
                Address:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.pickupAddress?.address ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaPhone className="me-2" />
                Mobile:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.pickupAddress?.mobileNumber ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaEnvelope className="me-2" />
                Email:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.pickupAddress?.email ?? "-"}
              </span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Delivery Details
            </h6>
            {Order?.deliveryAddresses?.map((delivery, index) => (
              <div key={delivery._id} className="mb-4 p-3 border rounded">
                <div className="flex justify-between">
                  {delivery?.pickupsignature && (
                    <div>
                      <div>
                        <h6>Proof of pickup</h6>
                      </div>
                      <div>
                        <img src={delivery?.pickupsignature} alt="pickup Signature" className="w-[100px] h-[100px] mb-3 rounded-xl shadow" />
                      </div>
                    </div>
                  )}
                  <div>
                    {delivery?.deliverysignature && (
                      <div>
                        <div>
                          <h6>Proof of delivery</h6>
                        </div>
                        <div>
                          <img src={delivery?.deliverysignature} alt="Delivery Signature" className="w-[100px] h-[100px] mb-3 rounded-xl shadow" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaUser className="me-2" />
                    Name:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery.name}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaMapMarkerAlt className="me-2" />
                    Address:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery.address}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaPhone className="me-2" />
                    Mobile:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery.mobileNumber}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaBox className="me-2" />
                    Parcels:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery.parcelsCount}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <GiPathDistance className="me-2" />
                    Distance:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {`${delivery.distance} Miles`}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <GiDuration className="me-2" />
                    Duration:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery.duration}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <FaCashRegister className="me-2" />
                    Payment Collection:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    £{delivery.paymentCollectionRupees}
                  </span>
                </div>
              </div>
            ))}
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
                {Order?.deliveryMan ?? "-"}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div>
            <h6 className="text-primary text-base font-medium mb-3">
              Date Details
            </h6>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCalendarAlt className="me-2" />
                Pickup Date:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.pickupDate ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCalendarAlt className="me-2" />
                Created Date:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.createdDate ?? "-"}
              </span>
            </div>
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

export default OrderInfoModalMulti;
