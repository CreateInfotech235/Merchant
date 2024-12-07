import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import tracking from "../../assets_admin/tracking.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import searchIcon from "../../assets_admin/search.png";
import { getAllOrder } from "../../Components_admin/Api/Order";
import Pagination from "../../Components_admin/Pagination/Pagination";
import OrderModal from "./OrderModal";
import DeleteModal from "../../Components_admin/DeleteModal";

const AllOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModel(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder({});
    setShowModel(false);
  };

  const onDelete = () => {
    setShowDelModal(false);
  };

  const onHideDeleteModal = () => setShowDelModal(false);

  const fetchOrders = async () => {
    const response = await getAllOrder(currentPage, ordersPerPage);
    console.log(response.data , "Data");
    
    if (response.status) {
      setOrders(response.data);
      setFilteredOrders(response.data);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterOrders(event.target.value);
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const filterOrders = (query) => {
    if (!query) {
        setFilteredOrders(orders);
        return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filteredData = orders.filter((order) => {
        // Ensure each property is a string before using toLowerCase
        const orderId = String(order.orderId || ""); // Fallback to empty string
        const customerName = String(order.customerName || "");
        const pickupAddress = String(order.pickupAddress || "");
        const deliveryAddress = String(order.deliveryAddress || "");
        const status = String(order.status || "");

        return (
            orderId.toLowerCase().includes(lowercasedQuery) ||
            customerName.toLowerCase().includes(lowercasedQuery) ||
            pickupAddress.toLowerCase().includes(lowercasedQuery) ||
            deliveryAddress.toLowerCase().includes(lowercasedQuery) ||
            status.toLowerCase().includes(lowercasedQuery)
        );
    });

    setFilteredOrders(filteredData);
};


  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredOrders(orders);
  };

  return (
    <>
      <div className="d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between d-lg-flex justify-content-lg-between d-md-flex justify-content-md-between d-sm-flex justify-content-sm-center d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-column align-items-center nav-bar pb-3">
        <div className={`navbar`}>
          <div className="navbar-options d-flex my-2 col-12">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search your order"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0">
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-100">
        <div className="d-flex justify-content-between py-3">
          <h4 className="fw-bold">All Orders</h4>
          <button
            type="button"
            className="btn border-0"
            style={{ background: "#D65246" }}
          >
            <Link
              to="/create-order"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img src={add} alt="Add" />
              Add Order
            </Link>
          </button>
        </div>

        <div className="table-responsive">
          <table
            className="table-borderless w-100 text-center bg-light"
            style={{ fontSize: "10px" }}
          >
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Pickup Address</th>
                <th className="p-3">Delivery Address</th>
                <th className="p-3">Delivery Man</th>
                <th className="p-3">Pickup Date</th>
                <th className="p-3">Delivery Date</th>
                <th className="p-3">Invoice</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Assign</th>
                <th className="p-3">Action</th>
                <th className="p-3">Order Tracking</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center p-3">
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <tr key={index} className="country-row">
                      <td className="city-data">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3 text-primary">{order.orderId}</td>
                      <td className="p-3">{order.pickupAddress.address}</td>
                      <td className="p-3">{order.deliveryAddress.address}</td>
                      <td className="p-3">{order.deliveryMan || "-"}</td>
                      <td className="p-3">{order.pickupDate || "-"}</td>
                      <td className="p-3">{order.deliveryDate || "-"}</td>
                      <td className="p-3 fw-bold">{order.invoice || '-'}</td>
                      <td className="p-3">{order.createdDate}</td>  
                      <td className="city-data">Assign</td>
                      <td className="city-data">
                        <button className="delete-btn me-1" onClick={() => setShowDelModal(true)}>
                          <img src={deleteimg} alt="Delete" />
                        </button>
                        <button className="show-btn" onClick={() => handleShowModal(order)}>
                          <img src={show} alt="Show" />
                        </button>
                      </td>
                      <td className="city-data">
                        <button className="delete-btn">
                          <img src={tracking} alt="Tracking" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
        {showModel && <OrderModal onHide={handleCloseModal} order={selectedOrder} />}
        {showDelModal && <DeleteModal onHide={onHideDeleteModal} onDelete={onDelete} text='order' />}

        <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
      </div>
    </>
  );
};

export default AllOrder;