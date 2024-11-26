
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './TrashedOrder.css'
import add from "../../assets/add.png";
import tracking from "../../assets/tracking.png";
import deleteimg from "../../assets/deleteimg.png";
import show from "../../assets/show.png";
import searchIcon from "../../assets/search.png";
import { getOrders } from "../../Components/Api/Order";
import DeleteModal from "../../Components/DeleteUser/DeleteUser";
import ConformDeleteModel from "../ConformDeleteModel/ConformDeleteModel";


const TrashedOrder = () => {
  const [showModel, setShowModel] = useState(false);
  const [orderId , setOrderId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [themeMode, setThemeMode] = useState("light"); // Define themeMode state
  const [orderData , setOrderData] = useState([])


  const fetchData = async() => {
    
    const MerchantId = await localStorage.getItem('merchnatId')
    const response = await getOrders(MerchantId , 1 , 10)
    const trashedData = await response.data.filter(data => data.trashed === true)
   
    await setOrderData(trashedData)
    await setFilteredOrders(trashedData)
    
    
  }
  useEffect(()=>{
    fetchData()
  },[showModel])
  // Sample data for orders


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
        (order.customerName ? order.customerName.toLowerCase() : "").includes(lowercasedQuery) ||
        (order.pickupAddress.address ? String(order.pickupAddress.address).toLowerCase() : "").includes(lowercasedQuery) || // Convert pickupAddress to string
        (order.deliveryAddress.address ? String(order.deliveryAddress.address).toLowerCase() : "").includes(lowercasedQuery) || // Convert deliveryAddress to string
        (order.status ? order.status.toLowerCase() : "").includes(lowercasedQuery)
      );
    });
    
    
    console.log(filteredData , "Filter");
    

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

  const hadleDeleteOrder = (id) => {
    setShowModel(true)
    setOrderId(id)
    console.log(id);
    
  };

  const handleCloseModal = () => {
    setShowModel(false)
    setOrderId(null)
  }
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
          <div className="navbar-options d-flex my-2 col-12">
            <input
              type="search"
              className="search-btn border-1 border-slate-500 rounded-start-4 p-3"
              placeholder="Search Order"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0">
              <img src={searchIcon} className="search w-48" alt="search icon" />
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
                <th className="p-3">Pickup Address</th>
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
              {filteredOrders.map((order, index) => (
                <tr key={index} className="country-row">
                  <td className="city-data">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3 text-primary">{order?.orderId ?? '-'}</td>
                    <td className="p-3 text-dark fw-bold">
                      {order?.customerName ??'-'}
                    </td>
                    <td className="p-3">{order?.pickupAddress?.address ??'-'}</td>
                    <td className="p-3">{`${order?.deliveryAddress?.address}(${order?.deliveryAddress?.postCode ?? '-'})` ?? '-'}</td>
                    <td className="p-3">{order?.deliveryMan??'-'}</td>
                    <td className="p-3">{order?.createdDate??'-'}</td>
                    <td className="p-3">{order?.pickupDate ?? '-'}</td>
                    <td className="p-3">{order?.deliveryDate ?? '-'}</td>
                    <td className="p-3 fw-bold">{order?.invoice ?? '-'}</td>
                    <td className="p-3">
                      <button className={getColorClass(order.status)}>
                        {order.status}
                      </button>
                    </td>

              
                  <td className="city-data">
                    <button className="delete-btn me-1" onClick={() => hadleDeleteOrder(order._id)}>
                      <img src={deleteimg} alt="Delete" />
                    </button>
                    <button className="show-btn">
                      <img src={show} alt="Show" />
                    </button>
                  </td>
                  <td className="city-data">
                    <button className="delete-btn">
                      <img src={tracking} alt="Tracking" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container d-flex justify-content-end mt-3">
          <ul className="pagination">{renderPageNumbers()}</ul>
        </div>
      </div>

      {showModel && <ConformDeleteModel
      text="Order"
      Id = {orderId}
        onDelete={() => handleCloseModal()}
        onHide={() => setShowModel(false)}
      />}
    </>
  );
};

export default TrashedOrder;
