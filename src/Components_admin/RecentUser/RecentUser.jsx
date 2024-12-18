
import React, { useEffect, useState } from "react";
import recentorder from '../../assets_admin/recentorder.png'
import { getAllUsers } from "../Api/User";

const RecentUser = () => {

  const [merchants, setMerchants] = useState([])

  const fetchMerchants = async () => {
    const response = await getAllUsers()
    if (response.status) {
      const fetchTenMerchant = response.data.slice(0, 10)
      setMerchants(fetchTenMerchant)
    }

  }
  useEffect(() => {
    fetchMerchants()
  }, [])
  return (
    <>
      <div className="recent-heading d-flex justify-content-between pt-3 pb-3 h-100 w-100">
        <h2 className="user-p fw-bold">Recent User</h2>
        <button className="view-all border-0 fs-3 text-black-50 ">view All</button>
      </div>


      <div className="container-fluid">
        <div className="recent-order row align-items-center pt-3 w-120 h-100">
          {merchants.map((merchant) => (
            <>
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
                <div className="border-box rounded-2 p-2">

                  <div className="d-flex p-1">
                    <div className="d-flex flex-row align-items-center justify-content-between ">
                      <img src={recentorder} alt="Total Order" className="pe-2" />
                    </div>

                    <table className=" table-borderless m-2 mt-4 lh-lg" style={{ fontSize: "10px" }}>
                      <thead>
                        <tr>
                          <td className="fw-bold">Name:</td>
                          <td className="ps-4">{`${merchant.firstName} ${merchant.lastName}`}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td className="fw-bold " >email id :</td>
                          <td className="ps-4 relative group cursor-pointer"> {/* 'relative' for positioning */}
                            {/* Truncated email display */}
                            {merchant.email.length > 30
                              ? merchant.email.slice(0, 30) + "..."
                              : merchant.email
                            }

                            {/* Tooltip */}
                            <div
                              className="absolute z-10 hidden group-hover:block transition-opacity duration-300 
                   bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-md 
                   dark:bg-gray-700"
                              style={{
                                bottom: '100%', /* Position tooltip above the text */
                                left: '0',
                                marginBottom: '8px'
                              }}
                            >
                              {merchant.email} {/* Show full email */}
                              <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>


                    </table>
                  </div>

                  <hr className="text-white border-2" />

                  <table className="  table-borderless m-2 mt-4 lh-lg" style={{ fontSize: "10px" }}>
                    <thead>
                      <tr>
                        <td className="fw-bold">city :  </td>
                        <td className=" ps-4">{merchant.address.city}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-bold">register date :</td>
                        <td className=" ps-4  ">{merchant.registerDate}</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentUser;
