import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import locationimg from "../../assets_admin/locationimg.png";
import DeleteUser from "../../Components_admin/DeleteUser/DeleteUser";
import searchIcon from "../../assets_admin/search.png";
import Pagination from "../../Components_admin/Pagination/Pagination";
import DeliveryManInfoModal from "./DeliveryManInfoModal";
import DeleteModal from "../../Components_admin/DeleteModal";
import {
  getAllDeliveryMan,
  deleteDeliveryBoy,
  getAllDeliveryManOfMerchant,
} from "../../Components_admin/Api/DeliveryMan";
import "./DeliveryMan.css";
import Loader from "../../Components_admin/Loader/Loader";

const MerchantDeliveryMan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Changed to 5 items per page
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deliverymen, setDeliverymen] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const closeDeleteModal = () => setShowDeleteModal(false);

  const fetchDeliveryMen = async () => {
    const searchParam = searchTerm ? `&searchValue=${searchTerm}` : "";
    const res = await getAllDeliveryManOfMerchant(
      currentPage,
      itemsPerPage,
      searchParam
    );
    // console.log(res);
    if (res.status) {
      setDeliverymen(res.data.data);
      setTotalPages(Math.ceil(res.data.totalDataCount / itemsPerPage));
    }
  };

  useEffect(() => {
    fetchDeliveryMen();
  }, [currentPage, searchTerm]); // Fetch when page or search changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleEditClick = (deliveryMan) => {
    setSelectedDeliveryMan(deliveryMan);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedDeliveryMan(null);
  };

  const handleViewClick = (deliveryMan) => {
    setSelectedDeliveryMan(deliveryMan);
    setShowInfoModal(true);
  };
  const filteredDeliverymen = deliverymen.filter((deliveryman) => {
    const query = searchTerm.toLowerCase();
    return (
      (deliveryman.firstName &&
        deliveryman.firstName.toLowerCase().includes(query)) ||
      (deliveryman.lastName &&
        deliveryman.lastName.toLowerCase().includes(query)) ||
      (deliveryman.email && deliveryman.email.toLowerCase().includes(query)) ||
      (deliveryman.contactNumber &&
        deliveryman.contactNumber.toString().includes(query)) ||
      (deliveryman.country &&
        deliveryman.country.toLowerCase().includes(query)) ||
      (deliveryman.city && deliveryman.city.toLowerCase().includes(query))
    );
  });

  const indexOfLastDeliveryMan = currentPage * itemsPerPage;
  const indexOfFirstDeliveryMan = indexOfLastDeliveryMan - itemsPerPage;
  const currentDeliveryMen = filteredDeliverymen.slice(
    indexOfFirstDeliveryMan,
    indexOfLastDeliveryMan
  );

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedDeliveryMan(null);
  };

  const handleDeleteClick = (deliveryMan) => {
    setSelectedDeliveryMan(deliveryMan);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedDeliveryMan) {
      const response = await deleteDeliveryBoy(selectedDeliveryMan._id);
      if (response.status) {
        fetchDeliveryMen();
      }
      closeDeleteModal();
    }
  };
  const statusColors = {
    ENABLE: "purple",
    DISABLE: "red",
  };
  const getColorClass = (status) =>
    `enable-btn ${statusColors[status]?.toLowerCase() || "default"}`;
  return (
    <>
      <div className="w-100">
        <div className="d-flex justify-content-between py-3">
          <button className="delete">Delete</button>
          <Link to="/add-delivery-man-admin">
            <button
              type="button"
              className="btn text-light flex items-center"
              style={{ background: "#D65246" }}
            >
              <img src={add} alt="Add" className="me-2" />
              Add Delivery Man
            </button>
          </Link>
        </div>

        <div className="navbar">
          <div className="navbar-options d-flex">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search Delivery boy"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0">
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
                <th className="p-3 text-light "></th>
                <th className="p-3 text-light">DeliveryMan Id</th>
                <th className="p-3 text-light">Merchant Name</th>
                <th className="p-3 text-light">First Name</th>
                <th className="p-3 text-light">Last Name</th>
                <th className="p-3 text-light">Contact number</th>
                <th className="p-3 text-light">Email id</th>
                <th className="p-3 text-light">Address</th>
                <th className="p-3 text-light">Post Code</th>
                <th className="p-3 text-light">Status</th>
                <th className="p-3 text-light">Verify</th>
                <th className="p-3 text-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliverymen.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">
                        <Loader />
                        No Data Found
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDeliverymen.map((deliveryman) => (
                  <tr key={deliveryman._id}>
                    <td className="user-table1">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3 text-primary">
                      {deliveryman?.showDeliveryManNumber ?? "-"}
                    </td>
                    <td className="p-3">{deliveryman?.merchantName ?? "-"}</td>
                    <td className="p-3">{deliveryman?.firstName ?? "-"}</td>
                    <td className="p-3">{deliveryman?.lastName ?? "-"}</td>
                    <td className="p-3">
                      {deliveryman.countryCode} {deliveryman.contactNumber}
                    </td>
                    <td className="p-3">{deliveryman.email}</td>
                    <td className="p-3">{deliveryman.address}</td>
                    <td className="p-3">{deliveryman.postCode}</td>
                    <td className="p-3">
                      <button className={getColorClass(deliveryman.status)}>
                        {deliveryman.status === "ENABLE" ? "ONLINE" : "OFFLINE"}
                      </button>
                    </td>
                    <td className="user-table1">
                      <button
                        className={`enable-btn ${
                          deliveryman.isVerified ? "green" : "red"
                        }`}
                      >
                        {deliveryman.isVerified ? "ACTIVE" : "INACTIVE"}
                      </button>
                      {/* <input type="checkb ox" checked={deliveryman.isVerified} /> */}
                    </td>
                    <td className="user-table1">
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="edit-btn">
                          <img
                            src={locationimg}
                            alt="Edit"
                            className="mx-auto"
                          />
                        </button>
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleClick={handleClick}
        />
      </div>

      {showInfoModal && (
        <DeliveryManInfoModal
          deliveryBoy={selectedDeliveryMan}
          onHide={closeInfoModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onDelete={confirmDelete}
          onHide={closeDeleteModal}
          text="Delivery Man"
        />
      )}
    </>
  );
};

export default MerchantDeliveryMan;
