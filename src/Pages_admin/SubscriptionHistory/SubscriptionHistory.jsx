import React, { useState } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import CityPopup from "../../Components_admin/CityPopup/CityPopup";
import ViewUser from '../../Components_admin/ViewUser/ViewUser';

const SubscriptionHisory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 10;
  const [showModel, setShowModel] = useState(false);
  const closeModel = () => setShowModel(false);
const [activeTab, setActiveTab] = useState("profile");

  const data = [
    {
      no: "1",
      Plan: "Basic Plan  ",
      plantype: "6 Month",
    date : "14 jun 2021",
    enddate : "14 jun 2021 ",
    amount: "rs. 799",
      Status: "disable",
    },
    {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
      },
    
      {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
      },
      {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
      },
      {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
      },
      {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
      },
      {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
      },
      {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
      },
      {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
      },
      {
        no: "1",
        Plan: "Basic Plan  ",
        plantype: "6 Month",
      date : "14 jun 2021",
      enddate : "14 jun 2021 ",
      amount: "rs. 799",
        Status: "disable",
     
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
                  <th className="p-3">Plan</th>
                  <th className="p-3">plan type</th>
                  <th className="p-3">plan start date </th>
                  <th className="p-3">plan end date </th>
                  <th className="p-3">amount</th>{" "}
                  <th className="p-3">Status</th>
                
                </tr>
              </thead>
              <tbody>
                {currentCities.map((data, index) => (
                  <tr key={index}>
                    <td className="p-3">{data.no} </td>
                    <td className="p-3">{data.Plan} </td>
                    <td className="p-3">{data.plantype} </td>
                    <td className="p-3">{data.date} </td>
                    <td className="p-3">{data.enddate } </td>
                    <td className="p-3">{data.amount} </td>
                    <td className="p-3">{data.Status} </td>
                   
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

export default SubscriptionHisory ;
