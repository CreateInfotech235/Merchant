import React, { useState } from "react";
import profile from "../../assets_admin/profile.svg";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import backbtn from "../../assets_admin/backbtn.png";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import plan from '../../assets_admin/plan.svg'
import adhar from '../../assets_admin/adhar.svg'
import pancard from '../../assets_admin/pancard.svg'
import certi from '../../assets_admin/certi.svg'
import ViewUser from "../../Components_admin/ViewUser/ViewUser";


const Profile = () => {


  const user = {
    name: "Krishna Singh",
    email: "hagejfhn@gmail.com",
    phoneNo: "+91 25441 69891",
    location: "Ahmedabad, Gujarat, India",
    address: "523, Angel Apartment, Pune",
    certificateNo: "5421380",
  };

  return (
    <>
      <div>
        <ViewUser />

        <div className="container">

          <div className="fluid-container w-100 shadow mt-5 p-3 mb-5 bg-white rounded pb-5 ">
            <div className="d-xxl-flex flex-xxl-row d-xl-flex flex-xl-row d-lg-flex flex-lg-row  d-md-flex  d-sm-flex flex-sm-column flex-column">
              <div className=" col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="d-flex justify-content-center align-items-center">
                  <img src={profile} alt="Profile" className="fluid-img m-xxl-5 m-xl-5 m-lg-3 m-md-2" />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p className="fw-bold m-0">{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="table-responsive d-md-flex align-items-md-center justify-content-center col-xxl-9 col-xl-9 col-lg-9 col-md-12 col-sm-12 d-flex  m-xxl-5 m-xl-5 m-lg-5 m-md-4">
                <table className="table-borderless w-100 align-items-center justify-content-center m-3">
                  <tbody>
                    <tr>
                      <th scope="row">Phone No:</th>
                      <td>{user.phoneNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">Location:</th>
                      <td>{user.location}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address:</th>
                      <td>{user.address}</td>
                    </tr>
                    <tr>
                      <th scope="row">Certificate No:</th>
                      <td>{user.certificateNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">Upload document</th>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>



          <div className="row mt-5  ">
            <div className="d-xxl-flex  flex-xxl-row d-xl-flex flex-xl-row d-lg-flex flex-lg-row d-md-flex flex-md-row  justify-content-between d-sm-flex flex-sm-column">
              <div className="d-flex flex-column align-items-center col-xxl-6 col-xl-6  col-lg-6 col-md-6 col-sm-12 col-12 shadow p-xxl-5 p-xl-5 p-lg-5 p-md-3 p-sm-3 p-3  mb-5 bg-white rounded ">
                <div >
                  <h4 className="fw-bold pb-4">Subscription plan</h4>
                </div>
                <div>
                  <img src={plan} />
                  <h4 className="fw-bold pt-3">Delivered </h4>
                </div>

                <div className="table-responsive ">
                  <table className="table-borderless align-items-center justify-content-center m-3">
                    <tbody>
                      <tr>
                        <th className="pb-3">Plan :</th>
                        <td className="pb-3 ps-5">Basic Plan</td>
                      </tr>
                      <tr>
                        <th className="pb-3">Plan type :</th>
                        <td className="pb-3 ps-5">Monthly</td>
                      </tr>
                      <tr>
                        <th className="pb-3">Renewal Date :</th>
                        <td className="pb-3 ps-5">24th june</td>
                      </tr>
                      <tr>
                        <th className="pb-3">Amount :</th>
                        <td className="pb-3 ps-5">rs. 699</td>
                      </tr>
                      <tr>
                        <th className="pb-3">Status :</th>
                        <td className="pb-3 ps-5">Active</td>
                      </tr>
                      <tr>
                        <th className="pb-3">subscription days left :</th>
                        <td className="pb-3 ps-5">30 days</td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </div>

              <div className="col-xxl-5 d-flex flex-column justify-content-center align-items-center shadow p-xxl-5 p-xl-5 p-lg-5 p-md-3 p-sm-3 p-3 mb-5 bg-white rounded">
                <div className="d-flex justify-content-start">
                  <h5 className="fw-bold pb-5">DOCUMENT</h5>
                </div>
                <div className="d-xxl-flex flex-xxl-row d-xl-flex flex-xl-row d-lg-flex flex-lg-row d-md-flex flex-md-row  d-sm-flex flex-sm-column   d-flex flex-column align-items-center mt-3    ">
                  <p className="p-0 pe-xxl-5 pe-xl-5 pe-lg-5 pe-md-3 pe-sm-3 pe-3">certificate 1</p>
                  <img src={adhar} />
                </div>
                <div className="d-xxl-flex flex-xxl-row d-xl-flex flex-xl-row d-lg-flex flex-lg-row d-md-flex flex-md-row  d-sm-flex flex-sm-column   d-flex flex-column align-items-center mt-3    ">
                  <p className="p-0 pe-xxl-5 pe-xl-5 pe-lg-5 pe-md-2 pe-sm-2 pe-2">certificate 1</p>
                  <img src={pancard} />
                </div>
                <div className="d-xxl-flex flex-xxl-row d-xl-flex flex-xl-row d-lg-flex flex-lg-row d-md-flex flex-md-row  d-sm-flex flex-sm-column   d-flex flex-column align-items-center mt-3    ">
                  <p className="p-0 pe-xxl-5 pe-xl-5 pe-lg-5 pe-md-2 pe-sm-2 pe-2">certificate 1</p>
                  <img src={certi} />
                </div>
              </div>
            </div>

            <div className="d-flex row shadow p-3 mb-5 bg-body-tertiary rounded text-capitalize">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6  col-12  col-sm-12">
                <h4 className="fw-bold">Demo used dates start to over</h4>

                <div className="table-responsive ">
                  <table className="table-borderless align-items-center justify-content-center m-3">
                    <tbody>
                      <tr>
                        <th className="pb-3 text-secondary">Demo start dates</th>
                        <td className="pb-3 ps-5 text-secondary">:-  26 jun 2024</td>
                      </tr>
                      <tr>
                        <th className="pb-3 text-secondary">Demo End dates</th>
                        <td className="pb-3 ps-5 text-secondary">:-  15 feb 2025</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6  col-12  col-sm-12">
                <div className="pb-4">
                  <h5 className="fw-bold"> Free demo days left</h5>
                </div>
                <div className="d-flex ">
                  <div className="pe-5">
                    <p className="m-0 text-secondary">15 Days Left</p>
                  </div>
                  <div className="progress w-50">
                    <div className="progress-bar w-50" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
