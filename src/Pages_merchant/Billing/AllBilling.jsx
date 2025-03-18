import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tracking from "../../assets_mercchant/delivery-bike.png";
import searchIcon from "../../assets_mercchant/search.png";
import { format } from "date-fns";
import Loader from "../../Components_admin/Loader/Loader";
import { Pagination, Stack } from "@mui/material";
import { getBilling, BillingApprove } from "../../Components_merchant/Api/Billing";
import Showbilling from "./Showbilling";
import show from "../../assets_mercchant/show.png";
import Modal from "react-bootstrap/Modal";
import { socket } from "../../Components_merchant/Api/Api";
import Tooltip from "../Tooltip/Tooltip";

const Billing = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [themeMode, setThemeMode] = useState("light");
  const [orderData, setOrderData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [filterCreatedBy, setFilterCreatedBy] = useState("all");
  const [openSemTable, setOpenSemTable] = useState({});
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [selectedBillingData, setSelectedBillingData] = useState(null);
  const [billingData, setBillingData] = useState(null);
  const [showEditButton, setShowEditButton] = useState(false);
  const [subodercharge, setSubodercharge] = useState(null);
  console.log(filteredOrders, "filteredOrders");

  const handleShowBilling = (order) => {
    setSelectedBillingData(order);

    setShowBillingModal(true);
  };

  const handleCloseBilling = () => {
    setShowBillingModal(false);
    setSelectedBillingData(null);
    setSubodercharge(null);
  };

  const handleCancel = () => {
    setShowBillingModal(false);
    setSubodercharge(null);
  };

  const handleChargeChange = (e, subOrderId) => {
    const newCharge = parseFloat(e.target.value);
    setSubodercharge((prev) =>
      prev.map((item) =>
        item.subOrderId == subOrderId ? { ...item, charge: newCharge } : item
      )
    );
  };
  console.log(orderData, "orderData");

  const handleNotificationdataupdata = (data) => {
    console.log(data, "dataofbilling");
    if (!data) return;

    setOrderData(prevOrders => {
      const currentOrders = Array.isArray(prevOrders) ? prevOrders : [];

      const existingOrderIndex = currentOrders.findIndex(order => order?.orderId === data.orderId);

      const formattedOrder = {
        ...data,
        createdAt: new Date(data.createdAt).toLocaleString("en-GB", {
          timeZone: "Europe/London",
        }),
        subOrderdata: Array.isArray(data.subOrderdata) ? data.subOrderdata.map(subOrder => ({
          ...subOrder,
          pickupTime: subOrder?.pickupTime
            ? new Date(subOrder.pickupTime).toLocaleString("en-GB", {
              timeZone: "Europe/London",
            })
            : null,
          deliveryTime: subOrder?.deliveryTime
            ? new Date(subOrder.deliveryTime).toLocaleString("en-GB", {
              timeZone: "Europe/London",
            })
            : null,
          TakeTime: subOrder?.deliveryTime && subOrder?.pickupTime
            ? (new Date(subOrder.deliveryTime) - new Date(subOrder.pickupTime)) / 1000
            : null,
        })) : [],
      };

      if (existingOrderIndex !== -1) {
        const updatedOrders = [...currentOrders];
        updatedOrders[existingOrderIndex] = formattedOrder;
        return updatedOrders;
      } else {
        return [formattedOrder, ...currentOrders];
      }
    });
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("billingDataupdate", handleNotificationdataupdata);

    return () => {
      socket.off("billingDataupdate", handleNotificationdataupdata);
      socket.disconnect();
    };
  }, []);
  const handleApprove = async (orderId) => {
    const approvedAmount = document.getElementById("approvedAmount").value;
    const reason = document.getElementById("reason").value;
    const data = {
      orderId,
      approvedAmount,
      reason
    }
    console.log(data, "data");
    const response = await BillingApprove(data);
    if (response?.status) {
      handleCloseBilling();
      setShowEditButton(false);
      fetchData();
    }
  }

  const BillingModal = ({ show, onHide, billingData }) => {
    console.log(billingData, "billingData");
    // Group suborders by pickup address
    const groupedSubOrders = billingData?.subOrderdata?.reduce((acc, subOrder) => {
      const pickupKey = subOrder.pickupAddress || 'Unknown';
      if (!acc[pickupKey]) {
        acc[pickupKey] = [];
      }
      acc[pickupKey].push(subOrder);
      return acc;
    }, {});

    return (
      <Modal show={show} onHide={onHide} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Billing Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="billing-details p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <div className="bill-header mb-4" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h4 className="text-center mb-3" style={{ color: '#2c3e50', fontWeight: 'bold' }}>BILLING INVOICE</h4>
              <div className="d-flex justify-content-between">
                <div>
                  <p>
                    <strong style={{ color: '#34495e' }}>Order ID:</strong> {billingData?.orderId ? billingData?.orderId : "-"}
                  </p>
                  <p>
                    <strong style={{ color: '#34495e' }}>Date:</strong>{" "}
                    {billingData?.createdAt
                      ? billingData?.createdAt.split(',')[0]
                      : "-"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong style={{ color: '#34495e' }}>Delivery Man:</strong>{" "}
                    {`${billingData?.deliveryBoyName}`}
                  </p>
                  <p>
                    <strong style={{ color: '#34495e' }}>Email:</strong> {billingData?.deliveryBoy?.email}
                  </p>
                  <p>
                    <strong style={{ color: '#34495e' }}>Phone:</strong>{" "}
                    {billingData?.deliveryBoy?.contactNumber || "-"}
                  </p>
                  <p>
                    <strong style={{ color: '#34495e' }}>Delivery Man Type:</strong>{" "}
                    {billingData?.deliveryMan?.createdByAdmin
                      ? "Admin"
                      : "Merchant"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bill-details mb-4">
              {Object.entries(groupedSubOrders || {}).map(([pickupAddress, subOrders], index) => (
                <div key={index} className="border-bottom py-3" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <div>
                    <div>
                      <h5 className="mb-3 font-extrabold" style={{ color: '#2c3e50' }}>Pickup Details</h5>
                    </div>
                    <div>
                      <strong style={{ color: '#34495e' }}>Pickup Address:</strong> {pickupAddress}
                    </div>
                    <div>
                      <strong style={{ color: '#34495e' }}>Charge Method:</strong> {billingData?.chargeMethod}
                    </div>
                  </div>

                  <table className="table table-bordered mt-3" style={{ backgroundColor: 'white' }}>

                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                      <tr>
                        <th style={{ color: '#2c3e50', textAlign: 'center' }} colSpan={10}>Delivery Details</th>
                      </tr>
                      <tr>
                        <th>ID</th>
                        <th>Delivery Address</th>
                        <th>Distance</th>
                        <th>Delivery Date</th>
                        <th>Average Time</th>
                        <th>Total Time</th>
                        <th>Delivery Charge</th>
                        <th>COD</th>
                        <th>Package Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subOrders.map((subOrder, subIndex) => (
                        <tr key={subIndex}>
                          <td>{subOrder?.subOrderId}</td>
                          <td>{subOrder?.deliveryAddress}</td>
                          <td>{subOrder?.distance !== undefined ? `${subOrder?.distance.toFixed(2)} miles` : "-"}</td>
                          <td>
                            {subOrder?.deliveryTime ? subOrder?.deliveryTime: "-"}
                          </td>
                          <td>
                            {subOrder?.averageTime
                              ? `${Math.floor(
                                parseInt(subOrder?.averageTime) / 60
                              )}h ${parseInt(subOrder?.averageTime) % 60}m`
                              : "-"}
                          </td>
                          <td>
                            {subOrder?.TakeTime
                              ? `${Math.floor(subOrder.TakeTime / 3600)}h ${Math.floor((subOrder.TakeTime % 3600) / 60)}m`
                              : "-"}
                          </td>
                          <td>£{subOrder?.chargePer ?? "-"}</td>
                          <td>{subOrder?.isCashOnDelivery ? "Yes" : "No"}</td>
                          <td>£{subOrder?.amountOfPackage ?? "-"}</td>
                          <td>{subOrder?.orderStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div className="bill-footer" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div className="d-flex justify-content-between">
                <div>
                  <p>
                    <strong style={{ color: '#34495e' }}>Total Orders:</strong>{" "}
                    {billingData.subOrderdata?.length || 0}
                  </p>
                  {billingData?.reason ?
                    <p>
                      <strong style={{ color: '#34495e' }}>Reason:</strong> {billingData?.reason ? billingData?.reason : "-"}
                    </p>
                    : null}
                </div>
                <div className="text-start">
                  <p>
                    <strong style={{ color: '#34495e' }}>Total Package Amount:</strong> £
                    {billingData?.subOrderdata
                      ?.reduce(
                        (sum, order) => sum + (order.amountOfPackage || 0),
                        0
                      )
                      .toFixed(2)}
                  </p>
                  <p>
                    <strong style={{ color: '#34495e' }}>Total Delivery Charges:</strong> £
                    {billingData?.subOrderdata
                      ?.reduce((sum, item) => sum + (item.chargePer || 0), 0)
                      .toFixed(2)}
                  </p>
                  {billingData?.approvedAmount ?
                    <p>
                      <strong style={{ color: '#34495e' }}>Total Approved Amount:</strong> £
                      {billingData?.approvedAmount}
                    </p>
                    : null}
                </div>
              </div>
              {
                showEditButton ? (
                  <div className="d-flex justify-content-between mt-4">
                    <p className="w-100 d-flex items-center" >
                      <strong style={{ color: '#34495e' }}>Reason:</strong>
                      <textarea
                        id="reason"
                        defaultValue={billingData?.reason}
                        style={{
                          width: "300px",
                          margin: "10px",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ddd"
                        }}
                        placeholder="Enter reason here..."
                        rows="4"
                      />
                    </p>
                    <p className="w-100 d-flex items-center justify-end" >
                      <div>
                        <strong style={{ color: '#34495e' }}>Approved Amount:</strong>
                        <input
                          type="number"
                          id="approvedAmount"
                          defaultValue={billingData?.totalCharge}
                          style={{
                            width: "100px",
                            margin: "10px",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ddd"
                          }}
                        />
                      </div>
                    </p>
                  </div>
                ) : null
              }
            </div>

            {showEditButton ? (
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <button className="btn btn-secondary"
                    style={{ padding: '8px 20px', borderRadius: '4px' }}
                    onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
                <div>
                  <button className="btn btn-primary"
                    style={{ padding: '8px 20px', borderRadius: '4px' }}
                    onClick={() => handleApprove(billingData.orderId)}>
                    Approve
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getBilling();
      console.log("response", response);

      if (response?.data) {
        // Convert times to UK timezone
        const dataWithUKTime = response.data.map((order) => ({
          ...order,
          createdAt: new Date(order.createdAt).toLocaleString("en-GB", {
            timeZone: "Europe/London",
          }),
          subOrderdata: order.subOrderdata.map((subOrder) => ({
            ...subOrder,
            pickupTime: subOrder.pickupTime
              ? new Date(subOrder.pickupTime).toLocaleString("en-GB", {
                timeZone: "Europe/London",
              })
              : null,
            deliveryTime: subOrder.deliveryTime
              ? new Date(subOrder.deliveryTime).toLocaleString("en-GB", {
                timeZone: "Europe/London",
              })
              : null,
            TakeTime: subOrder.deliveryTime && subOrder.pickupTime
              ? (new Date(subOrder.deliveryTime) - new Date(subOrder.pickupTime)) / 1000 // Convert to seconds
              : null,
          })),
        }));
        console.log(dataWithUKTime, "dataWithUKTime");

        setOrderData(dataWithUKTime);
        const initialOrders = dataWithUKTime.slice(0, itemsPerPage);
        setFilteredOrders(initialOrders);
        setTotalPages(Math.ceil(dataWithUKTime.length / itemsPerPage));
      } else {
        setOrderData([]);
        setFilteredOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showInfoModal]);

  const filterOrders = (query) => {
    let data = orderData;
    console.log(data, "data");

    if (query) {
      const searchLower = query.toLowerCase().trim();
      const searcharr = searchLower.split(" ");
      console.log(data, "data");
      data = data.filter((order) =>
        searcharr.every(
          (word) =>
            order.showOrderId?.toString().includes(word) ||
            order.deliveryMan?.firstName?.toLowerCase().includes(word) ||
            order.deliveryMan?.lastName?.toLowerCase().includes(word) ||
            order.deliveryMan?.email?.toLowerCase().includes(word) ||
            order.deliveryMan?.contactNumber?.toLowerCase().includes(word) ||
            order?.subOrderdata?.some(subOrder => {
              return subOrder?.pickupAddress?.toLowerCase().includes(word) ||
                subOrder?.deliveryAddress?.toLowerCase().includes(word) ||
                subOrder?.deliveryTime?.toLowerCase().includes(word) ||
                subOrder?.pickupTime?.toLowerCase().includes(word) ||
                subOrder?.deliveryTime?.toLowerCase().includes(word) ||
                subOrder?.pickupTime?.toLowerCase().includes(word)
            })

        )
      );
    }

    if (filterCreatedBy !== "all") {
      data = data.filter((order) => {
        if (filterCreatedBy === "Admin") {
          return order.deliveryMan?.createdByAdmin;
        } else {
          return order.deliveryMan?.createdByMerchant;
        }
      });
    }

    if (startDate || endDate) {
      if (startDate && endDate) {
        const startFilterDate = new Date(startDate);
        const endFilterDate = new Date(endDate);
        endFilterDate.setHours(23, 59, 59);

        data = data.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= startFilterDate && orderDate <= endFilterDate;
        });
      } else {
        if (startDate) {
          const filterDate = new Date(startDate);
          filterDate.setHours(0, 0, 0);

          data = data.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= filterDate;
          });
        }

        if (endDate) {
          const filterDate = new Date(endDate);
          filterDate.setHours(23, 59, 59);

          data = data.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate <= filterDate;
          });
        }
      }
    }

    const totalFilteredPages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(totalFilteredPages);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredOrders(data.slice(startIndex, endIndex));
  };

  useEffect(() => {
    filterOrders(searchQuery);
  }, [
    searchQuery,
    startDate,
    endDate,
    filterCreatedBy,
    currentPage,
    itemsPerPage,
    orderData,
  ]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedOrder(null);
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowInfoModal(true);
  };

  const toggleSemTable = (orderId) => {
    setOpenSemTable((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const statusColors = {
    CREATED: "gray",
    ASSIGNED: "blue",
    ACCEPTED: "green",
    CANCELLED: "red",
    UNASSIGNED: "red",
    DELIVERED: "teal",
    PICKED_UP: "orange",
    DEPARTED: "yellow",
    ARRIVED: "purple",
  };

  const getColorClass = (status) =>
    `enable-btn ${statusColors[status]?.toLowerCase() || "default"}`;

  return (
    <div>
      <div className={`navbar ${themeMode === "dark" ? "dark-mode" : ""}`}>
        <div className="navbar-options d-flex my-2 col-12 items-center">
          <input
            type="search"
            className="search-btn border-1 border-slate-500 rounded-start-4 p-3"
            placeholder="Search Order"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-img rounded-end-4 border-0 flex justify-center items-center">
            <img
              src={searchIcon}
              className="search w-[35px]"
              alt="search icon"
            />
          </button>
        </div>
      </div>

      <div className="filter-container p-3 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="date-input-group flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Start:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-input rounded-md border-gray-300 shadow-sm h-9"
              />
            </div>
            <div className="date-input-group flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">End:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-input rounded-md border-gray-300 shadow-sm h-9"
              />
            </div>
            <button
              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              onClick={() => {
                const today = new Date().toISOString().split("T")[0];
                setStartDate(today);
                setEndDate(today);
              }}
            >
              Today
            </button>
            <button
              className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear Dates
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="createdBy"
              className="text-sm font-medium text-gray-700 w-full"
            >
              Created By:
            </label>
            <select
              id="createdBy"
              value={filterCreatedBy}
              onChange={(e) => setFilterCreatedBy(e.target.value)}
              className="form-select rounded-md border-gray-300 shadow-sm h-9"
            >
              <option value="all">All</option>
              <option value="Admin">Admin</option>
              <option value="Merchant">Merchant</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setFilterCreatedBy("all");
              }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
      <div className="w-100 mt-3">
        <div className="table-responsive">
          <table
            className="table-borderless w-100 text-center bg-light"
            style={{ fontSize: "10px" }}
          >
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Delivery Man</th>
                <th className="p-3">Email</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Delivery Date</th>
                <th className="p-3">Assign To</th>
                <th className="p-3">Charge Method</th>
                <th className="p-3">Approved Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
                <th className="p-3">Approve</th>
                <th className="p-3">Info</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="text-center p-3">
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center p-3">
                    No Data Found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <React.Fragment key={index}>
                    <tr className="country-row hover:bg-gray-100 border-1 border-gray-200" onClick={(e) => {
                      const selection = window.getSelection();
                      if (!selection.toString() && !e.target.closest('button') && !e.target.closest('input')) {
                        toggleSemTable(order?.orderId)
                      }
                    }}>
                      <td className="city-data">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3 text-primary">
                        {order?.orderId ?? "-"}
                      </td>
                      <td className="p-3">{`${order?.deliveryBoyName ?? "-"}`}</td>
                      <td className="p-3">
                        {order?.deliveryBoy?.email ?? "-"}
                      </td>
                      <td className="p-3">
                        {order?.createdAt ?? "-"}
                      </td>
                      <td className="p-3">
                        {order?.subOrderdata?.length > 0
                          ? (() => {
                            const lastSubOrder = order.subOrderdata.reduce((latest, current) => {
                              if (!latest?.deliveryTime) return current;
                              if (!current?.deliveryTime) return latest;
                              return new Date(current?.deliveryTime) > new Date(latest?.deliveryTime)
                                ? current
                                : latest;
                            }, order.subOrderdata[0]);

                            return lastSubOrder?.deliveryTime ?? "-";
                          })()
                          : "-"}
                      </td>
                      <td className="p-3">
                        {order?.deliveryMan?.createdByAdmin
                          ? "Admin "
                          : "Merchant DeliveryMan"}
                      </td>
                      <td className="p-3">
                        {order?.chargeMethod ?? "-"}
                      </td>
                      <td className="p-3">
                        {order?.approvedAmount ?? "0"}
                      </td>
                      <td className="p-3">
                        <button
                          className={`${getColorClass(
                            order?.orderStatus
                          )} mx-2`}
                        >
                          {order?.orderStatus ?? "-"}
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            handleShowBilling(order);
                            setShowEditButton(false);
                          }}
                          style={{ marginRight: "10px" }}
                        >
                          <img src={show} alt="Show" className="mx-auto" />
                        </button>
                      </td>
                      <td>
                        <Tooltip text={order?.isApproved ? "Approved" : "Approve"}>
                          <button
                            onClick={() => {
                              handleShowBilling(order);
                              setShowEditButton(true);
                            }}
                            disabled={order?.orderStatus == "DELIVERED" ? order?.isApproved ? true : false : true}
                            style={{
                              marginRight: "10px",
                              backgroundColor: order?.orderStatus == "DELIVERED" ? order?.isApproved ? "green" : "orange" : "gray",
                              color: "white",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              cursor: order?.orderStatus == "DELIVERED" ? order?.isApproved ? "not-allowed" : "pointer" : "not-allowed",
                            }}
                          >
                            {order?.orderStatus == "DELIVERED" ? order?.isApproved ? "Approved" : "Approve" : "Pending"}
                          </button>
                        </Tooltip>
                      </td>

                      <td>
                        <button onClick={() => toggleSemTable(order?.orderId)}>
                          {openSemTable[order?.orderId] ? "Close" : "Open"}
                        </button>
                      </td>
                    </tr>
                    {openSemTable[order?.orderId] && (
                      <tr>
                        <td colSpan="13">
                          <div className="dropdown-table">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th className="p-3">Sub Order ID</th>
                                  <th className="p-3">Pickup Time</th>
                                  <th className="p-3">Delivery Time</th>
                                  <th className="p-3">Average Delivery Time</th>
                                  <th className="p-3">Total Take Time</th>
                                  <th className="p-3">Pickup Address</th>
                                  <th className="p-3">Delivery Address</th>
                                  <th className="p-3">Distance</th>
                                  <th className="p-3">Charge on take time</th>
                                  <th className="p-3"> is Cash on Delivery</th>
                                  <th className="p-3">Amount of package</th>
                                  <th className="p-3">Status</th>
                                  <th className="p-3">Charge Method</th>
                                  <th className="p-3">Is Approved</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order?.subOrderdata?.map((subOrder, subIndex) => (
                                  <tr key={subIndex}>
                                    <td className="p-3 ">
                                      {subOrder?.subOrderId ?? "-"}
                                    </td>
                                    <td className="p-3 ">
                                      {
                                        subOrder?.pickupTime ?? 0
                                      }
                                    </td>
                                    <td className="p-3 ">
                                      {subOrder?.deliveryTime}
                                    </td>

                                    <td className="p-3 ">
                                      {subOrder?.averageTime
                                        ? `${Math.floor(
                                          parseInt(subOrder.averageTime) / 60
                                        )}h ${parseInt(subOrder.averageTime) % 60
                                        }m`
                                        : "-"}
                                    </td>

                                    <td className="p-3 ">
                                      {subOrder?.TakeTime
                                        ? `${Math.floor(subOrder.TakeTime / 3600)}h ${Math.floor((subOrder.TakeTime % 3600) / 60)}m`
                                        : "-"}

                                    </td>
                                    <td className="p-3 ">
                                      {subOrder?.pickupAddress ?? "-"}
                                    </td>
                                    <td className="p-3">
                                      {subOrder?.deliveryAddress ?? "-"}
                                    </td>

                                    <td className="py-3 px-2 ">
                                      {`${subOrder?.distance !== undefined ? subOrder?.distance.toFixed(2) : "-"}` ??
                                        "-"}
                                    </td>
                                    <td className="py-3 px-2 ">
                                      {`${subOrder?.chargePer ?? "-"}`}
                                    </td>
                                    <td className="py-3 px-2 ">
                                      {subOrder?.isCashOnDelivery
                                        ? "Yes"
                                        : "No"}
                                    </td>
                                    <td className="py-3 px-2 ">
                                      {subOrder?.amountOfPackage === undefined
                                        ? "-"
                                        : subOrder.amountOfPackage}
                                    </td>

                                    <td className="p-3 ">
                                      <button
                                        className={`${getColorClass(
                                          subOrder.orderStatus
                                        )} mx-2`}
                                      >
                                        {subOrder?.orderStatus ?? "-"}
                                      </button>
                                    </td>
                                    <td className="p-3 ">
                                      {order?.chargeMethod ?? "-"}
                                    </td>
                                    <td className="p-3 ">
                                      {order?.isApproved ? "Yes" : "No"}
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
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-3">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
          <select
            className="form-select ms-3 w-20"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {showBillingModal && (
        <BillingModal
          show={showBillingModal}
          onHide={handleCloseBilling}
          billingData={selectedBillingData}
        />
      )}

      {showInfoModal && (
        <Showbilling order={selectedOrder} onHide={closeInfoModal} />
      )}
    </div>
  );
};

export default Billing;



