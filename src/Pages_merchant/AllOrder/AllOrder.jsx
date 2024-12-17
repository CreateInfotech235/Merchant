import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllOrder.css";
import add from "../../assets_mercchant/add.png";
import tracking from "../../assets_mercchant/tracking.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";
import searchIcon from "../../assets_mercchant/search.png";
import { getOrders } from "../../Components_merchant/Api/Order";
import DeleteModal from "../../Components_merchant/DeleteUser/DeleteUser";
import edit from "../../assets_mercchant/edit.png";
import UpdateDeliveryBoyModal from "../DeliveryMan/UpdateDeliveryManModal";
import UpdateOrderModal from "./UpdateOrderModal";
import { format } from "date-fns";
import OrderInfoModal from "./OrderInfoModal";
import { getDeliveryManLocationByOrder } from "../../Components_merchant/Api/DeliveryMan";
import MapModal from "./MapModal";
import html2pdf from 'html2pdf.js';
import Loader from "../../Components_admin/Loader/Loader";

const AllOrder = () => {
  const [showModel, setShowModel] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [ordersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [themeMode, setThemeMode] = useState("light");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const MerchantId = await localStorage.getItem("merchnatId");
    const response = await getOrders(MerchantId, currentPage, ordersPerPage);
    if (response?.data) {
      setOrderData(response.data);
      setFilteredOrders(response.data);
    } else {
      setOrderData([]);
      setFilteredOrders([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showModel, showEditModal, currentPage, ordersPerPage]);

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedOrder(null);
  };

  const closeModel = () => setShowModel(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
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
        (order.customerName ? order.customerName.toLowerCase() : "").includes(
          lowercasedQuery
        ) ||
        (order.pickupAddress?.address
          ? String(order.pickupAddress.address).toLowerCase()
          : ""
        ).includes(lowercasedQuery) ||
        (order.deliveryAddress?.address
          ? String(order.deliveryAddress.address).toLowerCase()
          : ""
        ).includes(lowercasedQuery) ||
        (order.status ? order.status.toLowerCase() : "").includes(
          lowercasedQuery
        )
      );
    });

    setFilteredOrders(filteredData);
  };

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    return pageNumbers.map(number => (
      <li key={number} className={currentPage === number ? 'active' : ''}>
        <button 
          onClick={() => paginate(number)}
          className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      </li>
    ));
  };

  const hadleTrackOrder = async(id, deliveryLocation , pickupLocation , status) => {
    // console.log("deliveryLocation", deliveryLocation);
    // console.log("pickupLocation", pickupLocation);
    // console.log("status", status);
    try {
      if (status) {
        setStatus(status)
      }
      if (pickupLocation && pickupLocation.latitude && pickupLocation.longitude) {
        setPickupLocation({
          lat : pickupLocation.latitude,
          lng : pickupLocation.longitude
        })
      }
      if(deliveryLocation && deliveryLocation.latitude && deliveryLocation.longitude) {
        setDeliveryLocation({
          lat: deliveryLocation.latitude,
          lng: deliveryLocation.longitude
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
    // console.log("delivery", Order);

    setShowInfoModal(true);
    setSelectedOrder(Order);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedOrder(null);
  };

  const hadleDeleteOrder = (id) => {
    setShowModel(true);
    setOrderId(id);
    // console.log(id);
  };

  const handleCloseModal = () => {
    setShowModel(false);
    setOrderId(null);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
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

  const downloadInvoice = async (order) => {
    // console.log("order", order);
    try {
      navigate('/invoice-format', {
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
              postCode: order.pickupAddress?.postCode
            },
            deliveryDetails: {
              name: order.deliveryAddress?.name,
              address: order.deliveryAddress?.address,
              mobileNumber: order.deliveryAddress?.mobileNumber,
              email: order.deliveryAddress?.email,
              postCode: order.deliveryAddress?.postCode
            },
            charges: order.charges,
            totalCharge: order.totalCharge,
            cashCollection: order.cashCollection,
            distance: order.distance,
            duration: order.duration,
            status: order.status
          }
        }
      });
    } catch (error) {
      console.error('Error navigating to invoice:', error);
    }
  };

  return (
    <div className="h-screen">
      <div className="d-flex justify-content-between align-items-center pb-3 nav-bar">
        <div className="add-order-button">
          <button
            type="button"
            className="btn border-0"
            style={{ background: "#D65246" }}
          >
            <Link
              to="/create-order"
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
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0 flex justify-center items-center">
              <img src={searchIcon} className="search w-[35px]" alt="search icon" />
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
                <th className="p-3">Customer Name</th>
                <th className="p-3">Pickup Address  (PostCode)</th>
                <th className="p-3">Delivery Address (PostCode)</th>
                <th className="p-3">Delivery Man</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Pickup Date</th>
                <th className="p-3">Delivery Date</th>
                <th className="p-3">Invoice</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
                <th className="p-3">Order Tracking</th>
              </tr>
            </thead>
            <tbody>
              {(!currentOrders || currentOrders.length === 0) ? (
                <tr>
                  <td colSpan="13" className="p-3 text-center">
                  <div className="d-flex justify-content-center">
                        <div className="mx-auto">
                          <Loader />
                          No Data Found
                        </div>
                      </div>
                  </td>
                </tr>
              ) : (
                currentOrders.map((order, index) =>
                  order.trashed === false ? (
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
                        <button className={`${getColorClass(order.status)} mx-2`}>
                          {order.status}
                        </button>
                      </td>

                      <td className="city-data">
                        <button
                          className="edit-btn ms-1"
                          onClick={() => handleEditClick(order)}
                        >
                          <img src={edit} alt="Edit" className="mx-auto" />
                        </button>
                        <button
                          className="delete-btn me-1"
                          onClick={() => hadleDeleteOrder(order._id)}
                        >
                          <img src={deleteimg} alt="Delete" className="mx-auto"/>
                        </button>
                        <button
                            className="show-btn ms-1"
                            onClick={() => handleViewClick(order)}
                          >
                            <img src={show} alt="Show" className="mx-auto"/>
                          </button>
                      </td>
                      <td className="city-data">
                        <button 
                        className="delete-btn"
                        onClick={() => {
                          if (["ACCEPTED", "ASSIGNED", "CANCELLED", "DELIVERED", "CREATED"].includes(order.status)) {
                            alert("You are not able to track. Tracking starts from the status 'Arrived' to 'Delivered'.");
                          } else {
                            hadleTrackOrder(order.deliveryManId, order.deliveryAddress.location, order.pickupAddress.location, order.status);
                          }
                        }}
                    
                        >
                          <img src={tracking} alt="Tracking" className="mx-auto"/>
                        </button>
                      </td>
                    </tr>
                  ) : null
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination-container d-flex justify-content-end mt-3">
          <ul className="pagination">
           
            {renderPageNumbers()}
          
          </ul>
        </div>
      </div>
      {showEditModal && (
        <UpdateOrderModal Order={selectedOrder} onHide={closeEditModal} />
      )}

      {showModel && (
        <DeleteModal
          text="Order"
          Id={orderId}
          onDelete={() => handleCloseModal()}
          onHide={() => setShowModel(false)}
        />
      )}

      {showInfoModal && (
        <OrderInfoModal
          Order={selectedOrder}
          onHide={closeInfoModal}
        />
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

export default AllOrder;
