import React, { useEffect, useState } from "react";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_admin/search.png";
import Pagination from "../../Components_admin/Pagination/Pagination";
import CountryInfoModal from "./CountryInfoModal";
import DeleteModal from "../../Components_admin/DeleteModal";
import UpdateCountryModal from "./UpdateCountryModal";
import { deleteCountry } from "../../Components_admin/Api/Country";
import Loader from "../../Components_admin/Loader/Loader";

const Country = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const accessToken = localStorage.getItem('accessTokenForAdmin');

  useEffect(() => {
    fetchCountries();
  }, [currentPage, searchTerm]);

  const fetchCountries = async () => {
    try {
      const searchParam = searchTerm ? `&searchValue=${searchTerm}` : '';
      const response = await fetch(
        `https://create-4.onrender.com/admin/country?pageCount=${currentPage}&pageLimit=${itemsPerPage}${searchParam}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
          },
        }
      );
      const data = await response.json();

    
      if (data.status === "SUCCESS") {
        setCountries(data.data.data);
        setTotalPages(Math.ceil(data.data.totalDataCount / itemsPerPage));
      } else {
        console.error("API error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const filteredCountries = countries.filter((country) => {
    const query = searchTerm.toLowerCase();
    return (
      country?.countryName?.toLowerCase()?.includes(query) ||
      country?.distanceType?.toLowerCase()?.includes(query) ||
      country?.weightType?.toLowerCase()?.includes(query)
    );
  });

  const handleDelete = async() => {

    const res = await deleteCountry(selectedCountry.countryId);

    setIsDeleteModalOpen(false);
    fetchCountries()
  };

  return (
    <>
      <div className="w-100">
        <div className="d-flex justify-content-between py-3">
          <Link to="/add-country">
            <button className="btn text-light" style={{ background: "#D65246" }}>
              <img src={add} alt="Add" />
              Add Country
            </button>
          </Link>
        </div>

        <div className="search-container mb-3">
          <input
            type="search"
            className="search-btn rounded-start-4 p-3"
            placeholder="Search country"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-img rounded-end-4 border-0">
            <img src={searchIcon} className="search" alt="search icon" />
          </button>
        </div>

        <div className="table-responsive">
          <table
            className="table-borderless w-100 text-center bg-light"
            style={{ fontSize: "10px" }}
          >
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-4 text-light">Country</th>
                <th className="p-4 text-light">Distance Type</th>
                <th className="p-4 text-light">Weight Type</th>
                <th className="p-4 text-light">Created Date</th>
                <th className="p-4 text-light">Status</th>
                <th className="p-4 text-light">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCountries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-3">
                  <div className="d-flex justify-content-center">
                      <div className="mx-auto">
                      <Loader />
                      No Data Found
                      </div>
                     </div>
                  </td>
                </tr>
              ) : (
                filteredCountries.map((country) => (
                  <tr key={country.countryId} className="text-black">
                    <td className="text-black p-3">{country.countryName || "-"}</td>
                    <td className="p-3">{country.distanceType}</td>
                    <td className="p-3">{country.weightType}</td>
                    <td className="p-3">
                      {new Date(country.createdDate).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        className="enable-btn border-0 text-light rounded-1"
                        style={{ background: "#976CDD", fontSize: "10px" }}
                      >
                        {country.isActive ? "Enable" : "Disable"}
                      </button>
                    </td>
                    <td className="p-2">
                      <div className="d-flex align-items-center justify-content-lg-center">
                        <button className="edit-btn m-2" onClick={() => {
                            setSelectedCountry(country); 
                            setIsUpdateModalOpen(true);
                          }}>
                          <img src={edit} alt="Edit" />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            setSelectedCountry(country); 
                            setIsDeleteModalOpen(true);
                            // Set the selected country for deletion
                          }}
                        >
                          <img src={deleteimg} alt="Delete" />
                        </button>
                        <button
                          className="show-btn m-2"
                          onClick={() => {
                            setSelectedCountry(country); 
                            setIsInfoModalOpen(true);
                          }}
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

        <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />

        {/* Info Modal */}
        {isInfoModalOpen && (
          <CountryInfoModal
            country={selectedCountry}
            onHide={() => setIsInfoModalOpen(false)}
          />
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <DeleteModal
            onDelete={handleDelete}
            onHide={() => setIsDeleteModalOpen(false)}
            text='Country'
          />
        )}

        {isUpdateModalOpen && (
          <UpdateCountryModal
            country={selectedCountry}
            onHide={() => setIsUpdateModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Country;
