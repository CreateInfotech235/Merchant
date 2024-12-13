import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import locationimg from "../../assets_admin/locationimg.png";
import DisableUser from "../../Components_admin/DisableUser/DisableUser";
import DeleteUser from "../../Components_admin/DeleteUser/DeleteUser";
import searchIcon from "../../assets_admin/search.png";
import { exportFreeSubscription } from "../../Components_admin/Api/Subscription";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaCircle,
  FaCity,
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import Loader from "../../Components_admin/Loader/Loader";

const DemoUsedMerchant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModel, setShowModel] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deliverymen, setDeliverymen] = useState([]);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState(null);

  const closeModel = () => {
    setShowModel(false);
    setShowEditModal(false);
    setShowViewModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await exportFreeSubscription();
      console.log(response.data.data);
      setDeliverymen(response.data.data);
    };
    fetchData();
  }, []);

  const filteredDeliverymen = deliverymen.filter((deliveryman) =>
    deliveryman.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeliverymen.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredDeliverymen.length / itemsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleEdit = (deliveryman) => {
    setSelectedDeliveryman(deliveryman);
    setShowEditModal(true);
  };

  const handleView = (deliveryman) => {
    setSelectedDeliveryman(deliveryman);
    setShowViewModal(true);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? "active" : null}
      >
        {number}
      </li>
    ));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-100">
        <div className="fluid-container">
          <div className="navbar">
            <div className="navbar-options d-flex my-2 col-12">
              <input
                type="search"
                className="search-btn rounded-start-4 p-3"
                placeholder="Search deliveryman"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="search-img rounded-end-4 border-0">
                <img src={searchIcon} className="search" alt="search icon" />
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table-borderless w-100 text-center bg-light">
              <thead className="text-light" style={{ background: "#253A71" }}>
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3 text-[12px]">Name</th>
                  <th className="p-3 text-[12px]">Contact number</th>
                  <th className="p-3 text-[12px]">Email id</th>
                  <th className="p-3 text-[12px]">Country</th>
                  <th className="p-3 text-[12px]">City</th>
                  <th className="p-3 text-[12px]">Register date</th>
                  <th className="p-3 text-[12px]">Status</th>
                  <th className="p-3 text-[12px]">Verify</th>
                  <th className="p-3 text-[12px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center p-3">
                      <div className="d-flex justify-content-center">
                        <div className="mx-auto">
                          <Loader />
                          No Data Found
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((deliveryman) => (
                    <tr key={deliveryman._id}>
                      <td className="user-table1">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3 text-[12px]">{deliveryman.name}</td>
                      <td className="p-3 text-[12px]">
                        {deliveryman.contactNumber}
                      </td>
                      <td className="p-3 text-[12px]">{deliveryman.email}</td>
                      <td className="p-3 text-[12px]">{deliveryman.country}</td>
                      <td className="p-3 text-[12px]">{deliveryman.city}</td>
                      <td className="p-3 text-[12px]">
                        {deliveryman.registerDate}
                      </td>
                      <td className="p-3">
                        <button
                          className="enable-btn"
                          onClick={() => setShowModel(true)}
                        >
                          {deliveryman.status}
                        </button>
                        {showModel && <DisableUser closeModel={closeModel} />}
                      </td>
                      <td className="user-table1">
                        <input type="checkbox" />
                      </td>
                      <td className="user-table1">
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(deliveryman)}
                          >
                            <img src={edit} alt="Edit" />
                          </button>
                          <button
                            className="delete-btn ms-1"
                            onClick={() => setShowModel(true)}
                          >
                            <img src={deleteimg} alt="Delete" />
                          </button>
                          {showModel && <DeleteUser closeModel={closeModel} />}
                          <button
                            className="show-btn ms-1"
                            onClick={() => handleView(deliveryman)}
                          >
                            <img src={show} alt="Show" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination-container d-flex justify-content-end mt-3">
            <ul className="pagination">{renderPageNumbers()}</ul>
          </div>
        </div>
      </div>

      {/* Add Edit Modal Component Here */}
      {showEditModal && (
        <Modal show={showEditModal} onHide={closeModel}>
          <ModalHeader closeButton>
            <h5>Edit Merchant</h5>
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedDeliveryman?.name}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedDeliveryman?.contactNumber}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue={selectedDeliveryman?.email}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedDeliveryman?.country}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedDeliveryman?.city}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </ModalBody>
        </Modal>
      )}

      {/* Add View Modal Component Here */}
      {showViewModal && (
        <Modal show={showViewModal} onHide={closeModel} centered>
          <ModalHeader
            closeButton
            className="bg-primary text-white modal-header "
            closeVariant="white"
          >
            <h5>Merchant Details</h5>
          </ModalHeader>
          <ModalBody>
            <div className="merchant-details">
              <div className="row mb-2 p-2 ps-3">
                <label className="col-5  d-flex align-items-center p-0">
                  <FaUser className="me-2" />
                  Name:
                </label>
                <span className="col-7">{selectedDeliveryman?.name}</span>
              </div>
              <div className="row mb-2 p-2 ps-3">
                <label className="col-5 fw-bold d-flex align-items-center p-0">
                  <FaPhone className="me-2" />
                  Contact Number:
                </label>
                <span className="col-7">
                  {selectedDeliveryman?.contactNumber}
                </span>
              </div>
              <div className="row mb-2 p-2 ps-3">
                <label className="col-5 fw-bold d-flex align-items-center p-0">
                  <FaEnvelope className="me-2" />
                  Email:
                </label>
                <span className="col-7">{selectedDeliveryman?.email}</span>
              </div>
              <div className="row mb-2 p-2 ps-3">
                <label className="col-5 fw-bold d-flex align-items-center p-0">
                  <FaGlobe className="me-2" />
                  Country:
                </label>
                <span className="col-7">{selectedDeliveryman?.country}</span>
              </div>
              <div className="row mb-2 p-2 ps-3">
                <label className="col-5 fw-bold d-flex align-items-center p-0">
                  <FaCity className="me-2" />
                  City:
                </label>
                <span className="col-7">{selectedDeliveryman?.city}</span>
              </div>
              <div className="row mb-2 p-2 ps-3">
                <label className="col-5 fw-bold d-flex align-items-center p-0">
                  <FaCalendarAlt className="me-2" />
                  Register Date:
                </label>
                <span className="col-7">
                  {selectedDeliveryman?.registerDate}
                </span>
              </div>
              <div className="row mb-2 p-2 ps-3">
                <label className="col-5 fw-bold d-flex align-items-center p-0">
                  <FaCircle className="me-2" />
                  Status:
                </label>
                <span className="col-7">{selectedDeliveryman?.status}</span>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default DemoUsedMerchant;
