import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import './ViewUser.css'
import profile from '../../assets_admin/profile.svg';
import edit from '../../assets_admin/edit.png';
import deleteimg from '../../assets_admin/deleteimg.png';
import backbtn from '../../assets_admin/backbtn.png';

const ViewUser = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage the active tab

  return (
    <>
      <div className="btns d-flex justify-content-end align-items-center">
        <Link to="/users">
          <button className="model-btn border-0 rounded-2 text-white m-2">
            <img src={backbtn} className="back-img pe-2" alt="Back" />
            Back
          </button>
        </Link>
        <Link to="/edit-user">
          <button className="edit-btn m-2">
            <img src={edit} alt="Edit" />
          </button>
        </Link>
        <button className="delete-btn">
          <img src={deleteimg} alt="Delete" />
        </button>
      </div>

      <div className="users-view ">
        <ul className="view-users-list list-inline d-flex p-0 d-flex w-25 text-black" >
          <li >
            <Link to="/profile " className="link ">
              <Button
                className={`${activeTab === 0 ? "active" : ""}`}
                onClick={() => setActiveTab(0)}
              >
                Profile
              </Button>
            </Link>
          </li>

        
          <li class="d-flex justify-content-center flex-column align-items-center">
    
            <Button
              className={`${activeTab === 1 ? "active" : ""}`}
              onClick={() => setActiveTab(1)}
            >
              Wallet
              <span className={`arrow ${activeTab === 1 ? "rotate" : ""}`}></span>
            </Button>
   
            {activeTab === 1 && (
              <div class="d-flex justify-content-start">
                <ul class="list-inline d-flex p-3 justify-content-center align-items-center">
                  <li class="p-2">
                    <Link to="/transation-list">Transaction List</Link>
                  </li>
                  <li class="p-2">
                    <Link to="/subscription-history">Subscription History</Link>
                  </li>
               
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link to="/order" className="link">
              <Button
                className={`${activeTab === 2 ? "active" : ""}`}
                onClick={() => setActiveTab(2)}
              >
                Order
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ViewUser;
