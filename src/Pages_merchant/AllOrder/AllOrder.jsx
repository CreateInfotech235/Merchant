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

const AllOrder = () => {
  const [showModel, setShowModel] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const ordersPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [themeMode, setThemeMode] = useState("light"); // Define themeMode state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false); // State for showing the view modal
  const [showMapModal, setShowMapModal] = useState(false);
  const [location, setLocation] = useState(null); // Changed initial value to null
  const [deliveryLocation, setDeliveryLocation] = useState(null); // Changed initial value to null
  const [pickupLocation, setPickupLocation] = useState(null); // Changed initial value to null
  const [status, setStatus] = useState(null); // Changed initial value to null
  const navigate = useNavigate();

  const fetchData = async () => {
    const MerchantId = await localStorage.getItem("merchnatId");
    const response = await getOrders(MerchantId, currentPage, ordersPerPage);
    await setOrderData(response.data);
    await setFilteredOrders(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, [showModel, showEditModal]);

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedOrder(null);
  };

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
        String(order.orderId).toLowerCase().includes(lowercasedQuery) || // Ensure orderId is a string
        (order.customerName ? order.customerName.toLowerCase() : "").includes(
          lowercasedQuery
        ) ||
        (order.pickupAddress.address
          ? String(order.pickupAddress.address).toLowerCase()
          : ""
        ).includes(lowercasedQuery) || // Convert pickupAddress to string
        (order.deliveryAddress.address
          ? String(order.deliveryAddress.address).toLowerCase()
          : ""
        ).includes(lowercasedQuery) || // Convert deliveryAddress to string
        (order.status ? order.status.toLowerCase() : "").includes(
          lowercasedQuery
        )
      );
    });

    console.log(filteredData, "Filter");

    setFilteredOrders(filteredData);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    searchQuery.length > 0
      ? filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
      : orderData.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(
    (searchQuery.length > 0 ? filteredOrders.length : orderData.length) /
      ordersPerPage
  );

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

  const hadleTrackOrder = async(id, deliveryLocation , pickupLocation , status) => {
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
    console.log("delivery", Order);

    setShowInfoModal(true); // Show the info modal
    setSelectedOrder(Order);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedOrder(null); // Clear the selected delivery man after closing
  };

  const hadleDeleteOrder = (id) => {
    setShowModel(true);
    setOrderId(id);
    console.log(id);
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
    
    try {
      // Navigate to invoice format page with order data
      navigate('/invoice-format', { 
        state: {
          orderData: {
            header: 'Your Company Name\nAddress Line 1\nAddress Line 2\nPhone: XXX-XXX-XXXX\nEmail: example@email.com',
            footer: 'Thank you for your business!\nFor support, please contact us.',
            logo: null,
            logoPreview: 'https://placehold.co/200x100/png',
            orderDetails: {
              orderId: order.orderId,
              date: order.dateTime,
              customerName: order.customerName,
              customerAddress: order.deliveryAddress.address,
              customerPhone: order.deliveryAddress.mobileNumber || '',
              customerEmail: order.deliveryAddress.email || '',
              items: [
                {
                  description: 'Delivery Service',
                  quantity: order.parcelsCount,
                  unitPrice: order.price || 0,
                  total: order.price || 0
                }
              ],
              subtotal: order.price || 0,
              tax: (order.price * 0.2) || 0,
              shippingCost: 0,
              total: (order.price * 1.2) || 0
            }
          }
        }
      });
    } catch (error) {
      console.error('Error navigating to invoice:', error);
    }
  };

  return (
    <>
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
              {filteredOrders.map((order, index) =>
                order.trashed === false ? (
                  <tr key={index} className="country-row">
                    <td className="city-data">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3 text-primary">
                      {order?.orderId ?? "-"}
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
                          className="btn btn-sm btn-primary"
                          onClick={() => downloadInvoice(order)}
                        >
                          Download Invoice
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
                      onClick={() => hadleTrackOrder(order.deliveryManId, order.deliveryAddress.location ,order.pickupAddress.location , order.status , )}
                      >
                        <img src={tracking} alt="Tracking" className="mx-auto"/>
                      </button>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination-container d-flex justify-content-end mt-3">
          <ul className="pagination">{renderPageNumbers()}</ul>
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
    </>
  );
};

export default AllOrder;
