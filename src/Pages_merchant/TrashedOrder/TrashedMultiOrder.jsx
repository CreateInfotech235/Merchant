import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './TrashedOrder.css'
import add from "../../assets_mercchant/add.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";
import searchIcon from "../../assets_mercchant/search.png";
import { getMultiOrders, getOrders } from "../../Components_merchant/Api/Order";
import DeleteModal from "../../Components_merchant/DeleteUser/DeleteUser";
import ConformDeleteModel from "../ConformDeleteModel/ConformDeleteModel";
import Loader from "../../Components_admin/Loader/Loader";
import ConformDeleteModelMulti from "../ConformDeleteModel/ConformDeleteModelMulti";
import { FaUndo } from "react-icons/fa";
import tracking from "../../assets_mercchant/delivery-bike.png";
import { Stack, Pagination } from "@mui/material";
import Tooltip from "../Tooltip/Tooltip";


const TrashedMultiOrder = () => {
  const [showModel, setShowModel] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [themeMode, setThemeMode] = useState("light");
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSemTable, setOpenSemTable] = useState({});
  const [text, setText] = useState("");
  const [subOrderId, setSubOrderId] = useState(null);
  const [undo, setUndo] = useState(false);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [filterStatus, setFilterStatus] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showDelete, setshowDelete] = useState(false);
  const [isdatachenged, setIsdatachenged] = useState(false);
  const [trashed, settrashed] = useState(undefined);
  const [timeRemaining, setTimeRemaining] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const MerchantId = await localStorage.getItem('merchnatId');
      const response = await getMultiOrders(MerchantId);
      console.log("response", response);
      if (response?.data) {
        const trashedData = response.data.filter(data => data.deliveryAddress.some(subOrder => subOrder.trashed === true));
        setOrderData(trashedData);
        setFilteredOrders(trashedData.slice(0, itemsPerPage));
        // Set initial total pages based on fetched data
        setTotalPages(Math.ceil(trashedData.length / itemsPerPage));
      } else {
        setOrderData([]);
        setFilteredOrders([]);
        setTotalPages(1); // Set to 1 if no data
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrderData([]);
      setFilteredOrders([]);
      setTotalPages(1); // Set to 1 if error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (isdatachenged) {
      fetchData();
    }
  }, [isdatachenged]);

  const closeModel = () => setShowModel(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterOrders(event.target.value);
  };

  const filterOrders = (query, value = 1) => {
    let data = [...orderData]; // Create a copy of orderData
    const lowercasedQuery = query?.toLowerCase()?.trim() || "";

    // Filter data based on search query
    if (lowercasedQuery !== "") {
      data = data.filter((order) => {
        const searchableFields = [
          order.orderId,
          order.customerName,
          order.pickupAddress?.address,
          order.status,
        ].map(field => String(field || "").toLowerCase());

        // Check delivery addresses
        const deliveryAddressMatch = order.deliveryAddress?.some(subOrder => {
          const addressString = `${subOrder.address || ""} ${subOrder.postCode || ""}`.toLowerCase();
          const nameString = (subOrder.name || "").toLowerCase();
          return addressString.includes(lowercasedQuery) || nameString.includes(lowercasedQuery);
        });

        return searchableFields.some(field => field.includes(lowercasedQuery)) || deliveryAddressMatch;
      });
    }

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

    // Calculate pagination
    const startIndex = (value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Update total pages and filtered orders
    setTotalPages(Math.max(1, Math.ceil(data.length / itemsPerPage)));
    setFilteredOrders(data.slice(startIndex, endIndex));
  };

  useEffect(() => {
    setCurrentPage(1);
    filterOrders(searchQuery);
  }, [searchQuery, startDate, endDate, filterStatus]);

  const handlePageChange = async (event, value) => {
    await setCurrentPage(value);
    filterOrders(searchQuery, value);
  };





  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? "active" : null}
      >
        {number}
      </li>
    ));
  };

  const hadleDeleteOrder = (id, subOrderId, text, undo) => {
    console.log("subOrderId", subOrderId, "id", id, "text", text);

    console.log("id", id);
    setShowModel(true);
    setOrderId(id);
    setText(text);
    setSubOrderId(subOrderId);
    setUndo(undo);
  };

  const handleCloseModal = () => {
    setShowModel(false);
    setOrderId(null);
  };

  const toggleSemTable = (orderId) => {
    setOpenSemTable(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const hadleTrackOrder = (deliveryManId, deliveryLocation, pickupLocation, status) => {
    // Implement tracking logic here
  };

  const downloadInvoice = (order) => {
    // Implement invoice download logic here
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




  const calculateTimeRemaining = (trashedtime, id) => {
    if (!timeRemaining[id]) {
      setInterval(() => {
        const now = new Date();
        const trashedTime = new Date(trashedtime);
        const timeDifference = now - trashedTime;
        const totalSeconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Only update timeRemaining if within the 1-minute limit
        if ((1 - minutes) >= 0) {
          setTimeRemaining(prev => {
            const newTimeRemaining = { ...prev };
            newTimeRemaining[id] = `${minutes}m ${seconds}s`;
            return newTimeRemaining;
          });
        } else {
          // Remove the entry if time limit is exceeded
          setTimeRemaining(prev => {
            const newTimeRemaining = { ...prev };
            delete newTimeRemaining[id];
            return newTimeRemaining;
          });
        }
      }, 1000);
    }
  };


  useEffect(() => {
    filteredOrders.forEach(order => {
      calculateTimeRemaining(order.trashedtime, order._id);
    });
  }, [filteredOrders]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pb-3 nav-bar">
        <div className="add-order-button">

        </div>
        <div className={`navbar ${themeMode === "dark" ? "dark-mode" : ""}`}>
          <div className="navbar-options d-flex my-2 col-12 items-center">
            <input
              type="search"
              className="search-btn border-1 border-slate-500  rounded-start-4 p-3 "
              placeholder="Search Order"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0 flex justify-center items-center">
              <img src={searchIcon} className="search w-[30px]" alt="search icon" />
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
            <button
              className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => { setStartDate(""); setEndDate("") }}
            >
              Clear Dates
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="status" className="text-sm font-medium text-gray-700">Status:</label>
              <select
                id="status"
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value) }}
                className="form-select rounded-md border-gray-300 shadow-sm h-9"
              >
                <option value="all">All</option>
                <option value="CREATED">Created</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="UNASSIGNED">Unassigned</option>
                <option value="DELIVERED">Delivered</option>
                <option value="PICKED_UP">Picked Up</option>
                <option value="DEPARTED">Departed</option>
                <option value="ARRIVED">Arrived</option>
              </select>
            </div>
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

      <div className=" w-100 mt-3">
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
                <th className="p-3">Created Date</th>
                <th className="p-3">Pickup Date</th>
                {/* <th className="p-3">Invoice</th> */}
                <th className="p-3">Status</th>
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
                filteredOrders.map((order, index) => (
                  <React.Fragment key={index}>
                    <tr className="country-row hover:bg-gray-100 border-1 border-gray-200"
                      onClick={(e) => {
                        const selection = window.getSelection();
                        if (!selection.toString() && !e.target.closest('button') && !e.target.closest('input')) {
                          toggleSemTable(order._id)
                        }
                      }}
                    >
                      <td className="city-data">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3 text-primary">
                        {order?.orderId ?? "-"}
                      </td>
                      <td className="p-3">
                        {`${order?.deliveryMan}` ?? "-"}
                      </td>
                      <td className="p-3">{order?.createdDate ?? "-"}</td>
                      <td className="p-3">{order?.pickupDate ?? "-"}</td>
                      {/* <td className="p-3 fw-bold">
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
                      </td> */}
                      <td className="p-3">
                        <button
                          className={`${getColorClass(order.status)} mx-2`}
                        >
                          {order.status}
                        </button>
                      </td>
                      <td className="city-data p-0">
                        {
                          timeRemaining[order._id] && (1 - parseInt(timeRemaining[order._id].split('m')[0])) >= 0 ? (
                            <>
                         
                              {`Time Left to undo order : ${1 - parseInt(timeRemaining[order._id].split('m')[0])}m ${60 - parseInt(timeRemaining[order._id].split(' ')[1])}s`}
                            <Tooltip text={`Time Left to undo order : ${1 - parseInt(timeRemaining[order._id].split('m')[0])}m ${60 - parseInt(timeRemaining[order._id].split(' ')[1])}s`}>
                              <button
                                className="delete-btn me-1"
                                onClick={() => {
                                  hadleDeleteOrder(order._id, null, "Order", true)
                                  setshowDelete(false)
                                  settrashed(false)
                                }}
                              >
                                <FaUndo
                                  alt="undo"
                                  className="mx-auto"
                                  />
                              </button>
                            </Tooltip>
                                  </>
                          ) : null
                        }
                        

                        <Tooltip text="Delete Order">
                          <button
                            className="delete-btn me-1"
                            onClick={() => {
                              hadleDeleteOrder(order._id, null, "Order", false)
                              setshowDelete(true)
                            }}
                          >
                            <img
                              src={deleteimg}
                              alt="Delete"
                              className="mx-auto"
                            />
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
                                  <th className="p-3"></th>
                                  <th className="p-3">Sub Order ID</th>
                                  <th className="p-3">Customer Name</th>
                                  <th className="p-3">
                                    Pickup Address (PostCode)
                                  </th>
                                  <th className="p-3">
                                    Delivery Address (PostCode)
                                  </th>
                                  <th className="p-3">Delivery Date</th>
                                  {/* <th className="p-3">Invoice</th> */}
                                  <th className="p-3">Status</th>
                                  <th className="p-3">Action</th>
                                  <th className="p-3">Order Tracking</th>
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
                                  order.deliveryAddress.map((subOrder, index) => (
                                    subOrder.trashed === true ? (
                                      <tr key={index} className="country-row">
                                        <td className="city-data">
                                          <input type="checkbox" />
                                        </td>
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

                                        <td className="p-3">{subOrder?.orderTimestamp ? new Date(subOrder.orderTimestamp).toLocaleDateString('en-GB') : "-"}</td>

                                        {/* <td className="p-3">-</td> */}
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
                                          {
                                            timeRemaining[order._id] && (1 - parseInt(timeRemaining[order._id].split('m')[0])) >= 0 ? (
                                              <Tooltip text={`Time Left to undo order : ${1 - parseInt(timeRemaining[order._id].split('m')[0])}m ${60 - parseInt(timeRemaining[order._id].split(' ')[1])}s`}>
                                                <button className="delete-btn me-1"
                                                  onClick={() => {
                                                    hadleDeleteOrder(order._id, subOrder.subOrderId, "SubOrder", true);
                                                    setshowDelete(false)
                                                    settrashed(false)
                                                  }
                                                  }
                                                >
                                                  <FaUndo
                                                    alt="undo"
                                                    className="mx-auto"
                                                  />
                                                </button>
                                              </Tooltip>
                                            ) : null
                                          }
                                          
                                          <Tooltip text="Delete Sub Order">
                                            <button
                                              className="delete-btn me-1"
                                              onClick={() => {
                                                hadleDeleteOrder(order._id, subOrder.subOrderId, "SubOrder", false);
                                                setshowDelete(true)
                                              }}
                                            >
                                              <img
                                                src={deleteimg}
                                                alt="Delete"
                                                className="mx-auto"
                                              />
                                            </button>
                                          </Tooltip>
                                        </td>
                                        <td className="city-data">
                                          <button
                                            className="delete-btn"
                                            onClick={() => {
                                              if (
                                                [
                                                  "ACCEPTED",
                                                  "ASSIGNED",
                                                  "CANCELLED",
                                                  "DELIVERED",
                                                  "CREATED",
                                                ].includes(subOrder.status)
                                              ) {
                                                alert(
                                                  "You are not able to track. Tracking starts from the status 'Arrived' to 'Delivered'."
                                                );
                                              } else {
                                                hadleTrackOrder(
                                                  order.deliveryManId,
                                                  subOrder.location,
                                                  order.pickupAddress.location,
                                                  subOrder.status
                                                );
                                              }
                                            }}
                                          >
                                            <Tooltip text="Track order">
                                              <img
                                                src={tracking}
                                                alt="Tracking"
                                                className="mx-auto"
                                              />
                                            </Tooltip>
                                          </button>
                                        </td>
                                      </tr>
                                    ) : null
                                  ))
                                )}
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

        <div className={`justify-content-end align-items-center mt-3 ${filteredOrders.length == 0 ? "d-none" : "d-flex"}`}>
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

      {showModel && <ConformDeleteModelMulti
        text={text}
        Id={orderId}
        subOrderId={subOrderId}
        onDelete={async () => {
          handleCloseModal()
          setshowDelete(false)
          await fetchData()
        }}
        trashed={trashed}
        onHide={() => {
          setShowModel(false)
          setshowDelete(false)
        }}
        showDelete={showDelete}
        // setIsdatachenged={setIsdatachenged}
        undo={undo}
      />}
    </>
  );
};

export default TrashedMultiOrder;
