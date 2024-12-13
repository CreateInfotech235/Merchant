
import React, { useEffect, useState } from "react";
import recentorder from '../../assets_admin/recentorder.png'
import { getAllDeliveryMans } from "../Api/DeliveryMan";
 
const RecentUser = () => {
  const [deliveryMan , setDeliveryMan] = useState([])

  const fetchRecentDeliveryMan = async () => {
    const response = await getAllDeliveryMans()
    if (response.status) {
      const firstTenDeliveryMen = response.data.slice(0, 10);
      setDeliveryMan(firstTenDeliveryMen)
    }    
  }
  useEffect(() => {
    fetchRecentDeliveryMan();
  }, []);
  return (
    <>
    <div className="recent-heading d-flex justify-content-between pt-3 pb-3 h-100 w-100">
    <h2 className="user-p fw-bold">Recent Delivery Person</h2>
    <button className="view-all border-0 fs-3 text-black-50">view All</button>
  </div>


      <div className="container-fluid">
        <div class="recent-order row align-items-center pt-3 w-120 h-100">
          {deliveryMan.map((el,i)=> (
            
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
          <div className="border-box rounded-2 p-2">

            <div class="d-flex p-1">
            <div class="d-flex flex-row align-items-center justify-content-between ">
              <img src={recentorder} alt="Total Order" class="pe-2" />
            </div>
         
            <table class=" table-borderless m-2 mt-4 lh-lg" style={{ fontSize: "10px"}}>
              <thead>
                <tr>
                  <td class="fw-bold">Name:</td>
                  <td class="ps-4">{`${el.firstName} ${el.lastName}`}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="fw-bold">email id :</td>
                  <td class="ps-4">{el.email}</td>
                </tr>
              </tbody>
            </table>
            </div>

            <hr class="text-white border-2" />

            <table class="  table-borderless m-2 mt-4 lh-lg" style={{ fontSize: "10px" }}>
              <thead>
                <tr>
                  <td class="fw-bold">city :  </td>
                  <td class=" ps-4">{el.city}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="fw-bold">register date :</td>
                  <td class=" ps-4  ">{el.registerDate}</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
          ))}
        </div>
      </div>
  </>
  );
};

export default RecentUser;
