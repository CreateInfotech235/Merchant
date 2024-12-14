import React, { useEffect, useState } from "react";
import { getRecentOrders } from "../../Components_merchant/Api/Order";
import { Link, useNavigate } from "react-router-dom";
import "./RecentOrder.css";
import { Button } from "react-bootstrap";

function RecentOrder() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null); // Initialize with `null` to differentiate between loading and empty states
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const fetchData = async () => {
    try {
      const MerchantId = await localStorage.getItem("merchnatId");
      const response = await getRecentOrders(MerchantId);
      setOrderData(response?.data || []); // Safely handle null or undefined data
    } catch (err) {
      setError("Failed to fetch recent orders. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading spinner once the request completes
    }
  };

  useEffect(() => {
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
      // Navigate to invoice format page with order data
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
              name: order.deliveryAddress?.name,
              address: order.deliveryAddress?.address,
              mobileNumber: order.deliveryAddress?.mobileNumber,
              email: order.deliveryAddress?.email,
              postCode: order.deliveryAddress?.postCode,
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
    return <div>Loading...</div>; // Display a loading spinner or message
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Display error message
  }
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
                <th className="p-3"></th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Pickup Address (PostCode)</th>
                <th className="p-3">Delivery Address (PostCode)</th>
                <th className="p-3">Delivery Man</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Pickup Date</th>
                <th className="p-3">Delivery Date</th>
                <th className="p-3">Invoice</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderData?.length > 0 ? (
                orderData.map(
                  (order, index) =>
                    !order.trashed && (
                      <tr key={index} className="country-row">
                        <td className="city-data">
                          <input type="checkbox" />
                        </td>
                        <td className="p-3 text-primary">
                          {order?.showOrderNumber ?? "-"}
                        </td>
                        <td className="p-3 text-dark fw-bold">
                          {order?.customerName ?? "-"}
                        </td>
                        <td className="p-3">
                          {`${order?.pickupAddress?.address}(${
                            order?.pickupAddress?.postCode ?? "-"
                          })` ?? "-"}
                        </td>
                        <td className="p-3">
                          {`${order?.deliveryAddress?.address}(${
                            order?.deliveryAddress?.postCode ?? "-"
                          })` ?? "-"}
                        </td>
                        <td className="p-3">{order?.deliveryMan ?? "-"}</td>
                        <td className="p-3">{order?.createdDate ?? "-"}</td>
                        <td className="p-3">{order?.pickupDate ?? "-"}</td>
                        <td className="p-3">{order?.deliveryDate ?? "-"}</td>
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
                      </tr>
                    )
                )
              ) : (
                <tr>
                  <td colSpan={11} className="text-center py-4">
                    No recent orders found.
                  </td>
                </tr>
              )}

              {orderData?.length > 0 && (
                <tr>
                  <td colSpan={11} className="text-center py-4">
                    <Button
                      href="/all-order"
                      style={{ backgroundColor: "#253a71" }}
                    >
                      View All Orders
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecentOrder;
