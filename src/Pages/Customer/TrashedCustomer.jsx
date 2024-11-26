
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/search.png";
import add from "../../assets/add.png";
import edit from "../../assets/edit.png";
import deleteimg from "../../assets/deleteimg.png";
import locationimg from "../../assets/locationimg.png";
import show from "../../assets/show.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getAllCustomers } from "../../Components/Api/Customer";
import CutomerInfoModal from "./CustomerInfoModal";
import DeleteModal from "../../Components/DeleteUser/DeleteUser";
import ConformDeleteModel from "../ConformDeleteModel/ConformDeleteModel";
// Custom marker icon for leaflet
const markerIcon = new L.Icon({
  iconUrl: locationimg,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const TrashedCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [showModel, setShowModel] = useState(false);
  const [customerId, setCustomerId] = useState(null);
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
    const response = await getAllCustomers();

    if (response.status) {
        const trashedData = await response.data.filter(data => data.trashed === true)
      setCustomers(trashedData);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [showModel]);

  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase();
    return (
      customer.firstName.toLowerCase().includes(query) ||
      customer.lastName.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const hadleDeleteOrder = (id) => {
    setShowModel(true);
    setCustomerId(id);
    console.log(id);
  };
  const handleCloseModal = () => {
    setShowModel(false)
    setCustomerId(null)
  }

  return (
    <>
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
              <th className="p-3">Postcode</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-3">
                  No data found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer, index) => (
                <tr key={index}>
                  <td className="p-3">{customer.customerId}</td>
                  <td className="p-3">{customer.firstName}</td>
                  <td className="p-3">{customer.lastName}</td>
                  <td className="p-3">{customer.address}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.postCode}</td>
                  <td className="table-head2">
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleLocationClick([
                            customer.location?.coordinates[0],
                            customer.location?.coordinates[1],
                          ])
                        }
                      >
                        <img src={locationimg} alt="Location" />
                      </button>
                      <button className="delete-btn me-1" onClick={() => hadleDeleteOrder(customer._id)}>
                      <img src={deleteimg} alt="Delete" />
                    </button>
                      <button
                        className="show-btn m-2"
                        onClick={() => handleShowInfo(customer)}
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

      {showModel && <ConformDeleteModel
      text="Customer"
      Id = {customerId}
        onDelete={() => handleCloseModal()}
        onHide={() => setShowModel(false)}
      />}
      {/* Map Modal */}
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

     

      {/* Customer Info Modal */}
      {isInfoModalOpen && selectedCustomer && (
        <CutomerInfoModal
          customer={selectedCustomer}
          onHide={() => setIsInfoModalOpen(false)} // Close the modal on hide
        />
      )}
    </>
  );
};

export default TrashedCustomer;
