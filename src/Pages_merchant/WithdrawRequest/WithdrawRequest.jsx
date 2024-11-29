import React, { useState } from "react";
import show from "../../assets_mercchant/show.png";
import { Link } from "react-router-dom";
import tickmark from '../../assets_mercchant/tickmark.png'
import crossmark from '../../assets_mercchant/crossmark.png'
import WithdrawPopup from "../../Components_merchant/WithdrawPopup/WithdrawPopup";


const WithdrawRequest = () => {
  const [showModel, setShowModel] = useState(false); // Add showModel state
  const closeShowModel = () => setShowModel(false); // Close model function

  // Sample data array
  const requests = [
    {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    }, {
      id: 1,
      name: "mark",
      amount: "999.00 kSh",
      availableBalance: "3348.36 kSh",
      created: "26 ape 2024 | 11:31 AM",
      status: "requested"
    },
    // Add more objects as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10; // Number of requests per page

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(requests.length / requestsPerPage);

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
       <div className="table-responsive">
      <table class="table-borderless w-100 text-center bg-light">
        <thead class="text-light" style={{background:"#253A71"}}>
            <tr>
               <th class="p-4 ">no</th>
               <th class="p-4 ">Name</th>
               <th class="p-4 ">amount</th>
               <th class="p-4 ">available balance</th>
               <th class="p-4 ">created</th>
               <th class="p-4 ">status</th>
               <th class="p-4 ">action</th>
               <th class="p-4 ">bank details</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request) => (
              <tr key={request.id}>
                <td class="p-3">{request.id}</td>
                <td class="p-3">{request.name}</td>
                <td class="p-3">{request.amount}</td>
                <td class="p-3">{request.availableBalance}</td>
                <td class="p-3">{request.created}</td>
                <td class="p-3">{request.status}</td>
                <td class="p-3">
                  <img src={tickmark} alt="Tick" />
                  <img src={crossmark} alt="Cross" />
                </td>
                <td class="p-3">
                  <button
                    className="show-btn"
                    onClick={() => setShowModel(true)}
                  >
                    <img src={show} alt="Show" />
                  </button>{" "}
                  {showModel && <WithdrawPopup closeShowModel={closeShowModel} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container d-flex justify-content-end">
        <ul className="pagination">{renderPageNumbers()}</ul>
      </div> 
    </>
  );
};

export default WithdrawRequest;
