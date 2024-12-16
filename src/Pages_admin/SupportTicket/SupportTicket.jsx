import React, { useEffect, useState } from "react";

import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import { Link } from "react-router-dom";
import ViewUser from "../../Components_admin/ViewUser/ViewUser";
import DisableUser from "../../Components_admin/DisableUser/DisableUser";
import DeleteUser from "../../Components_admin/DeleteUser/DeleteUser";
import { getSupportTicket } from "../../Components_admin/Api/SupportTicket";

const SupportTicket = () => {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showEnableModel, setShowEnableModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [supportTicket , setSupportTicket] = useState([])
  const usersPerPage = 10;

  const closeDeleteModel = () => setShowDeleteModel(false);
  const closeEnableModel = () => setShowEnableModel(false);

  useEffect(()=>{
    const fetchSupportTicket = async() => {
      const response = await getSupportTicket()
      console.log("Support" , response.data.data);
      
      if (response.status) {
        console.log("Done");
        setSupportTicket(response.data.data)
        
      }else{
        setSupportTicket([])
      }
    }
    fetchSupportTicket()
  },[])
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
                <th class="p-4 ">NO</th>
                <th class="p-4 ">Merchant Name</th>
                <th class="p-4 ">Merchnat Email</th>
                <th class="p-4 ">Subject</th>
                <th class="p-4 ">Problem</th>
                <th class="p-4 ">Status</th>
                <th class="p-4 ">Action</th>
                {/* <th class="p-4 ">Status</th>
                <th class="p-4 ">Verify</th>
                <th class="p-4 ">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {supportTicket.map((user , i) => (
                <tr key={i}>
                  <td class="p-3">
                    <input type="checkbox" />
                  </td>
                  <td class="p-3">{i + 1}</td>
                  <td class="p-3">{`${user?.userid?.firstName ?? '-'} ${user?.userid?.lastName ?? '-'}`}</td>
                  <td class="p-3">{user?.userid?.email ?? '-'}</td>
                  <td class="p-3">{user?.subject ?? '-'}</td>
                  <td class="p-3">{user?.problem ?? '-'}</td>
                  <td class="p-3">
                  <button className={`enable-btn ${user.problemSolved === true ? 'green' : 'red'}`}>
                        {user.problemSolved === true ? "SOLVED" : "UNSOLVED"}
                      </button>
                  </td>
                  {/* <td class="p-3">
                    <button
                      className="enable-btn"
                      onClick={() => setShowEnableModel(true)}
                    >
                      Enable
                    </button>
                    {showEnableModel && (
                      <DisableUser closeModel={closeEnableModel} />
                    )}
                  </td> */}
                  {/* <td class="p-3">
                    <input type="checkbox" />
                  </td> */}
                  <td class="p-3">
                    <div class="d-flex align-items-center  justify-content-lg-center">
                      <Link to="/edit-user">
                        <button className="edit-btn">
                          <img src={edit} alt="Edit" className="mx-auto" />
                        </button>
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() => setShowDeleteModel(true)}
                      >
                        <img src={deleteimg} alt="Delete" className="mx-auto" />
                      </button>
                      {showDeleteModel && (
                        <DeleteUser closeModel={closeDeleteModel} />
                      )}
                      <Link to="/view-user">
                        <button className="show-btn">
                          <img src={show} alt="Show" className="mx-auto" />
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

export default SupportTicket;
