import React, { useState } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import adhar from "../../assets_admin/adhar.png";
  import searchIcon from '../../assets_admin/search.png'


const MerchantDocument = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Dummy data for merchant documents
  const data = [
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "jose",
      documentName: "Aadhar card",
      document: <img src={adhar} alt="Aadhar Card" />,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    
    // Add more document data as needed
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtered data based on search term
  const filteredData = data.filter((document) =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page click
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Render pagination numbers
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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page to 1 when search term changes
  };

  return (
    <>
      <div className="w-100">
       

      

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
          <table
            className="table-borderless w-100 text-center bg-light"
            style={{ fontSize: "10px" }}
          >
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Name</th>
                <th className="p-3">Document Name</th>
                <th className="p-3">Document</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((document) => (
                <tr key={document.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{document.name}</td>
                  <td className="p-3">{document.documentName}</td>
                  <td className="p-3">{document.document}</td>
                  <td className="p-3">{document.created}</td>
                  <td className="p-3 text-center d-flex align-items-center justify-content-center">
                    <select
                      className="form-select fw-bold"
                      style={{ fontSize: "12px", width: "130px" }}
                    >
                      <option selected>approved</option>
                      <option value="1">rejected</option>
                      <option value="2">approved</option>
                      <option value="3">pending</option>
                    </select>
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

export default MerchantDocument;
