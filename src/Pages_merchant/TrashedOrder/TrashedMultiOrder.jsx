import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './TrashedOrder.css'
import add from "../../assets_mercchant/add.png";
import tracking from "../../assets_mercchant/tracking.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";
import searchIcon from "../../assets_mercchant/search.png";
import { getMultiOrders, getOrders } from "../../Components_merchant/Api/Order";
import DeleteModal from "../../Components_merchant/DeleteUser/DeleteUser";
import ConformDeleteModel from "../ConformDeleteModel/ConformDeleteModel";
import Loader from "../../Components_admin/Loader/Loader";
import ConformDeleteModelMulti from "../ConformDeleteModel/ConformDeleteModelMulti";
import { FaUndo } from "react-icons/fa";
import { getMerchantParcelType } from "../../Components_merchant/Api/ParcelType";


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
  const [parcelTypeDetail, setParcleTypeDetail] = useState([]);


  const fetchData = async() => {
    setLoading(true);
    try {
      const MerchantId = await localStorage.getItem('merchnatId');
      const response = await getMultiOrders(MerchantId, 1, 10000000);
      const parcelTypeRes = await getMerchantParcelType();
      if (parcelTypeRes.status) {
        setParcleTypeDetail(parcelTypeRes.data);
      }
      if (response?.data) {
        const trashedData = response.data.filter(data => data.deliveryAddress.some(subOrder => subOrder.trashed === true));
        setOrderData(trashedData);
        setFilteredOrders(trashedData);
      } else {
        setOrderData([]);
        setFilteredOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrderData([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showModel]);

  const closeModel = () => setShowModel(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterOrders(event.target.value);
  };

  const filterOrders = (query) => {
    if (!query) {
      setFilteredOrders(orderData);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filteredData = orderData.filter((order) => {
      return (
        String(order.orderId).toLowerCase().includes(lowercasedQuery) ||
        (order.customerName ? order.customerName.toLowerCase() : "").includes(lowercasedQuery) ||
        (order.pickupAddress?.address ? String(order.pickupAddress.address).toLowerCase() : "").includes(lowercasedQuery) ||
        (order.deliveryAddress?.address ? String(order.deliveryAddress.address).toLowerCase() : "").includes(lowercasedQuery) ||
        (order.status ? order.status.toLowerCase() : "").includes(lowercasedQuery)
      );
    });
    
    setFilteredOrders(filteredData);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = searchQuery.length > 0 ? filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder) : orderData.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil((searchQuery.length > 0 ? filteredOrders.length : orderData.length) / ordersPerPage);

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

  const hadleDeleteOrder = (id , subOrderId , text,undo) => {
    console.log("subOrderId", subOrderId , "id", id , "text", text);
    
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
    

      <div className=" w-100">
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
                <th className="p-3">Invoice</th>
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
                    <tr className="country-row">
                      <td className="city-data">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3 text-primary">
                        {order?.showOrderNumber ?? "-"}
                      </td>
                      <td className="p-3">
                        {`${order?.deliveryMan}` ?? "-"}
                      </td>
                      <td className="p-3">{order?.createdDate ?? "-"}</td>
                      <td className="p-3">{order?.pickupDate ?? "-"}</td>
                      <td className="p-3 fw-bold">
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
                        <button
                          className={`${getColorClass(order.status)} mx-2`}
                        >
                          {order.status}
                        </button>
                      </td>
                      <td className="city-data">
                        <button
                          className="delete-btn me-1"
                          onClick={() => hadleDeleteOrder(order._id, null, "Order",true)}
                        >
                          <FaUndo
                            alt="undo"
                            className="mx-auto"
                          />
                        </button>
                      </td>
                      <td>
                        <button onClick={() => toggleSemTable(order._id)}>
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
                                  <th className="p-3">Parcel Type</th>

                                  <th className="p-3">Invoice</th>
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
                                      <td className="p-3">-</td>
                                      <td className="p-3">{parcelTypeDetail.find(type => type.parcelTypeId === subOrder?.parcelType)?.label ?? "-"}</td> 
                                      <td className="p-3">-</td>

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
                                        <button
                                          className="delete-btn me-1"
                                          onClick={() =>
                                            hadleDeleteOrder(order._id, subOrder.subOrderId, "SubOrder")
                                          }
                                        >
                                          <img
                                            src={deleteimg}
                                            alt="Delete"
                                            className="mx-auto"
                                          />
                                        </button>
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
                                          <img
                                            src={tracking}
                                            alt="Tracking"
                                            className="mx-auto"
                                          />
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
        <div className="pagination-container d-flex justify-content-end mt-3">
          <ul className="pagination">{renderPageNumbers()}</ul>
        </div>
      </div>

      {showModel && <ConformDeleteModelMulti
        text={text}
        Id={orderId}
        subOrderId={subOrderId}
        onDelete={() => handleCloseModal()}
        onHide={() => setShowModel(false)}

        undo={undo}
      />}
    </>
  );
};

export default TrashedMultiOrder;
