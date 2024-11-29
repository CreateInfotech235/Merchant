import React, { useState, useEffect } from "react";
import show from "../../assets_mercchant/show.png";
import tickmark from "../../assets_mercchant/tickmark.png";
import crossmark from "../../assets_mercchant/crossmark.png";
import searchIcon from "../../assets_mercchant/search.png";
import WithdrawPopup from "../../Components_merchant/WithdrawPopup/WithdrawPopup";
import Pagination from "../../Components_merchant/Pagination/Pagination";
import { getRejectWithdraw } from "../../Components_merchant/Api/User"; // Assuming this is the API

const Reject = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestsPerPage] = useState(10); // Requests per page

  useEffect(() => {
    fetchRejectRequests();
  }, [currentPage, searchQuery]);

  const fetchRejectRequests = async () => {
    const response = await getRejectWithdraw(currentPage, requestsPerPage); // Fetching from API
    if (response.status) {
      setRequests(response.data[0].data);
      setTotalPages(Math.ceil(response.data[0].totalDataCount / requestsPerPage));
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const filteredRequests = requests.filter((req) =>
    req.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pb-3">
        <div className="navbar">
          <div className="navbar-options d-flex">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search requests"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0">
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table-borderless w-100 text-center bg-light" style={{ fontSize: "12px" }}>
          <thead className="text-light" style={{ background: "#253A71" }}>
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Available Balance</th>
              <th className="p-3">Created</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
              <th className="p-3">Bank Details</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-3">
                  No data found
                </td>
              </tr>
            ) : (
              currentRequests.map((request, index) => (
                <tr key={index}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{request.name}</td>
                  <td className="p-3">{request.amount}</td>
                  <td className="p-3">{request.availableBalance}</td>
                  <td className="p-3">{request.created}</td>
                  <td className="p-3 text-primary">{request.status}</td>
                  <td className="p-3">
                    <img src={tickmark} alt="Approve" className="ms-1" />
                    <img src={crossmark} alt="Reject" className="ms-1" />
                  </td>
                  <td className="p-3">
                    <button className="show-btn" onClick={() => setIsModalOpen(true)}>
                      <img src={show} alt="Show" />
                    </button>
                    {isModalOpen && <WithdrawPopup closeShowModel={() => setIsModalOpen(false)} />}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
    </>
  );
};

export default Reject;
