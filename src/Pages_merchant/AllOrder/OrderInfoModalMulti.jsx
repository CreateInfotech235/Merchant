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
  FaEnvelope,
  FaBox,
  FaImage,
} from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import { GiPathDistance, GiDuration } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";
import instructions from '../../assets_mercchant/instructions.png'
import { CiImageOn } from "react-icons/ci";


// instructions.png


const OrderInfoModalMulti = ({ Order, onHide ,isSingle }) => {
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
              Delivery Man Details
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
                <ImPhone className="me-2" />
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

          <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Pickup Details
            </h6>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaMapMarkerAlt className="me-2" />
                Address:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.pickupAddress?.address ?? "-"}
              </span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Delivery Details
            </h6>
            {Order?.deliveryAddresses?.map((delivery, index) => (
              <div key={delivery._id} className="mb-4 p-3 border rounded" style={{ display: isSingle ? (isSingle !== delivery.subOrderId ? "none" : "") : "" }} >
                <div className="flex justify-between">
                
                  {delivery?.pickupsignature && (
                    <div>
                      <div>
                        <h6>Proof of pickup</h6>
                      </div>
                      <div>
                        <div className="w-[100px] h-[100px] mb-3 rounded-xl shadow" onClick={() => { 
                          const imgElement = document.getElementById(`pickupSignature${delivery._id}-${index}`);
                          imgElement.style.display = "block"; 
                          imgElement.src = delivery?.pickupsignature; 


                          document.getElementById(`pickupSignature${delivery._id}-${index}icon`).style.display = "none";
                        }}>
                          <CiImageOn  className="w-full h-full" id={`pickupSignature${delivery._id}-${index}icon`} />
                          <img style={{ display: "none" }} src={"../../assets_mercchant/img-icon.webp"} alt="pickup Signature" id={`pickupSignature${delivery._id}-${index}`} className="w-[100px] h-[100px] mb-3 rounded-xl shadow" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    {delivery?.deliverysignature && (
                      <div>
                        <div>
                          <h6>Proof of delivery</h6>
                        </div>
                        <div className="w-[100px] h-[100px] mb-3 rounded-xl shadow" onClick={() => { 
                          const imgElement = document.getElementById(`deliverySignature${delivery._id}-${index}`);
                          imgElement.style.display = "block"; 
                          imgElement.src = delivery?.deliverysignature; 

                          document.getElementById(`deliverySignature${delivery._id}-${index}icon`).style.display = "none";
                        }}>
                          <CiImageOn className="w-full h-full" id={`deliverySignature${delivery._id}-${index}icon`} />
                          <img style={{ display: "none" }} src={"../../assets_mercchant/img-icon.webp"} alt="Delivery Signature" id={`deliverySignature${delivery._id}-${index}`} className="w-[100px] h-[100px] mb-3 rounded-xl shadow" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <RiFileList3Line className="me-2" />
                    Status:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery.status}
                  </span>
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
                    <ImPhone className="me-2" />
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
                    {`${delivery?.distance ? delivery.distance.toFixed(2) : 0} Miles`}
                  </span>
                </div>
                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <GiDuration className="me-2" />
                    Duration:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery?.duration ? delivery.duration : 0}
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

                <div className="row mb-2">
                  <label className="col-6 d-flex align-items-center text-sm">
                    <img src={instructions} alt="" style={{ width: "19px", marginRight: "5px" }} />
                    Instructions:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery?.description ?? "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Man Details */}
          {/* <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Delivery Man Details
            </h6>
          </div> */}

          {/* Dates */}
          <div>
            <h6 className="text-primary text-base font-medium mb-3">
              Date Details
            </h6>
            {/* <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaCalendarAlt className="me-2" />
                Pickup Date:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.pickupDate ?? "-"}
              </span>
            </div> */}
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
