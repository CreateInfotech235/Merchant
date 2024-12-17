
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import './DeliveryMan.css'
import show from "../../assets_mercchant/show.png";
import locationimg from "../../assets_mercchant/locationimg.png";
import searchIcon from "../../assets_mercchant/search.png";
import Pagination from "../../Components_merchant/Pagination/Pagination";
import { getDeliveryMan } from "../../Components_merchant/Api/DeliveryMan";
import UpdateDeliveryBoyModal from "./UpdateDeliveryManModal";
import DeliveryManInfoModal from "./DeliveryManInfoModal"; // Import the new modal
import DeleteModal from "../../Components_merchant/DeleteUser/DeleteUser";
import ConformDeleteModel from "../ConformDeleteModel/ConformDeleteModel";
import Loader from "../../Components_admin/Loader/Loader";

const TrashedDeliveryman = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [showModel, setShowModel] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [deliverymen, setDeliverymen] = useState([]); // State for API data
  const [totalPages, setTotalPages] = useState(1); // For pagination
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(null); // State for selected delivery man to edit or view
  const [showEditModal, setShowEditModal] = useState(false); // State for showing the edit modal
  const [showModal, setShowModal] = useState(false); // State for showing the edit modal
  const [showInfoModal, setShowInfoModal] = useState(false); // State for showing the view modal

  const closeModel = () => setShowModel(false);

  const fetchDeliveryMen = async () => {
    const searchParam = searchTerm ? `&searchValue=${searchTerm}` : "";
    const res = await getDeliveryMan(currentPage, itemsPerPage, searchParam);
    const trashedData = await res.data.filter(data => data.trashed === true)
    if (res.status) {

      setDeliverymen(trashedData);
    }
  };

  useEffect(() => {
    fetchDeliveryMen();
  }, [currentPage, searchTerm ,showModal]); // Fetch data when page or search term changes

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when search term changes
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Filter deliverymen based on search term
  const filteredDeliverymen = deliverymen?.filter((deliveryman) => {
    const query = searchTerm.toLowerCase();
    return (
      (deliveryman.firstName &&
        deliveryman.firstName.toLowerCase().includes(query)) ||
      (deliveryman.lastName &&
        deliveryman.lastName.toLowerCase().includes(query)) ||
      (deliveryman.email && deliveryman.email.toLowerCase().includes(query)) ||
      (deliveryman.contactNumber &&
        deliveryman.contactNumber.toString().includes(query))
    );
  });

  // Pagination logic
  const indexOfLastDeliveryMan = currentPage * itemsPerPage;
  const indexOfFirstDeliveryMan = indexOfLastDeliveryMan - itemsPerPage;
  const currentDeliveryMen = filteredDeliverymen.slice(
    indexOfFirstDeliveryMan,
    indexOfLastDeliveryMan,
  );

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
    setSelectedDeliveryMan(null); // Clear the selected delivery man after closing
  };
  const closeModal = () => {
    setShowEditModal(false);
    setShowModal(false)
    setSelectedDeliveryMan(null); // Clear the selected delivery man after closing
  };

  // Function to open info modal and set the selected delivery man
  const handleViewClick = (deliveryMan) => {
    // console.log("delivery", deliveryMan);

    setShowInfoModal(true); // Show the info modal
    setSelectedDeliveryMan(deliveryMan);
  };

  // console.log("view", showInfoModal);

  // Function to close the info modal
  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedDeliveryMan(null); // Clear the selected delivery man after closing
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
        <div className="d-flex justify-content-between align-items-center py-3">
          <Link to="/add-delivery-man">
            <button
              type="button"
              className="btn text-light flex justify-center items-center"
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
              placeholder="Search Delivery boy"
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
                <th className="p-3 text-light">First Name</th>
                <th className="p-3 text-light">Last Name</th>
                <th className="p-3 text-light">Contact number</th>
                <th className="p-3 text-light">Email id</th>
                <th className="p-3 text-light">Address</th>
                <th className="p-3 text-light">Status</th>
                <th className="p-3 text-light">Verify</th>
                <th className="p-3 text-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDeliveryMen.length === 0 ? (
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
                currentDeliveryMen.map((deliveryman) => (
                  <tr key={deliveryman._id}>
                    <td className="user-table1">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">{deliveryman?.firstName ?? "-"}</td>
                    <td className="p-3">{deliveryman?.lastName ?? "-"}</td>
                    <td className="p-3">
                      {deliveryman.countryCode} {deliveryman.contactNumber}
                    </td>
                    <td className="p-3">{deliveryman.email}</td>
                    <td className="p-3">{deliveryman.address}</td>

                    <td className="p-3">
                      <button className={getColorClass(deliveryman.status)}>
                        {deliveryman.status === 'ENABLE' ? 'ONLINE' : 'OFFLINE'}
                      </button> 
                    </td>
                    <td className="user-table1">
                      <button className={`enable-btn ${deliveryman.isVerified ? 'green' : 'red'}`}>
                        {deliveryman.isVerified ? "ACTIVE" : "INACTIVE"}
                      </button>
                      {/* <input type="checkb ox" checked={deliveryman.isVerified} /> */}
                    </td>
                    <td className="user-table1">
                      <div className="d-flex justify-content-center align-items-center">
                        {/* <button className="edit-btn">
                          <img src={locationimg} alt="Edit" className="mx-auto" />
                        </button> */}
                        {/* <button
                          className="edit-btn ms-1"
                          onClick={() => handleEditClick(deliveryman)}
                        >
                          <img src={edit} alt="Edit" className="mx-auto" />
                        </button> */}
                        <button
                          className="delete-btn ms-1"
                          onClick={() => handleDeleteClick(deliveryman)}
                        >
                          <img src={deleteimg} alt="Delete" className="mx-auto" />
                        </button>

                        {/* <button
                          className="show-btn ms-1"
                          onClick={() => handleViewClick(deliveryman)}
                        >
                          <img src={show} alt="Show" className="mx-auto" />
                        </button> */}
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

      {/* Conditionally render the UpdateDeliveryBoyModal */}
      {showEditModal && (
        <UpdateDeliveryBoyModal
          deliveryBoy={selectedDeliveryMan}
          onHide={closeEditModal}
        />
      )}



{showModal && <ConformDeleteModel
      text="DeliveryMan"
      Id = {selectedDeliveryMan}
        onDelete={() => closeModal()}
        onHide={() => setShowModal(false)}
      />}
      {/* Conditionally render the DeliveryManInfoModal */}
      {showInfoModal && (
        <DeliveryManInfoModal
          deliveryBoy={selectedDeliveryMan}
          onHide={closeInfoModal}
        />
      )}
    </>
  );
};

export default TrashedDeliveryman;
