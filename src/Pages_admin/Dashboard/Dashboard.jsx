import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Shopping_bag from "../../assets_admin/shopping-bag.png"; // Correct import path

import recentorder from "../../assets_admin/recentorder.png"; // Correct import path
import LineChart from "../../Components_admin/LineChart/LineChart";
import LineChart1 from "../../Components_admin/LineChart1/LineChart1";
import DoughnutChart from "../../Components_admin/DoughnutChar/DoughnutChar";
import Table from "../../Components_admin/Table/Table";
import RecentUser from "../../Components_admin/RecentUser/RecentUser";
import DeliveryPerson from "../../Components_admin/DeliveryPerson/DeliveryPerson";
import OrderBarChart from "../../Components_admin/OrderBarChart/OrderBarChart";
import arrow from "../../assets_admin/arrow.png";
import Breadcrumb from "../../Components_admin/Breadcrumb/Breadcrumb";
import Header from "../../Components_admin/Header/Header";
import searchIcon from "../../assets_admin/search.png";
import { getCounts } from "../../Components_admin/Api/Dashboard";
import Loader from "../../Components_admin/Loader/Loader";
import { getAllDeliveryMans } from "../../Components_admin/Api/DeliveryMan";
import { getAllOrder } from "../../Components_admin/Api/Order";
import Delivered from "../../assets_mercchant/total-order.svg";
import Totalorderss from "../../assets_admin/Total orders.png";
import Acceptedorders from "../../assets_admin/Accepted orders.png";
import Arrivedorders from "../../assets_admin/Arrived orders.png";
import Assignedorders from "../../assets_admin/Assigned orders.png";
import Cancelledorders from "../../assets_admin/Cancelled orders.png";
import Createdorders from "../../assets_admin/management-service.png";
import Departedorders from "../../assets_admin/Departed orders.png";
import Pickedorders from "../../assets_admin/Picked orders.png";
import DeliveryMan from "../../assets_admin/DeliveryMan.png";
import Subscribe from "../../assets_admin/subscribe.png";
import UnSubscribe from "../../assets_admin/unfollow.png";
const Dashboard = () => {
  const [themeMode, setThemeMode] = useState("light");
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([])


  const fetchCount = async () => {
    setLoading(true);
    const res = await getCounts();
    setCounts(res.data);
    setLoading(false);
  };
  useEffect(() => {
    // Update body className based on themeMode
    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [themeMode]);

  const fetchOrder = async () => {
    const response = await getAllOrder()
    // console.log(response, "Oder");
    if (response.status) {
      const fetchTenOrder = response.data.slice(0, 10)
      setOrder(fetchTenOrder)
    }
  }
  useEffect(() => {
    fetchCount();
    fetchOrder()
  }, []);

  return (
    <div className="position-relative h-[calc(100vh-187px)]">
      {loading ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Loader />
        </div>
      ) : (
        <>
          {loading && <Loader />}
          <div className="d-xxl-flex justify-content-xxl-end d-xl-flex justify-content-xl-end d-lg-flex justify-content-lg-end d-md-flex justify-content-center align-items-center justify-content-md-between d-sm-flex  flex-sm-column  flex-column  flex-lg-row  flex-md-row   flex-xl-row align-items-center"></div>
          {/* <div className="d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between  d-lg-flex justify-content-lg-between  d-md-flex justify-content-md-between d-sm-flex justify-content-sm-center d-flex flex-column  flex-xxl-row   flex-xl-row  flex-lg-row   flex-md-row   flex-sm-column align-items-center nav-bar pb-3">
            <div
              className={`navbar ${themeMode === "dark" ? "dark-mode" : ""}`}
            >
              <div className="navbar-options d-flex my-2 col-12">
                <input
                  type="search"
                  className="search-btn rounded-start-4 p-3"
                  placeholder="Search your delivery"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="search-img rounded-end-4 border-0">
                  <img src={searchIcon} className="search" alt="search icon" />
                </button>
              </div>
            </div>
            <div></div>
          </div> */}

          <div className="container-fluid">
            <div
              className="dashboard row pt-3 h-100 w-120"
              style={{ marginLeft: "-10px" }}
            >
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Totalorderss} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-5 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "10px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.totalOrders || 0}
                  </h5>
                  <p className="box-para">Total orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Acceptedorders} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.acceptedOrders || 0}
                  </h5>
                  <p className="box-para">Accepted orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Arrivedorders} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.arrivedOrders || 0}
                  </h5>
                  <p className="box-para">Arrived orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Assignedorders} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.assignedOrders || 0}
                  </h5>
                  <p className="box-para">Assigned orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Cancelledorders} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.cancelledOrders || 0}
                  </h5>
                  <p className="box-para">Cancelled orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Createdorders} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.createdOrders || 0}
                  </h5>
                  <p className="box-para">Created orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Delivered} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.deliveredOrders || 0}
                  </h5>
                  <p className="box-para">Delivered orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Departedorders} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.departedOrders || 0}
                  </h5>
                  <p className="box-para">Departed orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Pickedorders} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.pickedOrders || 0}
                  </h5>
                  <p className="box-para">Picked orders</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={DeliveryMan} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.deliveryMan || 0}
                  </h5>
                  <p className="box-para">DeliveryMan</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={Subscribe} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.subscribedMerchants || 0}
                  </h5>
                  <p className="box-para">Subscribed Merchants</p>
                </div>
              </div>

              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
                <div className="box rounded-2 p-4">
                  <div className="d-flex align-items-center justify-content-between pb-4">
                    <img style={{ width: "55px" }} src={UnSubscribe} alt="Total Order" />
                    {/* <img
                  src={arrow}
                  alt="Total Order"
                  className="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
                  </div>
                  <h5 className="box-heading fw-bold">
                    {counts.unsubscribedMerchants || 0}
                  </h5>
                  <p className="box-para">Unsubscribed Merchants</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-12 table-chart d-xxl-flex flex-xxl-row align-items-xxl-center  d-xl-flex flex-xl-row align-items-xl-center d-lg-flex flex-lg-row  align-items-lg-center d-md-flex flex-lg-row flex-md-column align-items-md-center   d-sm-flex   flex-sm-column   d-flex  flex-column ">
            <div className="charts1 col-xxl-12 col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="line-chart">
                {" "}
                <LineChart />
              </div>
              <div className="Line-chart1">
                <LineChart />
              </div>
            </div>
          </div>

          <div className="table-chart d-xxl-flex flex-xxl-row align-items-xxl-center  d-xl-flex flex-xl-row align-items-xl-center d-lg-flex flex-lg-row  align-items-lg-center d-md-flex flex-lg-row flex-md-row align-items-md-center   d-sm-flex   flex-sm-column   d-flex  flex-column ">
            <div className="dashboard-table col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 ">
              <Table />
            </div>
            <div className="chart2 col-xxl-4 col-xl-4 col-lg-4  col-md-4 col-sm-12 col-12 ms-0 m-2">
              <DoughnutChart />
            </div>
          </div>

          <div className="recent-heading d-flex justify-content-between pt-3 pb-3">
            <h2 className="user-p fw-bold">Recent order</h2>
            <button className="view-all border-0 fs-3 text-black-50">
              view All
            </button>
          </div>

          <div className="container-fluid">
            <div className="recent-order row align-items-center pt-3 w-120 h-100">
              {order.map((order, i) => (
                <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 " key={i}>
                  <div className="border-box rounded-2 p-2">
                    <div className="d-flex p-2">
                      <div className="d-flex flex-row align-items-center justify-content-between ">
                        <img src={Shopping_bag} alt="Total Order" className="pe-2" />
                      </div>

                      <table
                        className=" table-borderless lh-lg"
                        style={{ fontSize: "10px" }}
                      >
                        <thead>
                          <tr>
                            <td className="fw-bold">Name:</td>
                          <td className="text-end">{order.customerName}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="fw-bold">delivery man :</td>
                            <td className="text-end">{order.deliveryMan}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <hr className="text-white border-2" />

                    <table
                      className=" table-borderless m-2 lh-lg"
                      style={{ fontSize: "10px" }}
                    >
                      <thead>
                        <tr>
                          <td className="fw-bold">pickup date: </td>
                          <td className=" ps-4">{order.pickupDate}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="fw-bold">created date :</td>
                          <td className=" ps-4  ">{order.createdDate}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">status :</td>
                          <td className=" ps-4">
                            <button
                              className="border-0 text-white rounded-1 ps-1 pe-1 "
                              style={{ background: "#976CDD", fontSize: "8px" }}
                            >
                                {order.status}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              ))}
            </div>
          </div>

          <div className="user-data">
            <RecentUser />
          </div>
          <div className="delivery-persons">
            <DeliveryPerson />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
