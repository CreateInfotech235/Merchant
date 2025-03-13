import React, { useEffect, useState } from "react";
import { getRecentOrders } from "../../Components_merchant/Api/Order";
import { Link, useNavigate } from "react-router-dom";
import "./RecentOrder.css";
import { Button } from "react-bootstrap";
import Loader from "../../Components_admin/Loader/Loader";
import { getMerchantParcelType } from "../../Components_merchant/Api/ParcelType";


const RecentOrder = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSemTable, setOpenSemTable] = useState(false);
  const [parcelTypeDetail, setParcleTypeDetail] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const MerchantId = await localStorage.getItem("merchnatId");
        const response = await getRecentOrders(MerchantId);

        const parcelTypeRes = await getMerchantParcelType();
        if (parcelTypeRes.status) {
          setParcleTypeDetail(parcelTypeRes.data);
        }




        setOrderData(response?.data || []); // Safely handle null/undefined
      } catch (err) {
        setError("Failed to fetch recent orders. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusColors = {
    CREATED: "gray",
    ASSIGNED: "blue",
    ACCEPTED: "green",
    CANCELLED: "red",
    DELIVERED: "teal",
    UNASSIGNED: "red",
    PICKED_UP: "orange",
    DEPARTED: "yellow",
    ARRIVED: "purple",
  };

  const getColorClass = (status) =>
    `enable-btn ${statusColors[status]?.toLowerCase() || "default"}`;

  const downloadInvoice = async (order) => {
    try {
      navigate("/invoice-format", {
        state: {
          orderData: {
            orderId: order.orderId,
            createdAt: order.dateTime,
            parcelType: order.parcelType,
            weight: order.weight,
            parcelsCount: order.parcelsCount,
            pickupDetails: {
              name: order.pickupAddress?.name,
              address: order.pickupAddress?.address,
              mobileNumber: order.pickupAddress?.mobileNumber,
              email: order.pickupAddress?.email,
              postCode: order.pickupAddress?.postCode,
            },
            deliveryDetails: {
              name: order.deliveryAddress?.[0]?.name,
              address: order.deliveryAddress?.[0]?.address,
              mobileNumber: order.deliveryAddress?.[0]?.mobileNumber,
              email: order.deliveryAddress?.[0]?.email,
              postCode: order.deliveryAddress?.[0]?.postCode,
            },
            charges: order.charges,
            totalCharge: order.totalCharge,
            cashCollection: order.cashCollection,
            distance: order.distance,
            duration: order.duration,
            status: order.status,
          },
        },
      });
    } catch (error) {
      console.error("Error navigating to invoice:", error);
    }
  };
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }


  const toggleSemTable = (orderId) => {
    setOpenSemTable((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };


  return (
    <div>
      <div className="w-100">
        <div className="table-responsive">
          <table
            className="table-borderless w-100 text-center bg-light"
            style={{ fontSize: "10px" }}
          >
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3">Order ID</th>
                {/* <th className="p-3">Customer Name</th> */}
                <th className="p-3">Pickup Address (PostCode)</th>
                {/* <th className="p-3">Delivery Address (PostCode)</th> */}
                <th className="p-3">Delivery Man</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Pickup Date</th>
                <th className="p-3">Invoice</th>
                <th className="p-3">Status</th>
                <th className="p-3">Info</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="13" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">
                        <Loader />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : orderData.length === 0 ? (
                <tr>
                  <td colSpan="13" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">No Data Found</div>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {orderData.map((order, index) => (
                    <React.Fragment key={index}>
                      <tr className="country-row hover:bg-gray-100 border-1 border-top border-gray-200"
                       onClick={(e) => {
                        const selection = window.getSelection();
                        if (!selection.toString() && !e.target.closest('button') && !e.target.closest('input')) {
                          toggleSemTable(order._id)
                        }
                      }}
                      >
                        <td className="p-3 text-primary">
                          {order?.orderId ?? "-"}
                        </td>
                        <td className="p-3">
                          {`${order?.pickupAddress?.address} (${order?.pickupAddress?.postCode})` ?? "-"}
                        </td>
                        <td className="p-3">{order?.deliveryMan ?? "-"}</td>
                        <td className="p-3">{order?.createdDate ?? "-"}</td>
                        <td className="p-3">{order?.pickupDate ?? "-"}</td>
                        <td className="p-3">
                          {order.status === "DELIVERED" ? (
                            <button
                              className="btn btn-sm btn-primary enable-btn"
                              onClick={() => downloadInvoice(order)}
                            >
                              Download
                            </button>
                          ) : (
                            order?.invoice ?? "-"
                          )}
                        </td>
                        <td className="p-3">
                          <button className={getColorClass(order.status)}>
                            {order.status}
                          </button>
                        </td>
                        <td className="p-3">
                          <button className="info-btn ms-1" onClick={() => toggleSemTable(order._id)}>
                            {openSemTable[order._id] ? "Close" : "Open"}
                          </button>
                        </td>
                      </tr>
                      {openSemTable[order._id] && (
                        <tr>
                          <td colSpan="13">
                            <div className="dropdown-table">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th className="p-3">Sub Order ID</th>
                                    <th className="p-3">Customer Name</th>
                                    <th className="p-3">Pickup Address (PostCode)</th>
                                    <th className="p-3">Delivery Address (PostCode)</th>
                                    <th className="p-3">Delivery Date</th>
                                    <th className="p-3">Parcel Type</th>
                                    <th className="p-3">Invoice</th>
                                    <th className="p-3">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.deliveryAddress.map((subOrder, index) => (
                                    <tr key={index} className="country-row">
                                      <td className="p-3 text-primary">
                                        {subOrder?.subOrderId ?? "-"}
                                      </td>
                                      <td className="p-3">
                                        {subOrder?.name ?? "-"}
                                      </td>
                                      <td className="p-3">
                                        {`${order.pickupAddress?.address} (${order.pickupAddress?.postCode})` ?? "-"}
                                      </td>
                                      <td className="p-3">
                                        {`${subOrder?.address} (${subOrder?.postCode})` ?? "-"}
                                      </td>

                                      <td className="p-3">
                                        {subOrder?.time?.end ? new Date(subOrder?.time?.end).toLocaleDateString("en-GB", { month: '2-digit', day: '2-digit', year: 'numeric' }) : "-"}
                                      </td>

                                      <td className="p-3">
                                        {parcelTypeDetail.find(type => type.parcelTypeId === subOrder?.parcelType)?.label ?? "-"}
                                      </td>
                                      <td className="p-3">{subOrder?.invoice ?? "-"}</td>
                                      <td className="p-3">
                                        <button className={`${getColorClass(subOrder.status)} mx-2`}>
                                          {subOrder.status}
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  <tr>
                    <td colSpan="9" className="text-center">
                      <button
                        className="btn btn-primary mx-auto d-block"
                        style={{ fontSize: "17px", width: "100px" }}
                        onClick={() => navigate("/all-multi-order")}
                      >
                        view all
                      </button>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrder;
