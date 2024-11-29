import React, { useState } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";



const RegularPickupRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Changed from citiesPerPage to itemsPerPage
  const [showModel, setShowModel] = useState(false);

  const closeModel = () => setShowModel(false);

  // Sample data for deliverymen
  const deliverymen = [
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
    {
      id: 1,
      Merchant: "John Doe",
      email: "hagejfhn@gmail.com",
      add: "Mirpur-2,Dhaka, vesu, surat , gujrat",
      Estimetad:10,
      note: "asdfasdf",
    },
   
    // Add more deliverymen data as needed
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deliverymen.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(deliverymen.length / itemsPerPage);

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
    <>
      <div className="w-100">
   
<div >
        <div className="table-responsive">
        <table
          class="table-borderless w-100 text-center bg-light"
 
        >
          <thead class="text-light" style={{ background: "#253A71" }}>
            <tr>
            <th class="p-3"></th>
            <th class="p-3">id </th>
            <th class="p-3">Merchant</th>
            <th class="p-3">email id</th>
            <th class="p-3">address</th>
            <th class="p-3">Estimetad parcel</th>
            <th class="p-3">note</th>
           
            </tr>
          </thead>
          <tbody>
            {currentItems.map((deliveryman) => (
              <tr key={deliveryman.id}>
                <td className="user-table1">
                  <input type="checkbox" />
                </td>
                <td class="p-3">{deliveryman.id}</td>
                <td class="p-3">{deliveryman.Merchant}</td>
                <td class="p-3">{deliveryman.email}</td>
                <td class="p-3">{deliveryman.add}</td>
                <td class="p-3">{deliveryman. Estimetad}</td>
                <td class="p-3">{deliveryman.note}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container d-flex justify-content-end mt-3">
        <ul className="pagination">{renderPageNumbers()}</ul>
      </div>
      </div>
      </div>
    </>
  );
};




export default RegularPickupRequest