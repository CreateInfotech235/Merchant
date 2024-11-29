import React from 'react'
import setup1 from '../../assets_mercchant/setup1.png'
import './Setup.css'

const Setup = () => {
  return (
   <div className="setup">
    <div className="setup-btn">
        <div className="setup-back d-flex justify-content-end">
            <button type="button" class="btn setup-back-btn text-light rounded-2 mb-3">Back</button>
        </div>
        <div className="setup-other-btn text-capitalize mb-5">
             <button type="button" class="btn setup-btns  setup-btns text-capitalize rounded-2 m-2 fw-bold">stripe</button>
             <button type="button" class="btn setup-btns  setup-btns text-capitalize rounded-2 m-2 fw-bold">razor pay</button>
             <button type="button" class="btn setup-btns  setup-btns text-capitalize rounded-2 m-2 fw-bold">paystack</button>
             <button type="button" class="btn setup-btns  setup-btns text-capitalize rounded-2 m-2 fw-bold">flutter wave</button>
          <button type="button" class="btn setup-btns  setup-btns text-capitalize rounded-2 m-2 fw-bold">paypal</button>
              <button type="button" class="btn setup-btns  setup-btns text-capitalize rounded-2 m-2 fw-bold">paytabs</button>
             <button type="button" class="btn setup-btns  setup-btns text-capitalize rounded-2 m-2 fw-bold">paytm</button>
            <button type="button" class="btn setup-btns  setup-btns text-capitalize rounded-2 m-2 fw-bold">my fatoorah</button>
        </div>
        </div>

<div className="heading-setup text-capitalize d-flex justify-content-between align-items-center">
        <div className="setup-heading">
            <h4 class="fw-bold mb-5">enable strip payment</h4>
            
        </div>
        <div className="setup-radio-button">
        <div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/><label class="form-check-label" for="flexSwitchCheckDefault"></label></div>
        </div>
        </div>
        <div className="setup-inputs ">
            <label class="p-0 text-capitalize text-black-50 mb-3">gateway name</label><br/>
            <input type="input" className="setup-input  w-100 mb-3 rounded-2"/>
<br/>
<label class="p-0 text-capitalize text-black-50 mb-3">stripe option</label><br/>
            <input type="checkbox" className="setup-checkbox me-2"/><label className="setup-label p-0 text-capitalize text-black-50 me-5">test credential</label>
            <input type="checkbox"  className="setup-checkbox me-2 "/><label className="setup-label p-0 text-capitalize text-black-50 mb-3">test credential</label><br/>
            <label class="p-0 text-capitalize text-black-50 mb-3 ">secrete key</label><br/>
            <input type="input" className="setup-input w-100 mb-3 rounded-2"/>
<br/>
<label className="p-0 text-capitalize text-black-50 rounded-2 mb-3">public key</label><br/>
            <input type="input" className="setup-input  w-100 mb-3 rounded-2"/>
<br/>


<label  For="formFile" className="form-labels text-black-50 p-0 mb-3">
     Vehicle image
        </label>
        <div className="row">
<div className="img d-flex flex-column-reverse  bg-white p-2 justify-content-center align-items-center rounded-3 col-xxl-2  col-xl-2 col-lg-2 ms-3 col-md-4 col-sm-4 col-6 " style={{ cursor:"pointer"}}>
        <div className="label">
    
        <label class="p-0" For="formFile" className="form-labels">
          select file{" "}
        </label>
        </div>
        <div className="image">
        <img src={setup1} className="car12 p-3" />
        <input className="form-control" type="file" id="formFile" />
      </div>
      </div>
      </div>
<div className="setup-update d-flex justify-content-end ">
<button type="button" class="btn rounded-2 m-3 p-2 fw-bold"
          style={{
            width: "150px",
            background: "#d65246",
            color: "white",
          
          }}
        >Update</button></div>
        </div>
        </div>
   

  )
}

export default Setup