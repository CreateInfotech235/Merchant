import React from "react";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";

const WalkThrough = () => {
  return (
    <div className="walk-through " style={{ overflowX: "hidden" }}>
      <div className="save-btn d-flex justify-content-end ">
        <button
          type="button"
          class="btn rounded-2 m-3 p-2 fw-bold"
          style={{
            width: "230px",
            background: "#d65246",
            color: "white",
          }}
        >
          Add walk through section
        </button>
      </div>
      <h4 className="walk-heading fw-bold mb-4">Walk through</h4>

      <div className="walk  bg-white  d-xxl-flex flex-xxl-row align-items-xxl-center justify-content-xxl-between   d-xl-flex flex-xl-row align-items-xl-center justify-content-xl-between   d-lg-flex flex-lg-row align-items-lg-center justify-content-lg-between  d-md-flex flex-md-row align-items-md-center justify-content-md-between  d-sm-flex flex-sm-column justify-content-sm-end d-flex flex-column justify-content-end">
        <div className="title-description">
          <table class=" table-borderless rounded-2 w-100 m-3">
            <tbody>
              <tr>
                <th scope="row">title :</th>
                <td class="text-black-50">mighty delivery</td>
              </tr>
              <tr>
                <th scope="row">description :</th>
                <td class="text-black-50">
                  log in and log out anytime you want. we are live 24*7
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button-img m-2 me-5">
          {" "}
          <button className="edit-btn m-2">
            <img src={edit} />
          </button>
          <button className="delete-btn m-2">
            <img src={deleteimg} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalkThrough;
