import React, { useState } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import CityPopup from "../../Components_admin/CityPopup/CityPopup";
import ViewUser from '../../Components_admin/ViewUser/ViewUser';

const TransationList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 10;
  const [showModel, setShowModel] = useState(false);
  const closeModel = () => setShowModel(false);
const [activeTab, setActiveTab] = useState("profile");

  const data = [
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },
    {
      no: "1",
      MerchantName: "mark singh",
      TransID: "256515498",
      FromAccount: "",
      Reference: "Download ",
      Description: "p",
      Status: "Pending",
      Amount: "£1000.00"
    },

  ];

  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = data.slice(indexOfFirstCity, indexOfLastCity);

  const totalPages = Math.ceil(data.length / citiesPerPage);

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
      <ViewUser />
     
    


          <div className="table-responsive">
            <table className="table-borderless w-100 text-center bg-light fw-bold" style={{ fontSize: "15px" }}>
              <thead className="text-light" style={{ background: "#253A71" }}>
                <tr>
                  <th className="p-3">no. </th>
                  <th className="p-3">Merchant name</th>
                  <th className="p-3">Trans.ID</th>
                  <th className="p-3">From Account</th>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Description</th>{" "}
                  <th className="p-3">Status</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCities.map((city, index) => (
                  <tr key={index}>
                    <td className="p-3">{city.no} </td>
                    <td className="p-3">{city.MerchantName} </td>
                    <td className="p-3">{city.TransID} </td>
                    <td className="p-3">{city.FromAccount} </td>
                    <td className="p-3">{city.Reference} </td>
                    <td className="p-3">{city.Description} </td>
                    <td className="p-3">{city.Status} </td>
                    <td className="p-3">{city.Amount} </td>
                    <td className="table-head2">
                      <div className="d-flex align-items-center justify-content-lg-center">
                        <Link to="/update-city">
                          <button className="edit-btn m-2">
                            <img src={edit} alt="Edit" />
                          </button>
                        </Link>
                        <button className="delete-btn">
                          <img src={deleteimg} alt="Delete" />
                        </button>
                        <button
                          className="show-btn m-2"
                          onClick={() => setShowModel(true)}
                        >
                          <img src={show} alt="Show" />
                        </button>
                        {showModel && <CityPopup closeModel={closeModel} />}
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
   

    </>
  );
};

export default TransationList;
