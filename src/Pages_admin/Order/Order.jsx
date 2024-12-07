import React, { useState } from "react";
import { Link } from "react-router-dom";

import add from "../../assets_admin/add.png";
import tracking from "../../assets_admin/tracking.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";


const Order = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [showModel, setShowModel] = useState(false);

  const closeModel = () => setShowModel(false);

  // Sample data for orders
  const orders = [
    {
      id: 1,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 2,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 3,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 4,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 5,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 6,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 7,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 8,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 9,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 10,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 11,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
    {
      id: 12,
      orderId: "#4041",
      customerName: "Mark",
      pickupAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryAddress: "The Spirit Office No 221, 140 Feet Ring Road, Near",
      deliveryMan: "-",
      pickupDate: "23May2024 | 04:48 PM",
      deliveryDate: "23May2024 | 04:48 PM",
      invoice: "N/A",
      createdDate: "23May2024 | 04:48 PM",
      status: "Enable",
    },
  ];

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

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

  return (
    <div className=" w-100">
   

    <div className="table-responsive">
        <table
          class="table-borderless w-100 text-center bg-light"
          style={{ fontSize: "10px" }}
        >
          <thead class="text-light" style={{ background: "#253A71" }}>
          <tr>
          <th class="p-3"></th>
          <th class="p-3">Order ID</th>
             <th class="p-3">Customer Name</th>
             <th class="p-3">Pickup Address</th>
             <th class="p-3">Delivery Address</th>
             <th class="p-3">Delivery Man</th>
             <th class="p-3">Pickup Date</th>
             <th class="p-3">Delivery Date</th>
             <th class="p-3">Invoice</th>
             <th class="p-3">Created Date</th>
             <th class="p-3">Status</th>
             <th class="p-3">Assign</th>
             <th class="p-3">Action</th>
             <th class="p-3">Order Tracking</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={index} className="country-row">
              <td className="city-data">
                <input type="checkbox" />
              </td>
              <td class="p-3 text-primary">{order.orderId}</td>
              <td class="p-3 text-dark fw-bold">{order.customerName}</td>
               <td class="p-3">{order.pickupAddress}</td>
               <td class="p-3">{order.deliveryAddress}</td>
               <td class="p-3">{order.deliveryMan}</td>
               <td class="p-3">{order.pickupDate}</td>
               <td class="p-3">{order.deliveryDate}</td>
               <td class="p-3 fw-bold">{order.invoice}</td>
               <td class="p-3">{order.createdDate}</td>
               <td class="p-3">
                <button className="enable-btn">{order.status}</button>
              </td>
              <td className="city-data">Assign</td>
              <td className="city-data">
                <button className="delete-btn me-1">
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
  );
};

export default Order;
