import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_mercchant/search.png";
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import locationimg from "../../assets_mercchant/locationimg.png";
import show from "../../assets_mercchant/show.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getAllCustomers } from "../../Components_merchant/Api/Customer";
import CutomerInfoModal from "./CustomerInfoModal";
import DeleteModal from "../../Components_merchant/DeleteUser/DeleteUser";
import UpdateCustomerModel from "./UpdateCustomerModel";
import Loader from "../../Components_admin/Loader/Loader";

// Custom marker icon for leaflet
const markerIcon = new L.Icon({
  iconUrl: locationimg,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track API errors
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [showModel, setShowModel] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
    setLoading(true); // Set loading to true before the API call
    try {
      const response = await getAllCustomers();
      if (response.status && response.data.length > 0) {
        setCustomers(response.data);
      } else {
        setCustomers([]); // Clear customers if no data is returned
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customers. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [showModel , showEditModal]);
  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase();
    return (
      !customer.trashed && // Skip if the customer is trashed
      (customer.customerId.toLowerCase().includes(query) ||
        customer.firstName.toLowerCase().includes(query) ||
        customer.lastName.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query))
    );
  });

  const handleLocationClick = (coordinates) => {
    if (coordinates && coordinates.length === 2) {
      setSelectedLocation(coordinates);
      setIsMapModalOpen(true);
    } else {
      console.error("Invalid location coordinates");
    }
  };

  const handleShowInfo = (customer) => {
    setSelectedCustomer(customer);
    setIsInfoModalOpen(true);
  };

  const hadleDeleteCustomer = (id) => {
    setShowModel(true);
    setCustomerId(id);
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedCustomer(null);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center nav-bar pb-3">
        <div className="navbar">
          <div className="navbar-options d-flex items-center">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search customers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-img rounded-end-4 border-0 flex justify-center items-center">
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
        <div>
          <Link to="/add-customer">
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

      <div className="table-responsive">
        {error ? (
          <div className="text-center text-danger p-3">{error}</div>
        ) : (
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
                <th className="p-3">Postcode</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">
                        <Loader />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">No Data Found</div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, index) =>
                  customer.trashed === false ? (
                    <tr key={index}>
                      <td className="p-3">{customer.showCustomerNumber}</td>
                      <td className="p-3">{customer.firstName}</td>
                      <td className="p-3">{customer.lastName}</td>
                      <td className="p-3">{customer.address}</td>
                      <td className="p-3">{customer.email}</td>
                      <td className="p-3">{customer.postCode}</td>
                      <td className="table-head2">
                        <div className="d-flex align-items-center justify-content-center">
                          <button
                            className="edit-btn ms-1"
                            onClick={() => handleEditClick(customer)}
                          >
                            <img src={edit} alt="Edit" className="mx-auto" />
                          </button>
                          <button
                            className="delete-btn me-1"
                            onClick={() => hadleDeleteCustomer(customer._id)}
                          >
                            <img
                              src={deleteimg}
                              alt="Delete"
                              className="mx-auto"
                            />
                          </button>
                          <button
                            className="show-btn m-2"
                            onClick={() => handleShowInfo(customer)}
                          >
                            <img src={show} alt="Show" className="mx-auto" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : null
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {isMapModalOpen && selectedLocation && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setIsMapModalOpen(false)}>Close</button>
            <MapContainer
              center={selectedLocation}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={selectedLocation} icon={markerIcon}>
                <Popup>Customer location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

      {showModel && (
        <DeleteModal
          text="Customer"
          Id={customerId}
          onDelete={() => hadleDeleteCustomer()}
          onHide={() => setShowModel(false)}
        />
      )}

      {showEditModal && (
        <UpdateCustomerModel
          customer={selectedCustomer}
          onHide={closeEditModal}
        />
      )}

      {isInfoModalOpen && selectedCustomer && (
        <CutomerInfoModal
          customer={selectedCustomer}
          onHide={() => setIsInfoModalOpen(false)}
        />
      )}
    </>
  );
};

export default Customers;
