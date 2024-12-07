import React from "react";
import Notification from "../Notification/Notification";
import input from "../../assets_admin/input.png";

const Sendtomerchant = () => {
  return (
    <>
      <Notification />
      <div class="fluid-conatiner ">
      <div class="row">
        <div className="mb-3 col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
          <label htmlFor="title1" className="form-label">
            Title 1
          </label>
         
          <input
          type="text"
          id="username"
          class="form-control w-25% h-100%"
          placeholder="Username"
          style={{ height: "4.5em" }}
          />
        </div>
        <div className="mb-3 col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
        <label htmlFor="title2" className="form-label">
        preview
          </label>
        <select class="form-select"    style={{ height: "4.5em" }} aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
        </div>

        <div className="mb-3 col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
          <label htmlFor="title2" className="form-label">
          Role
          </label>
          <input
            type="text"
            className="form-control"
            id="title2"
            name="title2"
            style={{ height: "4.5em" }}
          />
        </div>
        <div className="mb-3 col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
          <label htmlFor="title3" className="form-label">
          type
          </label>
          <input
            type="text"
            className="form-control"
            id="title3"
            name="title3"
            style={{ height: "4.5em" }}
          />
        </div>
        <div className="mb-3 col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
        <label htmlFor="title2" className="form-label">
        user
          </label>
        <select class="form-select" aria-label="Default select example"    style={{ height: "4.5em" }}>
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
        </div>

       
        <div className="fluid-container">
          <div className="row d-xxl-flex flex-xxl-row justify-content-xxl-start w-xxl-75 w-xl-75 w-lg-100 w-md-100 w-sm-100 w-100 align-items-center">
            <div className="col-xxl-2 p-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-10 m-2">
              <div>
                <label className="text-black-50">upload icon / image</label>
              </div>
              <div className="bg-white p-2 rounded-3 img d-flex flex-column-reverse justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                <div className="label">
                  <label htmlFor="deliveryManFile" className="form-labels">
                    Select File
                  </label>
                </div>
                <div className="image">
                  <img src={input} alt="input" className="car12 p-4" />
                  <input className="form-control" type="file" id="deliveryManFile" name="deliveryManFile" />
                </div>
              </div>
            </div>

            <div className="col-xxl-2 p-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-10 m-2">
            <div>
                <label className="text-black-50">upload audio</label>
              </div>
              <div className="bg-white p-2 rounded-3 img d-flex flex-column-reverse justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                <div className="label">
                  <label htmlFor="deliveryManFile" className="form-labels">
                    Select File
                  </label>
                </div>
                <div className="image">
                  <img src={input} alt="input" className="car12 p-4" />
                  <input className="form-control" type="file" id="deliveryManFile" name="deliveryManFile" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
        <button
   
          style={{
            outline: "none",
            border: "none",
            padding: "10px",
            margin: "20px",
            width: "150px",
            borderRadius: "5px",
            background: "#d65246",
            color: "white",
            margin: "30px 0px 0px 10px",
          }}
        >
          Save
        </button>
     
          <button
            style={{
              outline: "none",
              border: "none",
              padding: "10px",
              margin: "20px",
              width: "150px",
              borderRadius: "5px",
              background: "#FFF",
              color: "#000",
              margin: "30px 0px 0px 10px",
            }}
          >
            Cancel
          </button>
      
      </div>
      </div>
      </div>
    </>
  );
};

export default Sendtomerchant;
