import React from "react";
import "./DisableUser.css";
import disable from "../../assets_admin/disable.png";

const DisableUser = ({ closeModel }) => {
  return (
    <>
      <div className="model-wrapper" onClick={closeModel}></div>

      <div className="modal-container">
        <img src={disable} className="disable-img img-fluid  m-3"/>
        <h2 className="disable-heading text-primary">Disable Merchant?</h2>

        <p className="disable-content text-secondary">Do you want to disable <br/>for this user?</p>

        <button className="model-btn text-white border-0 rounded-2 m-3" onClick={closeModel}>
          Yes
        </button>

        <button className="models-btn text-black bg-white  border-1 rounded-2 m-3" onClick={closeModel}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default DisableUser;
