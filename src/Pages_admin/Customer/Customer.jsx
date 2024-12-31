import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_admin/search.png";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import locationimg from "../../assets_admin/locationimg.png";
import show from "../../assets_admin/show.png";
import {
  deleteCustomer,
  getAllCustomers,
} from "../../Components_admin/Api/Admincustomer";
import CutomerInfoModal from "./CustomerInfoModal";
import Loader from "../../Components_admin/Loader/Loader";
import EditUser from "../EditUser/EditUser";
import EditCustomer from "./EditCustomer";
import DeleteModal from "../../Components_admin/DeleteModal";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const fetchCustomers = async () => {
    // console.log('🚀 ~ fetchCustomers ~ createdBy:', createdBy);
    setLoading(true);
    try {
      const response = await getAllCustomers(null);
      console.log(response);

      if (response.status) {
        setCustomers(response.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomersByStatus = async (createdBy) => {
    // console.log('🚀 ~ fetchCustomers ~ createdBy:', createdBy);
    console.log(createdBy);
    setLoading(true);
    try {
      const response = await getAllCustomers(createdBy);
      console.log(response);

      if (response.status) {
        setCustomers(response.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase();
    return (
      customer?.customerId?.toLowerCase().includes(query) ||
      customer?.firstName?.toLowerCase().includes(query) ||
      customer?.lastName?.toLowerCase().includes(query) ||
      customer?.email?.toLowerCase().includes(query) ||
      customer?.postCode?.toLowerCase().includes(query)
    );
  });
  console.log(filteredCustomers);

  const handleLocationClick = (coordinates) => {
    if (coordinates && coordinates.length === 2) {
      setSelectedLocation(coordinates);
      setIsMapModalOpen(true);
    } else {
      console.error("Invalid location coordinates");
    }
  };
  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleShowInfo = (customer) => {
    setSelectedCustomer(customer);
    setIsInfoModalOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedCustomer(null);
  };
  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    if (selectedCustomer) {
      const response = await deleteCustomer(selectedCustomer._id);
      if (response.status) {
        fetchCustomers();
        closeDeleteModal();
      }
    }
  };

  return (
    <>
      {/* <div className="d-flex justify-content-end align-items-center">
                <button onClick={toggleThemeMode} className="btn btn-dark">
                    Toggle {themeMode === "light" ? "Dark" : "Light"} Mode
                </button>
            </div> */}
      <div className="d-flex justify-content-between align-items-center nav-bar pb-3">
        <div className="navbar">
          <div className="navbar-options d-flex">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search customers"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0">
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
        <div>
          <Link to="/add-customer-admin">
            <button
              className="btn text-white flex items-center"
              style={{ background: "#D65246" }}
            >
              <img src={add} className="pe-2" alt="Add" />
              Add Customer
            </button>
          </Link>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="d-flex align-items-center">
          <button
            className="btn text-white px-4"
            style={{ background: "#253A71" }}
            onClick={() => fetchCustomersByStatus(true)}
          >
            Admin Customer
          </button>
        </div>
        <div className="d-flex align-items-center">
          <button
            className="btn text-white px-4"
            style={{ background: "#253A71" }}
            onClick={() => fetchCustomersByStatus(false)}
          >
            Merchant Customer
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
              <th className="p-3">Customer ID</th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Address</th>
              <th className="p-3">Email</th>
              <th className="p-3">Country</th>
              <th className="p-3">City</th>
              <th className="p-3">Postcode</th>
              <th className="p-3">Merchant Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="text-center p-3">
                  <div className="d-flex justify-content-center">
                    <div className="mx-auto">
                      <Loader />
                    </div>
                  </div>
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center p-3">
                  <div className="d-flex justify-content-center">
                    <div className="mx-auto">No Data Found</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer, index) => (
                <tr key={index}>
                  <td className="p-3 text-primary">
                    {customer?.showCustomerNumber ?? "-"}
                  </td>
                  <td className="p-3">{customer.firstName}</td>
                  <td className="p-3">{customer.lastName}</td>
                  <td className="p-3">{customer.address}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.country}</td>
                  <td className="p-3">{customer.city}</td>
                  <td className="p-3">{customer.postCode}</td>
                  <td className="p-3">{customer?.merchant ?? "-"}</td>
                  <td className="table-head2">
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="show-btn m-2"
                        onClick={() => handleShowInfo(customer)}
                      >
                        <img src={show} className="mx-auto" alt="Show" />
                      </button>
                      <button
                        className="edit-btn ms-1"
                        onClick={() => handleEditClick(customer)}
                      >
                        <img src={edit} alt="Edit" className="mx-auto" />
                      </button>
                      <button
                        className="delete-btn ms-1 me-1"
                        onClick={() => handleDeleteClick(customer)}
                      >
                        <img src={deleteimg} alt="Delete" className="mx-auto" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Customer Info Modal */}
      {isInfoModalOpen && selectedCustomer && (
        <CutomerInfoModal
          customer={selectedCustomer}
          onHide={() => setIsInfoModalOpen(false)} // Close the modal on hide
        />
      )}
      {showEditModal && (
        <EditCustomer customer={selectedCustomer} onHide={closeEditModal} />
      )}
      {showDeleteModal && (
        <DeleteModal
          onDelete={confirmDelete}
          onHide={closeDeleteModal}
          text="Customer"
        />
      )}
    </>
  );
};

export default Customers;
