import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import "./DeliveryMan.css";
import show from "../../assets_mercchant/show.png";
import locationimg from "../../assets_mercchant/delivery-bike.png";
import searchIcon from "../../assets_mercchant/search.png";
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";
import { getDeliveryMan } from "../../Components_merchant/Api/DeliveryMan";
import UpdateDeliveryBoyModal from "./UpdateDeliveryManModal";
import DeliveryManInfoModal from "./DeliveryManInfoModal";
import DeleteModal from "../../Components_merchant/DeleteUser/DeleteUser";
import Loader from "../../Components_admin/Loader/Loader";
import MapModal from "./MapModal";

const DeliveryMan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModel, setShowModel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deliverymen, setDeliverymen] = useState([]);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);
  const [allDeliveryMen, setAllDeliveryMen] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDeliveryMen = async () => {
    setLoading(true);
    try {
      const res = await getDeliveryMan();
      if (res.status) {
        const deliveryMenData = res.data
          .filter((data) => data.trashed === false)
          .sort((a, b) => new Date(b.showDeliveryManNumber) - new Date(a.showDeliveryManNumber));
        
        setAllDeliveryMen(deliveryMenData);
        filterAndPaginateData(deliveryMenData, searchTerm, currentPage);
        setTotalPages(Math.ceil(deliveryMenData.length / itemsPerPage));
      }
    } catch (err) {
      console.error("Error fetching delivery men:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryMen();
  }, [ showEditModal]);

  useEffect(() => {
    filterAndPaginateData(allDeliveryMen, searchTerm, currentPage);
    setTotalPages(Math.ceil(allDeliveryMen.length / itemsPerPage));
  }, [currentPage, itemsPerPage, searchTerm]);

  const filterAndPaginateData = (data, query, page) => {
    const filteredData = data.filter((deliveryman) => {
      const searchQuery = query.toLowerCase();
      return (
        (deliveryman.showDeliveryManNumber?.toString().includes(searchQuery)) ||
        (deliveryman.firstName?.toLowerCase().includes(searchQuery)) ||
        (deliveryman.lastName?.toLowerCase().includes(searchQuery)) ||
        (deliveryman.email?.toLowerCase().includes(searchQuery)) ||
        (deliveryman.contactNumber?.toString().includes(searchQuery))
      );
    });

      const sortedData = filteredData.sort((a, b) => {
      const aMatch = String(a.showDeliveryManNumber).toLowerCase() === query;
      const bMatch = String(b.showDeliveryManNumber).toLowerCase() === query;
      return bMatch - aMatch; // Exact matches appear first
    });
    console.log("filteredData", filteredData);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDeliverymen(sortedData.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (deliveryMan) => {
    setSelectedDeliveryMan(deliveryMan._id);
    setShowModal(true);
  };

  const handleEditClick = (deliveryMan) => {
    setSelectedDeliveryMan(deliveryMan);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedDeliveryMan(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDeliveryMan(null);
  };

  const handleViewClick = (deliveryMan) => {
    setShowInfoModal(true);
    setSelectedDeliveryMan(deliveryMan);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedDeliveryMan(null);
  };

  const statusColors = {
    ENABLE: "purple",
    DISABLE: "red",
  };

  const getColorClass = (status) =>
    `enable-btn ${statusColors[status]?.toLowerCase() || "default"}`;

  const handleLocationClick = (coordinates) => {
    if (coordinates) {
      setLocation(coordinates);
      setShowMapModal(true);
    } else {
      alert("No coordinates found");
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="w-100">
        <div className="d-flex justify-content-between align-items-center py-3">
          <Link to="/add-delivery-man">
            <button
              type="button"
              className="btn text-light flex items-center justify-center"
              style={{ background: "#D65246" }}
            >
              <img src={add} className="pe-2" alt="Add" />
              Add Delivery Man
            </button>
          </Link>

          <div className="navbar-options d-flex items-center">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search Delivery man"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <button className="search-img rounded-end-4 border-0 flex items-center justify-center">
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table
            className="table-borderless w-100 text-center bg-light"
            style={{ fontSize: "12px" }}
          >
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3 text-light"></th>
                <th className="p-3 text-light">Delivery Man Number</th>
                <th className="p-3 text-light">First Name</th>
                <th className="p-3 text-light">Last Name</th>
                <th className="p-3 text-light">Contact number</th>
                <th className="p-3 text-light">Email id</th>
                <th className="p-3 text-light">Address</th>
                <th className="p-3 text-light">Post Code</th>
                <th className="p-3 text-light">Charge / Charge Method</th>
                <th className="p-3 text-light">Status</th>
                <th className="p-3 text-light">Verify</th>
                <th className="p-3 text-light">Track Location</th>
                <th className="p-3 text-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="13" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">
                        <Loader />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : deliverymen.length === 0 ? (
                <tr>
                  <td colSpan="13" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">No Data Found</div>
                    </div>
                  </td>
                </tr>
              ) : (
                deliverymen.map((deliveryman) => (
                  <tr key={deliveryman._id}>
                    <td className="user-table1">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">
                      {deliveryman?.showDeliveryManNumber ?? "-"}
                    </td>
                    <td className="p-3">{deliveryman?.firstName ?? "-"}</td>
                    <td className="p-3">{deliveryman?.lastName ?? "-"}</td>
                    <td className="p-3">
                      {deliveryman.countryCode} {deliveryman.contactNumber}
                    </td>
                    <td className="p-3">{deliveryman.email}</td>
                    <td className="p-3">{deliveryman.address}</td>
                    <td className="p-3">{deliveryman.postCode}</td>
                    <td className="p-3">{`${deliveryman.charge} / ${deliveryman.chargeMethod === "DISTANCE" ? "Per mile" : "Per hour"}`}</td>
                    <td className="p-3">
                      <button className={getColorClass(deliveryman.status)}>

                        {deliveryman.status === "ENABLE" ? "ONLINE" : "OFFLINE"}
                      </button>
                    </td>
                    <td className="user-table1">
                      <button
                        className={`enable-btn ${deliveryman.isVerified ? "green" : "red"}`}
                      >
                        {deliveryman.isVerified ? "ACTIVE" : "INACTIVE"}
                      </button>
                    </td>
                    <td className="user-table1">
                      <button
                        className="edit-btn"
                        onClick={() => handleLocationClick(deliveryman._id)}
                      >
                        <img
                          src={locationimg}
                          alt="Location"
                          className="mx-auto"
                        />
                      </button>
                    </td>
                    <td className="user-table1">
                      <div className="d-flex justify-content-center align-items-center">
                        <button
                          className="edit-btn ms-1"
                          onClick={() => handleEditClick(deliveryman)}
                        >
                          <img src={edit} alt="Edit" className="mx-auto" />
                        </button>
                        <button
                          className="delete-btn ms-1"
                          onClick={() => handleDeleteClick(deliveryman)}
                        >
                          <img
                            src={deleteimg}
                            alt="Delete"
                            className="mx-auto"
                          />
                        </button>
                        <button
                          className="show-btn ms-1"
                          onClick={() => handleViewClick(deliveryman)}
                        >
                          <img src={show} alt="Show" className="mx-auto" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-3">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
          <select
            className="form-select ms-3 w-20"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {showEditModal && (
        <UpdateDeliveryBoyModal
          deliveryBoy={selectedDeliveryMan}
          onHide={closeEditModal}
        />
      )}

      {showModal && (
        <DeleteModal
          Id={selectedDeliveryMan}
          text="DeliveryMan"
          onDelete={async () => {
            closeModal()
            setShowModal(false)
            await fetchDeliveryMen()
          }}
          onHide={() => {
            closeModal()
            setShowModal(false)
          }}
        />
      )}

      {showInfoModal && (
        <DeliveryManInfoModal
          deliveryBoy={selectedDeliveryMan}
          onHide={closeInfoModal}
        />
      )}

      {showMapModal && (
        <MapModal location={location} onHide={() => setShowMapModal(false)} />
      )}
    </>
  );
};

export default DeliveryMan;
