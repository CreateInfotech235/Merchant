import React, { useState } from "react";

import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";
import { Link } from "react-router-dom";
import DisableUser from "../../../../dashboard/src/Components/DisableUser/DisableUser";

const RaiseIssue = () => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showEnableModel, setShowEnableModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
  
    const closeDeleteModel = () => setShowDeleteModel(false);
    const closeEnableModel = () => setShowEnableModel(false);
  
    // Mock data for users (Replace with actual data fetching logic)
    const users = [
      {
        id: 1,
        name: "mae strosin",
        contact: "+91 5632 2157",
        email: "hagejfhn@gmail.com",
        service: "pickup",
        city: "ahmedabad",
        registerDate: "14May2024 | 03:42 PM",
        ticketnumber:"45121564"
      },
      {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
        {
          id: 1,
          name: "mae strosin",
          contact: "+91 5632 2157",
          email: "hagejfhn@gmail.com",
          service: "pickup",
          city: "ahmedabad",
          registerDate: "14May2024 | 03:42 PM",
          ticketnumber:"45121564"
        },
    ];
  
    // Calculate the users to display based on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
    // Calculate total pages
    const totalPages = Math.ceil(users.length / usersPerPage);
  
    // Pagination controls
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
  
    // Add empty rows to fill up the table to 10 rows
    const emptyRows = usersPerPage - currentUsers.length;
  
    return (
      <>
        <div className=" w-100">
          
  
          <div className="table-responsive">
            <table class="table-borderless w-100 text-center bg-light">
              <thead class="text-light" style={{ background: "#253A71" }}>
                <tr>
                  <th class="p-4 "></th>
                  <th class="p-4 ">Name</th>
                  <th class="p-4 ">Contact number</th>
                  <th class="p-4 ">Email id</th>
                  <th class="p-4 ">Service</th>
                  <th class="p-4 ">City</th>
                  <th class="p-4 ">Register date</th>
                  <th class="p-4 ">Status</th>
                  <th class="p-4 ">Verify</th>
                  <th class="p-4 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td class="p-3">
                      <input type="checkbox" />
                    </td>
                    <td class="p-3">{user.name}</td>
                    <td class="p-3">{user.contact}</td>
                    <td class="p-3">{user.email}</td>
                    <td class="p-3">{user.service}</td>
                    <td class="p-3">{user.city}</td>
                    <td class="p-3">{user.registerDate}</td>
                    <td class="p-3">
                      <button
                        className="enable-btn"
                        onClick={() => setShowEnableModel(true)}
                      >
                        Enable
                      </button>
                      {showEnableModel && (
                        <DisableUser closeModel={closeEnableModel} />
                      )}
                    </td>
                    <td class="p-3">
                      <input type="checkbox" />
                    </td>
                    <td class="p-3">
                      <div class="d-flex align-items-center  justify-content-lg-center">
                        <Link to="/edit-user">
                          <button className="edit-btn">
                            <img src={edit} alt="Edit" />
                          </button>
                        </Link>
                        <button
                          className="delete-btn"
                          onClick={() => setShowDeleteModel(true)}
                        >
                          <img src={deleteimg} alt="Delete" />
                        </button>
                        {showDeleteModel && (
                          <DeleteUser closeModel={closeDeleteModel} />
                        )}
                        <Link to="/view-user">
                          <button className="show-btn">
                            <img src={show} alt="Show" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: emptyRows }).map((_, index) => (
                  <tr key={index + currentUsers.length}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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
  


export default RaiseIssue