import React from "react";
import { Link } from "react-router-dom";
import input from "../../assets_admin/input.png";


const Notification = () => {
  return (
    <>
      <div>
        <ul className="list-inline d-flex flex-wrap w-100">
        <Link to="/send-to-all ">
            <li className="p-3  text-black">Send to All</li>
            </Link>
          <Link to="/send-to-user">
            <li className="p-3  text-black">Send to User</li>
          </Link>
          <Link to="/send-to-merchant">
            <li className="p-3 text-black">Send to Merchant</li>
          </Link>
          <Link to="/send-to-delivery-man">
            <li className="p-3 text-black">Send to Delivery Man</li>
          </Link>
          <Link to="/send-any-selected-user">
            <li className="p-3  text-black">
              Send to Selected User / Merchant / Delivery Man
            </li>
          </Link>
        </ul>
      </div>
     
    </>
  );
};

export default Notification;
