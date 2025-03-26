import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap";
import {
  FaIdCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
  FaUser,
  FaEnvelope,
  FaBox,
} from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import { GiPathDistance } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";
import instructions from '../../assets_mercchant/instructions.png'
import { CiImageOn } from "react-icons/ci";
import { TbHandFinger } from "react-icons/tb";
import { IoTimeOutline } from "react-icons/io5";
import  datatime  from "../../assets_mercchant/calendar.png";

// instructions.png


const OrderInfoModalMulti = ({ Order, onHide, isSingle, parcelTypeDetail }) => {
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
                {Order?.deliveryMan ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaEnvelope className="me-2" />
                Email:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.deliveryManEmail ?? "-"}
              </span>
            </div>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <ImPhone className="me-2" />
                Mobile:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.deliveryManMobileNumber ?? "-"}
              </span>
            </div>



          </div>

          <div className="mb-4">
            <h6 className="text-primary text-base font-medium mb-3">
              Pickup Details
            </h6>
            <div className="row mb-2">
              <label className="col-6 d-flex align-items-center text-sm">
                <FaUser className="me-2" />
                Name of merchant:
              </label>
              <span className="col-6 text-end text-sm py-2">
                {Order?.pickupAddress?.name ?? "-"}
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
                {
                  delivery?.parcelType2 &&
                  (
                    <div className="row mb-2">
                      <label className="col-6 d-flex align-items-center text-sm">
                        <FaBox className="me-2" />
                        Parcel Type:
                      </label>
                      <span className="col-6 text-end text-sm py-2">
                        {delivery?.parcelType2?.length > 0
                          ? delivery.parcelType2.map(id =>
                            parcelTypeDetail.find(type => type.parcelTypeId === id)?.label
                          ).join(", ")
                          : "-"}
                      </span>
                    </div>
                  )
                }

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
                    <IoTimeOutline className="me-2" />
                    Average Duration:
                  </label>
                  <span className="col-6 text-end text-sm py-2">
                    {delivery?.duration
                      ? `${Math.floor(
                        parseInt(delivery?.duration) / 60
                      )}h ${parseInt(delivery?.duration) % 60}m`
                      : "-"}
                  </span>
                </div>
                {(delivery?.time?.end && delivery?.time?.start) &&
                  <div className="row mb-2">
                    <label className="col-6 d-flex align-items-center text-sm">
                      <IoTimeOutline className="me-2" />
                      Time Taken:
                    </label>
                    <span className="col-6 text-end text-sm py-2">
                      {delivery?.time?.end && delivery?.time?.start
                        ? (() => {
                          const totalSeconds = (new Date(delivery?.time?.end) - new Date(delivery?.time?.start)) / 1000;
                          const hours = Math.floor(totalSeconds / 3600);
                          const minutes = Math.floor((totalSeconds % 3600) / 60);
                          const seconds = Math.floor(totalSeconds % 60);
                          return `${hours}h ${minutes}m ${seconds}s`;
                        })()
                        : "-"}
                    </span>
                  </div>
                }

                {
                  delivery?.time?.start &&
                  <div className="row mb-2">
                    <label className="col-6 d-flex align-items-center text-sm">
                      <img src={datatime} alt="" style={{ width: "19px", marginRight: "5px" }} />
                      Pickup Time:
                    </label>
                    <span className="col-6 text-end text-sm py-2">
                      {delivery?.time?.start ? new Date(delivery?.time?.start).toLocaleString() : "-"}
                    </span>
                  </div>
                }
                {
                  delivery?.time?.end && <div className="row mb-2">
                    <label className="col-6 d-flex align-items-center text-sm">
                      <img src={datatime} alt="" style={{ width: "19px", marginRight: "5px" }} />
                      Delivery Time:
                    </label>
                    <span className="col-6 text-end text-sm py-2">
                      {delivery?.time?.end ? new Date(delivery?.time?.end).toLocaleString() : "-"}
                    </span>
                  </div>
                }

                {delivery?.description?.trim() &&
                  <div className="row mb-2">
                    <label className="col-6 d-flex align-items-center text-sm">
                      <img src={instructions} alt="" style={{ width: "19px", marginRight: "5px" }} />
                    Instructions:
                  </label>
                    <span className="col-6 text-end text-sm py-2">
                      {delivery?.description?.trim() ?? "-"}
                    </span>
                  </div>
                }
                <div className="flex justify-between">
                  {delivery?.pickupsignature && (
                    <div>
                      <div>
                        <h6>Proof of pickup</h6>
                      </div>
                      <div>
                        <div className="w-[100px] h-[100px] mb-3 rounded-xl shadow cursor-pointer" onClick={() => {
                          const imgElement = document.getElementById(`pickupSignature${delivery._id}-${index}`);
                          const iconElement = document.getElementById(`pickupSignature${delivery._id}-${index}icon`);

                          imgElement.style.display = "block";
                          imgElement.src = delivery?.pickupsignature;
                          iconElement.style.display = "none";

                          // Add animation class
                          imgElement.classList.add("fade-in");
                        }}>
                          <div id={`pickupSignature${delivery._id}-${index}icon`} className="w-[100px] h-[100px] mb-3 rounded-xl shadow cursor-pointer relative">
                            <CiImageOn className="w-full h-full " />
                            <TbHandFinger className="w-[30px] h-[30px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  scaleef" />
                          </div>
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
                        <div>
                          <div className="w-[100px] h-[100px] mb-3 rounded-xl shadow cursor-pointer" onClick={() => {
                            const imgElement = document.getElementById(`deliverySignature${delivery._id}-${index}`);
                            const iconElement = document.getElementById(`deliverySignature${delivery._id}-${index}icon`);

                            imgElement.style.display = "block";
                            imgElement.src = delivery?.deliverysignature;
                            iconElement.style.display = "none";

                            // Add animation class
                            imgElement.classList.add("fade-in");
                          }}>
                            <div id={`deliverySignature${delivery._id}-${index}icon`} className="w-[100px] h-[100px] mb-3 rounded-xl shadow cursor-pointer relative">
                              <CiImageOn className="w-full h-full " />
                              <TbHandFinger className="w-[30px] h-[30px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  scaleef" />
                            </div>
                            <img style={{ display: "none" }} src={"../../assets_mercchant/img-icon.webp"} alt="delivery Signature" id={`deliverySignature${delivery._id}-${index}`} className="w-[100px] h-[100px] mb-3 rounded-xl shadow" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
