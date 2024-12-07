import React, { useState } from "react";
import adhar from '../../assets_admin/adhar.png'
import searchIcon from '../../assets_admin/search.png'

const PendingMerchantDocument = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const data = [
    {
      id: 1,
      name: "Jose",
      documentName: "Aadhar card",
      document: adhar,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "Jose",
      documentName: "Aadhar card",
      document: adhar,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "Jose",
      documentName: "Aadhar card",
      document: adhar,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "Jose",
      documentName: "Aadhar card",
      document: adhar,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "Jose",
      documentName: "Aadhar card",
      document: adhar,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    {
      id: 1,
      name: "Jose",
      documentName: "Aadhar card",
      document: adhar,
      created: "14 May 2024 | 03:42 PM",
      action: "",
    },
    // Add more document data as needed
  ];

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when search term changes
  };

  // Filter documents based on search term across multiple fields
  const filteredData = data.filter((document) =>
    Object.values(document).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
        <div className="fluid-container">
          <div className="navbar">
            <div className="navbar-options d-flex my-2 col-12">
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
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-borderless w-100 text-center bg-light" style={{ fontSize: "12px" }}>
              <thead className="text-light" style={{ background: "#253A71" }}>
                <tr>
                  <th className="p-3 text-light"  style={{ background: "#253A71" }}></th>
                  <th className="p-3 text-light"  style={{ background: "#253A71" }}>Name</th>
                  <th className="p-3 text-light"  style={{ background: "#253A71" }}>Document Name</th>
                  <th className="p-3 text-light"  style={{ background: "#253A71" }}>Document</th>
                  <th className="p-3 text-light"  style={{ background: "#253A71" }}>Created</th>
                  <th className="p-3 text-light"  style={{ background: "#253A71" }}>Action</th>
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
                    <td className="p-3">
                      <img src={document.document} alt={document.documentName} style={{ width: '50px', height: '50px' }} />
                    </td>
                    <td className="p-3">{document.created}</td>
                    <td className="p-3 text-center d-flex align-items-center justify-content-center">
                      <select className="form-select fw-bold" style={{ fontSize: "12px", width: "130px" }}>
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
            <ul className="pagination">
              {renderPageNumbers()}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingMerchantDocument;
