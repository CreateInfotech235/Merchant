import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import totalorder from "../../assets_admin/totalorder.png"; // Correct import path
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

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [themeMode, setThemeMode] = useState("light");
  const [counts, setCounts] = useState({})
 

  const fetchCount = async () => {
    const res = await getCounts();
    console.log(res);
    setCounts(res.data)
  }
  useEffect(() => {
    // Update body class based on themeMode
    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [themeMode]);

  useEffect(() => {
    fetchCount()
  }, [])

  const toggleThemeMode = () => {
    // Toggle between light and dark mode
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when search changes
  };
  return (
    <>
      <div class="d-xxl-flex justify-content-xxl-end d-xl-flex justify-content-xl-end d-lg-flex justify-content-lg-end d-md-flex justify-content-center align-items-center justify-content-md-between d-sm-flex  flex-sm-column  flex-column  flex-lg-row  flex-md-row   flex-xl-row align-items-center">
      </div>
      <div className="d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between  d-lg-flex justify-content-lg-between  d-md-flex justify-content-md-between d-sm-flex justify-content-sm-center d-flex flex-column  flex-xxl-row   flex-xl-row  flex-lg-row   flex-md-row   flex-sm-column align-items-center nav-bar pb-3">
        <div className={`navbar ${themeMode === "dark" ? "dark-mode" : ""}`}>
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
        <div>
        </div>
      </div>

      <div className="container-fluid">
        <div
          class="dashboard row pt-3 h-100 w-120"
          style={{ marginLeft: "-10px" }}
        >

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-5 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "10px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.totalOrders || 0}</h5>
              <p className="box-para">Total orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.acceptedOrders || 0}</h5>
              <p className="box-para">Accepted orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.arrivedOrders || 0}</h5>
              <p className="box-para">Arrived orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.assignedOrders || 0}</h5>
              <p className="box-para">Assigned orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.cancelledOrders || 0}</h5>
              <p className="box-para">Cancelled orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.createdOrders || 0}</h5>
              <p className="box-para">Created orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.deliveredOrders || 0}</h5>
              <p className="box-para">Delivered orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.departedOrders || 0}</h5>
              <p className="box-para">Departed orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.pickedOrders || 0}</h5>
              <p className="box-para">Picked orders</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.deliveryMan || 0}</h5>
              <p className="box-para">DeliveryMan</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.subscribedMerchants || 0}</h5>
              <p className="box-para">Subscribed Merchants</p>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center align-items-center">
            <div className="box rounded-2 p-4">
              <div class="d-flex align-items-center justify-content-between pb-4">
                <img src={totalorder} alt="Total Order" />
                {/* <img
                  src={arrow}
                  alt="Total Order"
                  class="pe-2 ps-2 pb-2"
                  style={{ height: "20px" }}
                />
                <p style={{ fontSize: "9px" }}>
                  10.5%{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    +$56k today
                  </span>
                </p> */}
              </div>
              <h5 className="box-heading fw-bold">{counts.unsubscribedMerchants || 0}</h5>
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
        <div class="recent-order row align-items-center pt-3 w-120 h-100">
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-2">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="pe-2" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class="text-end">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class="text-end">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date: </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4  ">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-1">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-1">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-1">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-1">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-2">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-1">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-1">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-1">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table
                class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }}
              >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td>
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3 ">
            <div className="border-box rounded-2 p-1">
              <div class="d-flex p-2">
                <div class="d-flex flex-row align-items-center justify-content-between ">
                  <img src={recentorder} alt="Total Order" class="me-3" />
                </div>

                <table
                  class=" table-borderless lh-lg"
                  style={{ fontSize: "10px" }}
                >
                  <thead>
                    <tr>
                      <td class="fw-bold">Name:</td>
                      <td class=" ps-4">mark</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="fw-bold">delivery man :</td>
                      <td class=" ps-4">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr class="text-white border-2" />

              <table class=" table-borderless m-2 lh-lg"
                style={{ fontSize: "10px" }} >
                <thead>
                  <tr>
                    <td class="fw-bold">pickup date </td>
                    <td class=" ps-4">14May2024 | 03:42 PM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-bold">created date :</td>
                    <td class=" ps-4">38 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="fw-bold">status :</td>
                    <td class=" ps-4">
                      <button
                        class="border-0 text-white rounded-1 ps-1 pe-1 "
                        style={{ background: "#976CDD", fontSize: "8px" }}
                      >
                        Created
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="user-data">
        <RecentUser />
      </div>
      <div className="delivery-persons">
        <DeliveryPerson />
      </div>
    </>
  );
};

export default Dashboard;
