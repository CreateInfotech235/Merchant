import React, { useState, useEffect } from "react";
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";
import { Link } from "react-router-dom";
import vehicle1 from "../../assets_mercchant/vehicle1.png";
import searchIcon from "../../assets_mercchant/search.png";
import PickupPopup from "../UpdateVehicle/PickupPopup";
import {deleteVehicle} from "../../Components_merchant/Api/Vehicle"
import Pagination from "../../Components_merchant/Pagination/Pagination";
import DeleteModal from "../../Components_merchant/DeleteUser/DeleteUser";
import UpdateVehicleModal from "../UpdateVehicle/UpdateVehicle";

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [showPickUpModel, setPickUpModel] = useState(false);

  const handleDelete = async () => {
    const res = await deleteVehicle(selectedVehicle.vehicleId);
    setShowDeleteModel(false);
    fetchVehicles();
  };

  const closePickUpModel = () => setPickUpModel(false);

  const fetchVehicles = async () => {
    const response = await getAllVehicles(currentPage, vehiclesPerPage, searchQuery);
    if (response.status) {
      setVehicles(response.data[0].data);
      setTotalPages(Math.ceil(response.data[0].totalDataCount / vehiclesPerPage));
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [currentPage, searchQuery]);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when search changes
  };

  const handleShowPickupPopup = (vehicle) => {
    setSelectedVehicle(vehicle);
    setPickUpModel(true);
  };

  const VehicleImage = (url) => {
    return (
      <img
        src={`https://create-4.onrender.com/public/${url}`}
        onError={(e) => {
          e.target.src = vehicle1;
        }}
        alt="document"
      />
    );
  };

  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) || vehicle.vehicleSize.toString().includes(searchQuery) || vehicle.vehicleCapacity.toString().includes(searchQuery)
  );

  return (
    <>
      <div className="fluid-container">
        <div className="d-flex justify-content-between mb-3">
          <Link to="/add-vehicle">
            <button type="button" className="btn border-0 text-white" style={{ background: "#D65246" }}>
              <img src={add} alt="Add" />
              Add Vehicle
            </button>
          </Link>
        </div>

        {/* Search bar */}
        <div className="navbar-options d-flex my-2 col-12">
          <input
            type="search"
            className="search-btn rounded-start-4 p-3"
            placeholder="Search vehicle"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-img rounded-end-4 border-0">
            <img src={searchIcon} className="search" alt="search icon" />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table-borderless w-100 text-center bg-light rounded-2">
            <thead className="text-light rounded-2" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Vehicle ID</th>
                <th className="p-4">Vehicle Image</th>
                <th className="p-4">Vehicle Name</th>
                <th className="p-4">Vehicle Size</th>
                <th className="p-4">Vehicle Capacity</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-3">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">{vehicle.vehicleId}</td>
                    <td className="user-table1">
                      {VehicleImage(vehicle.vehicleImage)}
                    </td>
                    <td className="p-3">{vehicle.vehicleName}</td>
                    <td className="p-3">{vehicle.vehicleSize}</td>
                    <td className="p-3">{vehicle.vehicleCapacity}</td>
                    <td className="p-3">
                      <button className="enable-btn" onClick={() => {
                        setShowDeleteModel(true);
                        setSelectedVehicle(vehicle);
                      }}>
                        {vehicle.status}
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="edit-btn me-2" onClick={() => {
                          setShowUpdateModel(true);
                          setSelectedVehicle(vehicle);
                        }}>
                          <img src={edit} alt="Edit" />
                        </button>
                        <button className="delete-btn" onClick={() => {
                          setShowDeleteModel(true);
                          setSelectedVehicle(vehicle);
                        }}>
                          <img src={deleteimg} alt="Delete" />
                        </button>
                        <button className="show-btn ms-2" onClick={() => handleShowPickupPopup(vehicle)}>
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

        {/* Pickup Popup */}
        {showPickUpModel && (
          <PickupPopup
            vehicle={selectedVehicle}
            onHide={closePickUpModel}
          />
        )}

        {showDeleteModel && <DeleteModal
          onDelete={handleDelete}
          onHide={() => setShowDeleteModel(false)}
          text='Vehicle'
        />}

        {showUpdateModel && <UpdateVehicleModal
          onUpdate={fetchVehicles}
          handleClose={() => setShowUpdateModel(false)}
          vehicleData={selectedVehicle}
        />}

        {/* Pagination Component */}
        <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
      </div>
    </>
  );
};

export default Vehicle;
