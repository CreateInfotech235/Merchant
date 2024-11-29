import React, { useState } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";
import locationimg from "../../assets_mercchant/locationimg.png";

import searchIcon from '../../assets_mercchant/search.png'
import DisableUser from "../../../../dashboard/src/Components/DisableUser/DisableUser";


const DepositeMerchant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [showModel, setShowModel] = useState(false);

  const closeModel = () => setShowModel(false);

  // Sample data for deliverymen
  const deliverymen = [
    {
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },{
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },
    {
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },
    {
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },
    {
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },
    {
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },
    {
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },
    {
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },
    {
      id: 1,
      name: "John Doe",
      contactNumber: "+91 5632 2157",
      email: "johndoe@gmail.com",
      country: "India",
      city: "Ahmedabad",
      registerDate: "14May2024 | 03:42 PM",
      status: "Enable",
    },
    // Add more deliverymen data as needed
  ];

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  // Function to filter deliverymen based on search term
  const filteredDeliverymen = deliverymen.filter((deliveryman) =>
    deliveryman.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeliverymen.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeliverymen.length / itemsPerPage);

  // Function to handle page click
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Function to render pagination numbers
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
        <div className="d-flex justify-content-between py-3">
          <button className="delete">Delete</button>
          <Link to="/add-deliveryman">
            <button type="button" className="btn text-light" style={{ background: "#D65246" }}>
              <img src={add} alt="Add" />
              Add Delivery Man
            </button>
          </Link>
        </div>
        <div className="search-container mb-3">
        <input
                type="search"
                className="search-btn rounded-start-4 p-3"
                placeholder="Search document"
                value={searchTerm}
                onChange={handleSearchChange}
              />
               <button className="search-img rounded-end-4 border-0">
                <img src={searchIcon} className="search" alt="search icon" />
              </button>
          
        </div>
        <div className="table-responsive">
          <table className="table-borderless w-100 text-center bg-light" style={{ fontSize: "10px" }}>
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact number</th>
                <th className="p-3">Email id</th>
                <th className="p-3">Country</th>
                <th className="p-3">City</th>
                <th className="p-3">Register date</th>
                <th className="p-3">Status</th>
             
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((deliveryman) => (
                <tr key={deliveryman.id}>
                  <td className="user-table1">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{deliveryman.name}</td>
                  <td className="p-3">{deliveryman.contactNumber}</td>
                  <td className="p-3">{deliveryman.email}</td>
                  <td className="p-3">{deliveryman.country}</td>
                  <td className="p-3">{deliveryman.city}</td>
                  <td className="p-3">{deliveryman.registerDate}</td>
                  <td className="p-3">
                    <button className="enable-btn" onClick={() => setShowModel(true)}>
                      {deliveryman.status}
                    </button>
                    {showModel && <DisableUser closeModel={closeModel} />}
                  </td>
                  
                  <td className="user-table1">
                    <div className="d-flex justify-content-center align-items-center">
                      <button className="edit-btn">
                        <img src={locationimg} alt="Edit" />
                      </button>
                      <Link to={`/edit-deliveryman/${deliveryman.id}`}>
                        <button className="edit-btn">
                          <img src={edit} alt="Edit" />
                        </button>
                      </Link>
                      <button className="delete-btn" onClick={() => setShowModel(true)}>
                        <img src={deleteimg} alt="Delete" />
                      </button>
                      {showModel && <DeleteUser closeModel={closeModel} />}
                      <Link to={`/view-deliveryman/${deliveryman.id}`}>
                        <button className="show-btn">
                          <img src={show} alt="Show" />
                        </button>
                      </Link>
                    </div>
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
    </>
  );
};



export default DepositeMerchant