import React from 'react';

import inputfile from '../../assets_admin/inputfile.png';

const DeliveryPatner = () => {
  return (
    <>
      <div className="d-flex justify-content-end"> <button type="button" class="btn rounded-2 mb-3 pb-2 fw-bold"
          style={{
            width: "150px",
            background: "#d65246",
            color: "white",
          
          }}
        >Save</button></div>
<div class="row col-12">
      <label >Title</label><br/>
      <input type="text" className="app-name border-0 rounded-2 ms-2 p-3 col-12"/><br/>
      <label>Description</label><br/>
      <input type="text" className="app-name border-0 rounded-2 ms-2 p-5" /><br/>
      </div>

      <div className="row d-xxl-flex flex-xxl-row justify-content-xxl-between w-xxl-75 w-xl-75 w-lg-100 w-md-100 w-sm-100 w-100">
        <div className="col-xxl-2 p-2 col-xl-2 col-lg-2  col-md-4 col-sm-4 col-6 m-2">
          <div>
          <label class="text-black-50">delivery man image</label>
          </div>
          <div className="bg-white p-2 rounded-3 img d-flex flex-column-reverse justify-content-center align-items-center" style={{ cursor:"pointer"}}>
            <div className="label">
              <label htmlFor="formFile" className="form-labels">
                select file
              </label>
            </div>
            <div className="image">
              <img src={inputfile} className="car12 p-4" />
              <input className="form-control" type="file" id="formFile" />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
            <div>
              <button
                type="button"
                class="btn rounded-2 m-3 p-2 fw-bold"
                style={{
                  width: "150px",
                  background: "#d65246",
                  color: "white",
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button
                type="button"
                class="btn rounded-2 m-3 p-2 fw-bold"
                style={{
                  width: "150px",
                  background: "#FFF",
                  color: "#000",
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

export default DeliveryPatner;
