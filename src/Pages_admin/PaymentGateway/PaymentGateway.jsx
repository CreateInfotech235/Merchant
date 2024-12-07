import React, { useState } from "react";
import "./PaymentGateway.css";
import setup from "../../assets_admin/setup.png";
import edit from "../../assets_admin/edit.png";
import logo1 from "../../assets_admin/logo1.png";
import { Link } from "react-router-dom";
import DisableUser from "../../Components_admin/DisableUser/DisableUser";
  import DeleteUser from "../../Components_admin/DeleteUser/DeleteUser";

const PaymentGateway = () => {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const gatewaysPerPage = 5; // Number of gateways per page

  // Sample data array
  const gateways = [
    {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },
    {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },
    {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },
    {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },

    {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },
    {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },  {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },  {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },  {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },  {
      id: 1,
      method: "flutter wave",
      image: logo1,
      mode: "test"
    },
    // Add more objects as needed
  ];

  const indexOfLastGateway = currentPage * gatewaysPerPage;
  const indexOfFirstGateway = indexOfLastGateway - gatewaysPerPage;
  const currentGateways = gateways.slice(
    indexOfFirstGateway,
    indexOfLastGateway
  );

  const totalPages = Math.ceil(gateways.length / gatewaysPerPage);

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
      <div className=" d-flex justify-content-between py-3">
          <button className="delete">Delete</button>
          <Link to="/setup">
          <button type="button" className="btn  border-0 text-light " style={{background:"#D65246"}}>
              <img src={setup} alt="Add" class="pe-2" />
             Setup
            </button>
          </Link>
        </div>

        <div className="table-responsive">
      <table class="table-borderless w-100 text-center bg-white">
        <thead class="text-light" style={{background:"#253A71"}}>
            <tr>
            <th class="p-4 ">id</th>
            <th class="p-4 ">payment method</th>
            <th class="p-4 ">image</th>
            <th class="p-4 ">mode</th>
            <th class="p-4 ">status</th>
            <th class="p-4 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentGateways.map((gateway) => (
              <tr key={gateway.id}>
               <td class="p-3">{gateway.id}</td>
               <td class="p-3">{gateway.method}</td>
               <td class="p-3">
                  <img src={gateway.image} alt="Gateway Logo" />
                </td>
                <td class="p-3">{gateway.mode}</td>
                <td class="p-3">
                  <button
                    className="enable-btn"
                    onClick={() => setShowDeleteModel(true)}
                  >
                    Enable
                  </button>
                  {showDeleteModel && (
                    <DisableUser closeModel={closeDeleteModel} />
                  )}
                </td>
                <td className="user-table1">
                  <Link to="/edit-user">
                    <button className="edit-btn">
                      <img src={edit} alt="Edit" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container d-flex justify-content-end">
        <ul className="pagination ">{renderPageNumbers()}</ul>
      </div>
      </div>
  );
};

export default PaymentGateway;
