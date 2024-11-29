import React from "react";
import './WithdrawPopup.css'

import cross from '../../assets_mercchant/cross.png'



const WithdrawPopup = ({ closeModel }) => {

  return (
    <>
      <div className="city-popup" onClick={closeModel}></div>
<div className="withdraw-pop-up">
      <div className="withdraw-popup-content1 ">
        <div className="button  pb-3 d-flex justify-content-between">
        <p class="fw-bold fs-4">mark</p>
             <button className="cross-btns border-0 bg-light " onClick={closeModel}>
      <img src={cross} className="cross-btns-img"/>
      </button>
      </div>

      <div className="popup-content table-responsive">
      <table className="popup-table w-100">
  
  <tr>
    <td className="popup-data text-start">bank name</td>
    <td className="popup-data2 text-end">test</td>
  </tr>

  <tr>
    <td className="popup-data text-start">bank account holder name</td>
    <td className="popup-data2">bank</td>
  </tr>

  <tr>
    <td className="popup-data text-start">bank account number</td>
    <td className="popup-data2">039626358</td>
    
  </tr>

  <tr>
    <td className="popup-data text-start">bank IFSC code</td>
    <td className="popup-data2">12345</td>
    
  </tr>

</table>
</div>
      </div>
      </div>
    </>
  );
};

export default WithdrawPopup;
