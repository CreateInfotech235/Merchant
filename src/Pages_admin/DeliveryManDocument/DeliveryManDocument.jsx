import React, { useState } from "react";
import card from "../../assets_admin/card.png";

const DeliveryManDocument = () => {
  // Sample data as an array of objects
  const data = [
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },

    {
      id: 1,
      deliveryBoyName: "Jose",
      documentName: "Aadhar Card",
      created: "14 May 2024 | 03:42 PM"
    },
    // Add more data objects as needed
  ];

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Change page
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Render page numbers
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
    <div className="table-responsive">
      <table className="table table-borderless">
        {/* Table Header */}
        <thead style={{ background: "#253A71" }}>
          <tr className="text-center">
            <th className="text-white"  style={{ background: "#253A71" }}></th>
            <th className="text-white"  style={{ background: "#253A71" }}>Delivery Boy Name</th>
            <th className="text-white"  style={{ background: "#253A71" }}>Document Name</th>
            <th className="text-white"  style={{ background: "#253A71" }}>Document</th>
            <th className="text-white"  style={{ background: "#253A71" }}>Created</th>
            <th className="text-white"  style={{ background: "#253A71" }}>Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="text-center">
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="color-black-50">
                <input type="checkbox" />
              </td>
              <td className="text-secondary">{item.deliveryBoyName}</td>
              <td className="text-secondary">{item.documentName}</td>
              <td className="text-secondary">
                <img src={card} alt="Document" className="img-fluid" />
              </td>
              <td className="text-secondary">{item.created}</td>
              <td className="text-secondary">
                <select className="form-select">
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination-container d-flex justify-content-end mt-3">
        <ul className="pagination">{renderPageNumbers()}</ul>
      </div>
    </div>
  );
};

export default DeliveryManDocument;
