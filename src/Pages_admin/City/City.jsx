import React, { useEffect, useState } from "react";
import "./City.css";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import CityPopup from "../../Components_admin/CityPopup/CityPopup";
import searchIcon from "../../assets_admin/search.png";
import { deleteCity, getAllCity } from "../../Components_admin/Api/City";
import { formatDateTime } from "../../helper_admin/common";
import Pagination from "../../Components_admin/Pagination/Pagination";
import DeleteModal from "../../Components_admin/DeleteModal";
import UpdateCityModal from "./UpdateCityModal";

const City = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 10;
  const [selectedCity, setSelectedCity] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [themeMode, setThemeMode] = useState("light");
  const [cities, setCities] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

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

  // Filter cities based on search query
  const filteredCities = cities.filter((city) =>{
    const data = city.cityName?.toLowerCase().includes(searchQuery.toLowerCase())
    return data
  }

  );

  // Pagination logic
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity);

  const fetchCities = async () => {
    const response = await getAllCity(currentPage, citiesPerPage);
    if (response.status) {
      setCities(response.data.data);
      setTotalPages(Math.ceil(response.data.totalDataCount / citiesPerPage));
    }
  };

  useEffect(() => {
    fetchCities();
  }, [currentPage]);

  // Handle pagination click
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleEditCity = (city) => {
    setSelectedCity(city);
    setIsUpdateModalOpen(true);
  };

  const handleShowInfo = (city) => {
    setSelectedCity(city);
    setIsInfoModalOpen(true);
  };

  const handleDelete = async() => {

    const res = await deleteCity(selectedCity.cityId);

    setIsDeleteModalOpen(false);
    fetchCities()
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when search changes
  };

  console.log(cities)
  return (
    <>
      <div className="d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between d-lg-flex justify-content-lg-between d-md-flex justify-content-md-between d-sm-flex justify-content-sm-center d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-column align-items-center nav-bar pb-3">
        <div className={`navbar ${themeMode === "dark" ? "dark-mode" : ""}`}>
          <div className="navbar-options d-flex my-2 col-12">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search city"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0">
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
        <div>
          <Link to="/add-city">
            <button className="btn text-white" style={{ background: "#D65246" }}>
              <img src={add} className="pe-2" alt="Add" />
              Add City
            </button>
          </Link>
        </div>
      </div>

      <div className="w-100">
        <div className="table-responsive">
          <table className="table-borderless w-100 text-center bg-light" style={{ fontSize: "10px" }}>
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3"></th>
                <th className="p-3">City ID</th>
                <th className="p-3">City Name</th>
                <th className="p-3">Country Name</th>
                <th className="p-3">Minimum Distance</th>
                <th className="p-3">Minimum Weight</th>
                <th className="p-3">Fixed Charge</th>
                <th className="p-3">Cancel Charge</th>
                <th className="p-3">Per Distance Charge</th>
                <th className="p-3">Per Weight Charge</th>
                <th className="p-3">Admin Commission</th>
                <th className="p-3">Currency</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                currentCities.length === 0 ? (
                <tr>
                  <td colSpan="15" className="text-center p-3">
                    No data found
                  </td>
                </tr>
              ) : (currentCities.map((city, index) => (
                <tr key={index}>
                  <td className="table-head2">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{city.cityId}</td>
                  <td className="p-3">{city.cityName}</td>
                  <td className="p-3">{city.countryName || "-"}</td>
                  <td className="p-3">{city.minimumDistance || 0}</td>
                  <td className="p-3">{city.minimumWeight || 0}</td>
                  <td className="p-3">{city.fixedCharge || "-"}</td>
                  <td className="p-3">{city.cancelCharge || 0}</td>
                  <td className="p-3">{city.perDistanceCharge || 0}</td>
                  <td className="p-3">{city.perWeightCharge || 0}</td>
                  <td className="p-3">{city.adminCommission || 0}</td>
                  <td className="p-3 fw-bold fs-6">{city.currency || "$"}</td>
                  <td className="p-3">{formatDateTime(city.createdDate)}</td>
                  <td className="table-head2">
                    <button className="enable-btn">{city.isActive ? 'Active' : 'Block'}</button>
                  </td>
                  <td className="table-head2">
                    <div className="d-flex align-items-center justify-content-lg-center">
                      <button className="edit-btn m-2" onClick={() => handleEditCity(city)}>
                        <img src={edit} alt="Edit" />
                      </button>
                      <button className="delete-btn" onClick={() => {
                        setSelectedCity(city)
                        setIsDeleteModalOpen(true)}}>
                        <img src={deleteimg} alt="Delete" />
                      </button>
                      <button className="show-btn m-2" onClick={() => handleShowInfo(city)}>
                        <img src={show} alt="Show" />
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
              
            </tbody>
          </table>
        </div>

        {/* Info Modal */}
        {isInfoModalOpen && (
          <CityPopup
            city={selectedCity}
            onHide={() => setIsInfoModalOpen(false)}
          />
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <DeleteModal
            onDelete={handleDelete}
            onHide={() => setIsDeleteModalOpen(false)}
            text='city'
          />
        )}

        {isUpdateModalOpen && (
          <UpdateCityModal
            city={selectedCity}
            onHide={() => setIsUpdateModalOpen(false)}
          />
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
      </div>
    </>
  );
};

export default City;
