import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllOrder.css";
import add from "../../assets_mercchant/add.png";
import tracking from "../../assets_mercchant/delivery-bike.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";
import searchIcon from "../../assets_mercchant/search.png";
import { getMultiOrders, getOrders } from "../../Components_merchant/Api/Order";
import DeleteModal from "../../Components_merchant/DeleteUser/DeleteUser";
import edit from "../../assets_mercchant/edit.png";
import UpdateDeliveryBoyModal from "../DeliveryMan/UpdateDeliveryManModal";
import UpdateOrderModal from "./UpdateOrderModal";
import { format } from "date-fns";
import { getDeliveryManLocationByOrder } from "../../Components_merchant/Api/DeliveryMan";
import MapModal from "./MapModal";
import html2pdf from "html2pdf.js";
import Loader from "../../Components_admin/Loader/Loader";
import OrderInfoModalMulti from "./OrderInfoModalMulti";
import UpdateOrderModalMulti from "./UpdateOrderModalMulti";
import DeleteUserMulti from "../../Components_merchant/DeleteUser/DeleteUserMulti";
import { getMerchantParcelType } from "../../Components_merchant/Api/ParcelType";
import { Pagination, Stack } from "@mui/material";
import Tooltip from "../Tooltip/Tooltip";

const CancelledOrders = () => {
  const [showModel, setShowModel] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [themeMode, setThemeMode] = useState("light");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [status, setStatus] = useState(null);
  const [text, setText] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openSemTable, setOpenSemTable] = useState({});
  const [subOrderId, setSubOrderId] = useState(null);
  const [isSingle, setIsSingle] = useState(false);
  const [parcelTypeDetail, setParcleTypeDetail] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isUpdate, setIsUpdate] = useState(false);
  const [getallcancelledorders, setGetallcancelledorders] = useState(true);



  const [showDelete, setShowDelete] = useState(false);
  console.log("isUpdate", isUpdate);
  const fetchData = async () => {
    setLoading(true);
    try {
      const parcelTypeRes = await getMerchantParcelType();
      if (parcelTypeRes.status) {
        setParcleTypeDetail(parcelTypeRes.data);
      }
      const MerchantId = await localStorage.getItem("merchnatId");
      const response = await getMultiOrders(MerchantId, getallcancelledorders);
      console.log("response", response);

      if (response?.data) {
        // Filter out trashed orders first
        const nonTrashedOrders = response.data.filter(order => !order.trashed)
        setOrderData(nonTrashedOrders);

        // Calculate initial filtered orders based on itemsPerPage
        const initialOrders = nonTrashedOrders.slice(0, itemsPerPage);
        setFilteredOrders(initialOrders);

        // Calculate total pages based on non-trashed orders
        setTotalPages(Math.ceil(nonTrashedOrders.length / itemsPerPage));
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
    filterOrders(searchQuery);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {

    const fetchDataWithDelay = async () => {
      console.log("showModel123", showModel);
      console.log("isUpdate123", isUpdate);
      await fetchData();
    };
    const timer = setTimeout(fetchDataWithDelay, 1000); // Delay of 1 second
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [showModel, isUpdate]);

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedOrder(null);
  };

  const closeModel = () => setShowModel(false);

  const filterOrders = (query) => {
    // Start with non-trashed orders only
    var data = orderData.filter((order) => !order.trashed);

    const filteredData = data.filter((order) => {
      const searchLower = query.toLowerCase();
      const searchTerms = searchLower.split(" ");
      return searchTerms.some(term =>
        order.orderId?.toString().includes(term) ||
        order.deliveryMan?.toLowerCase().includes(term) ||
        // order.customerName?.toLowerCase().includes(term) ||
        order.pickupAddress?.address?.toLowerCase().includes(term) ||
        order.status?.toLowerCase().includes(term) ||
        order.deliveryAddress?.some(item => item.name?.toLowerCase().includes(term) || (`${item.address} (${item.postCode})`).trim()?.toLowerCase().includes(term) || item.address?.toLowerCase().includes(term) || (item?.time?.end ? format(new Date(item.time.end), "dd-MM-yyyy") : "-").includes(term))
      );
    });







    data = filteredData;

    if (filterStatus !== "all") {
      data = data.filter((order) => order.status?.toLowerCase() === filterStatus.toLowerCase());
    }

    if (startDate || endDate) {
      if (startDate && endDate) {
        const startFilterDate = new Date(startDate);
        const endFilterDate = new Date(endDate);
        endFilterDate.setHours(23, 59, 59);

        data = data.filter((order) => {
          const [datePart, timePart] = order.createdDate.split(" , ");
          const [day, month, year] = datePart.split("-");
          const [hours, minutes] = timePart.split(":");
          const orderDate = new Date(year, month - 1, day, hours, minutes);
          return orderDate >= startFilterDate && orderDate <= endFilterDate;
        });
      } else {
        if (startDate) {
          const filterDate = new Date(startDate);
          filterDate.setHours(0, 0, 0);

          data = data.filter((order) => {
            const [datePart, timePart] = order.createdDate.split(" , ");
            const [day, month, year] = datePart.split("-");
            const [hours, minutes] = timePart.split(":");
            const orderDate = new Date(year, month - 1, day, hours, minutes);
            return orderDate >= filterDate;
          });
        }

        if (endDate) {
          const filterDate = new Date(endDate);
          filterDate.setHours(23, 59, 59);

          data = data.filter((order) => {
            const [datePart, timePart] = order.createdDate.split(" , ");
            const [day, month, year] = datePart.split("-");
            const [hours, minutes] = timePart.split(":");
            const orderDate = new Date(year, month - 1, day, hours, minutes);
            return orderDate <= filterDate;
          });
        }
      }
    }

    // Sort data by exact match on showOrderNumber
    const sortedData = data.sort((a, b) => {
      const aMatch = String(a.showOrderNumber).toLowerCase() === query.toLowerCase();
      const bMatch = String(b.showOrderNumber).toLowerCase() === query.toLowerCase();
      return bMatch - aMatch;
    });

    // Update pagination based on filtered results
    setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredOrders(sortedData.slice(startIndex, endIndex));
  };

  useEffect(() => {
    filterOrders(searchQuery);
    setCurrentPage(1);
  }, [searchQuery, startDate, endDate, filterStatus]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    filterOrders(searchQuery);
  };

  const hadleTrackOrder = async (
    id,
    deliveryLocation,
    pickupLocation,
    status
  ) => {
    try {
      if (status) {
        setStatus(status);
      }
      if (
        pickupLocation &&
        pickupLocation.latitude &&
        pickupLocation.longitude
      ) {
        setPickupLocation({
          lat: pickupLocation.latitude,
          lng: pickupLocation.longitude,
        });
      }
      if (
        deliveryLocation &&
        deliveryLocation.latitude &&
        deliveryLocation.longitude
      ) {
        setDeliveryLocation({
          lat: deliveryLocation.latitude,
          lng: deliveryLocation.longitude,
        });
      }

      const response = await getDeliveryManLocationByOrder(id);

      if (response?.data?.data?.[0]?.location) {
        const { latitude, longitude } = response.data.data[0].location;
        if (latitude && longitude) {
          setLocation({ lat: latitude, lng: longitude });
          setShowMapModal(true);
        }
      }
    } catch (error) {
      console.error("Error tracking order:", error);
    }
  };

  const handleViewClick = (Order) => {
    setShowInfoModal(true);
    setSelectedOrder({
      ...Order,
      deliveryAddresses: Order.deliveryAddress,
      pickupuserSignature: Order.pickupAddress?.userSignature,
    });
  };
  console.log(selectedOrder, "selectedOrder");

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedOrder(null);
  };

  const hadleDeleteOrder = (id, subOrderId, text) => {
    console.log("id", id);
    setShowDelete(true);
    setOrderId(id);
    setText(text);
    setSubOrderId(subOrderId);
  };

  const handleCloseModal = () => {
    setShowModel(false);
    setOrderId(null);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
    setIsSingle(order?.isSingle);
  };

  const handleDate = (date) => {
    const timestamp = date;
    const formattedDate = format(new Date(timestamp), "dd-MM-yyyy");
    return formattedDate;
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

  const toggleSemTable = (orderId) => {
    setOpenSemTable((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const downloadInvoice = async (order) => {
    try {
      navigate("/invoice-format", {
        state: {
          orderData: {
            orderId: order.orderId,
            showOrderNumber: order.showOrderNumber,
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

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        setFilterStatus(status.toUpperCase());
        filterOrders(searchQuery);
      }, 10);
    }
  }, [loading]);
  return (
    <div >
      <div className="d-flex justify-content-between align-items-center pb-3 nav-bar">
        <div className="add-order-button">
          <button
            type="button"
            className="btn border-0"
            style={{ background: "#D65246" }}
          >
            <Link
              to="/multi-orders"
              className="d-flex align-items-center"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img src={add} alt="Add" className="me-2" />
              Add Order
            </Link>
          </button>
        </div>
        <div className={`navbar ${themeMode === "dark" ? "dark-mode" : ""}`}>
          <div className="navbar-options d-flex my-2 col-12 items-center">
            <input
              type="search"
              className="search-btn border-1 border-slate-500 rounded-start-4 p-3"
              placeholder="Search Order"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
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
      </div>
      <div className="filter-container p-3 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="date-input-group flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Start:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); }}
                className="form-input rounded-md border-gray-300 shadow-sm h-9"
              />
            </div>
            <div className="date-input-group flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">End:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); }}
                className="form-input rounded-md border-gray-300 shadow-sm h-9"
              />
            </div>
            <button
              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              onClick={() => {
                setStartDate(new Date().toISOString().split('T')[0]);
                setEndDate(new Date().toISOString().split('T')[0])
              }}
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setFilterStatus("all");
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
                <th className="p-3">Order ID</th>
                <th className="p-3">Delivery Man</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Pickup Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Is Assigned</th>
                <th className="p-3">Re Assign</th>
                <th className="p-3">Action</th>
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
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="13" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">No Data Found</div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) =>
                  order.deliveryAddress.some(subOrder => subOrder.trashed === false) ? (
                    <React.Fragment key={index}>
                      <tr className="country-row hover:bg-gray-100 border-1 border-gray-200" onClick={(e) => {
                        const selection = window.getSelection();
                        if (!selection.toString() && !e.target.closest('button') && !e.target.closest('input')) {
                          toggleSemTable(order._id)
                        }
                      }}>
                     
                        <td className="p-3 text-primary">
                          {order?.orderId ?? "-"}
                        </td>
                        <td className="p-3">
                          {`${order?.deliveryMan}` ?? "-"}
                        </td>
                        <td className="p-3">{order?.createdDate ?? "-"}</td>
                        <td className="p-3">{order?.pickupDate ?? "-"}</td>
                        <td className="p-3">
                          <button
                            // className={`${getColorClass(getallcancelledorders ? order.status : "CANCELLED")} mx-2`}
                            className={`${getColorClass("CANCELLED")} mx-2`}
                          >
                          CANCELLED
                            {/* {getallcancelledorders ? order.status : "CANCELLED"} */}
                          </button>
                        </td>
                        <td className="p-3">
                          {order?.isReassign ? "Yes" : "No"}
                        </td>
                        <td>
                        <Link
                          to="/multi-orders"
                          state={{ orderData: order }}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            order?.isReassign 
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer'
                          }`}
                          onClick={(e) => order?.isReassign && e.preventDefault()}
                        >
                          Re Assign
                        </Link>
                        </td>
                        <td className="city-data">
                          <Tooltip text={"Delete"}>
                            <button
                              className="delete-btn me-1"
                              onClick={() => {
                                setShowDelete(true)
                                hadleDeleteOrder(order._id, null, "Order")
                              }}
                            >
                              <img
                                src={deleteimg}
                                alt="Delete"
                                className="mx-auto"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip text={"Show data"}>

                            <button
                              className="show-btn ms-1"
                              onClick={() => {
                                setShowDelete(false)
                                handleViewClick(order)
                              }}
                            >
                              <img src={show} alt="Show" className="mx-auto" />
                            </button>
                          </Tooltip>
                        </td>
                        <td>
                          <Tooltip text={openSemTable[order._id] ? "Close" : "Open"}>

                            <button onClick={() => toggleSemTable(order._id)}>
                              {openSemTable[order._id] ? "Close" : "Open"}
                            </button>
                          </Tooltip>
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
                                    <th className="p-3">
                                      Pickup Address (PostCode)
                                    </th>
                                    <th className="p-3">
                                      Delivery Address (PostCode)
                                    </th>
                                    <th className="p-3">Delivery Date</th>
                                    <th className="p-3">Parcel Type</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                              
                                  </tr>
                                </thead>
                                <tbody>
                                  {loading ? (
                                    <tr>
                                      <td
                                        colSpan="13"
                                        className="text-center p-3"
                                      >
                                        <div className="d-flex justify-content-center">
                                          <div className="mx-auto">
                                            <Loader />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  ) : order.deliveryAddress.length === 0 ? (
                                    <tr>
                                      <td
                                        colSpan="13"
                                        className="text-center p-3"
                                      >
                                        <div className="d-flex justify-content-center">
                                          <div className="mx-auto">
                                            No Data Found
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  ) : (
                                    order.deliveryAddress.map(
                                      (subOrder, index) =>
                                        subOrder.trashed === false ? (
                                          <tr
                                            key={index}
                                            className="country-row"
                                          >
                                            <td className="p-3 text-primary">
                                              {subOrder?.subOrderId ?? "-"}
                                            </td>
                                            <td className="p-3">
                                              {subOrder?.name ?? "-"}
                                            </td>
                                            <td className="p-3">
                                              {`${order.pickupAddress?.address} (${order.pickupAddress?.postCode})` ??
                                                "-"}
                                            </td>
                                            <td className="p-3">
                                              {`${subOrder?.address} (${subOrder?.postCode})` ??
                                                "-"}
                                            </td>
                                            <td className="p-3">{subOrder?.time?.end ? format(new Date(subOrder.time.end), "dd-MM-yyyy HH:mm") : "-"}</td>
                                            <td className="p-3">
                                              {subOrder?.parcelType2?.length > 0
                                                ? subOrder.parcelType2.map(id =>
                                                  parcelTypeDetail.find(type => type.parcelTypeId === id)?.label
                                                ).join(", ")
                                                : "-"}
                                            </td>
                                            {/* <td className="p-3">{subOrder?.invoice ?? "-"}</td> */}
                                            <td className="p-3">
                                              <button
                                                className={`${getColorClass(
                                                  subOrder.status
                                                )} mx-2`}
                                              >
                                                {subOrder.status}
                                              </button>
                                            </td>
                                            <td className="city-data">
                                             
                                              <Tooltip text={"Delete suboder"}>

                                                <button
                                                  className="delete-btn me-1"
                                                  onClick={() =>
                                                    hadleDeleteOrder(
                                                      order._id,
                                                      subOrder.subOrderId,
                                                      "SubOrder"
                                                    )
                                                  }
                                                >
                                                  <img
                                                    src={deleteimg}
                                                    alt="Delete"
                                                    className="mx-auto"
                                                  />
                                                </button>
                                              </Tooltip>
                                              <Tooltip text={"Show suboder details"} transform="translateX(-100%)" >
                                                <button
                                                  className="show-btn ms-1"
                                                  onClick={() => {
                                                    setIsSingle(
                                                      subOrder?.subOrderId,
                                                    )
                                                    handleViewClick({
                                                      ...order,
                                                      deliveryAddresses: subOrder,
                                                    })
                                                  }
                                                  }
                                                >
                                                  <img
                                                    src={show}
                                                    alt="Show"
                                                    className="mx-auto"
                                                  />
                                                </button>
                                              </Tooltip>
                                            </td>
                                          </tr>
                                        ) : null
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ) : null
                )
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
            onChange={(e) => { setCurrentPage(1); setItemsPerPage(Number(e.target.value)) }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      {showEditModal && (
        <UpdateOrderModalMulti Order={selectedOrder} onHide={closeEditModal} isSingle={isSingle} setIsUpdate2={setIsUpdate} />
      )}

      {showDelete && (
        <DeleteUserMulti
          text={text}
          Id={orderId}
          subOrderId={subOrderId}
          onDelete={async () => {
            console.log("showDelete", showDelete);

            await fetchData()
            setShowDelete(false)
          }}
          onHide={() => {
            setShowDelete(false)
          }}
        />
      )}
      {showInfoModal && (
        <OrderInfoModalMulti Order={selectedOrder} onHide={closeInfoModal} parcelTypeDetail={parcelTypeDetail} isSingle={isSingle} />
      )}
      {showMapModal && location && (
        <MapModal
          location={location}
          deliveryLocation={deliveryLocation}
          pickupLocation={pickupLocation}
          status={status}
          onHide={() => {
            setShowMapModal(false);
            setLocation(null);
            setDeliveryLocation(null);
          }}
        />
      )}
    </div>
  );
};

export default CancelledOrders;
