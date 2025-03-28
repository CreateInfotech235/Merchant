import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_mercchant/search.png";
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import locationimg from "../../assets_mercchant/locationimg.png";
import show from "../../assets_mercchant/show.png";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// import { getAllCustomers } from "../../Components_merchant/Api/Customer";
import { getAllCustomers } from "../../Components_admin/Api/Admincustomer";
import Loader from "../../Components_admin/Loader/Loader";
import { Pagination, Stack } from "@mui/material";
import { getAllUsers } from "../../Components_admin/Api/User";
// import Tooltip from "../Tooltip/Tooltip";
import Select from 'react-select';

const markerIcon = new L.Icon({
  iconUrl: locationimg,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Customers = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [showModel, setShowModel] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [costumerId, setCostumerId] = useState(null);
  const [merchantId, setMerchantId] = useState(null);
  const [merchantdata, setMerchantdata] = useState([]);
  const [merchantloading, setMerchantloading] = useState(true);
  const [fulldata, setFulldata] = useState([]);
  const [isTrashed, setIsTrashed] = useState(false);
  const [showMerchantModal, setShowMerchantModal] = useState(true);
  console.log(merchantdata, "merchantdata");

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


  const fetchCustomers = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCustomers(id ? id : merchantId);
      if (response.status && response.data && response.data.length > 0) {
        setFulldata(response.data);
        handleToggleTrashed(response.data);
      } else {
        setAllCustomers([]);
        setCustomers([]);
        setFilteredCustomers([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customers. Please try again later.");
      setAllCustomers([]);
      setCustomers([]);
      setFilteredCustomers([]);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTrashed = (data = fulldata) => {
    if (!data || data.length === 0) {
      return;
    }

    const nonTrashedCustomers = data.filter(customer => isTrashed ? customer.trashed : !customer.trashed);
    setAllCustomers(nonTrashedCustomers);

    const startIndex = 0;
    const endIndex = itemsPerPage;
    const initialData = nonTrashedCustomers.slice(startIndex, endIndex);

    setCustomers(initialData);
    setFilteredCustomers(initialData);
    setTotalPages(Math.ceil(nonTrashedCustomers.length / itemsPerPage) || 1);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (costumerId) {
      fetchCustomers();
    } else {
      setLoading(false);
    }
  }, [costumerId]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCustomers = allCustomers.slice(startIndex, endIndex);
    setCustomers(paginatedCustomers);

    // Apply search filter to paginated data
    if (searchQuery) {
      filterCustomers(paginatedCustomers);
    } else {
      setFilteredCustomers(paginatedCustomers);
    }
    setTotalPages(Math.ceil(allCustomers.length / itemsPerPage));
  }, [itemsPerPage, allCustomers, currentPage]);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  function filterCustomers(customersToFilter = customers) {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setFilteredCustomers(allCustomers.slice(startIndex, endIndex));
      return;
    }

    const data = allCustomers.filter((customer) => {
      return (
        (
          customer.firstName?.toLowerCase().includes(query) ||
          customer.lastName?.toLowerCase().includes(query) ||
          customer.email?.toLowerCase().includes(query) ||
          customer.NHS_Number?.toLowerCase().includes(query) ||
          customer.address?.toLowerCase().includes(query) ||
          customer.postCode?.toLowerCase().includes(query) ||
          customer.showCustomerNumber?.toString().includes(query))
      );
    });

    setTotalPages(Math.ceil(data.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const sortedData = data.sort((a, b) => {
      const aMatch = a.showCustomerNumber.toString() === query;
      const bMatch = b.showCustomerNumber.toString() === query;
      return bMatch - aMatch;
    });

    setFilteredCustomers(sortedData.slice(startIndex, endIndex));
  }

  useEffect(() => {
    if (searchQuery) {
      filterCustomers();
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setFilteredCustomers(allCustomers.slice(startIndex, endIndex));
    }
  }, [searchQuery]);

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
    // setShowModel(true);
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

  const handleClick = (event, page) => {
    console.log("handleClick", page);
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchMerchantData = async () => {
      console.log("fetchMerchantData");
      try {
        const response = await getAllUsers();
        console.log("response", response);
        if (response.status) {
          setMerchantdata(response.data);
          setMerchantloading(false);
        }
      } catch (error) {
        console.error("Error fetching merchant data:", error);
        setMerchantloading(false);
      }
    };
    fetchMerchantData();
  }, []);

  useEffect(() => {
    console.log("isTrashed", isTrashed);
    if (fulldata.length > 0) {
      handleToggleTrashed();
    }
  }, [isTrashed]);

  useEffect(() => {
    if (merchantId) {
      fetchCustomers(merchantId);
    }
  }, [merchantId]);

  return (
    <>
      {showMerchantModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowMerchantModal(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Merchant</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowMerchantModal(false)}
                  ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Please select a merchant to continue:</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isLoading={merchantloading}
                    isSearchable={true}
                    name="merchant"
                    options={merchantdata.map((item) => ({
                      value: item._id,
                      label: item.firstName + " " + item.lastName + " (" + item?.email + ")"
                    }))}
                    onChange={(e) => {
                      setMerchantId(e.value);
                      setShowMerchantModal(false);
                      fetchCustomers(e.value);
                    }}
                    placeholder="Select merchant ..."
                  />
                </div>
              </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowMerchantModal(false)}
                  >
                    Close
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center nav-bar pb-3">
        <div className="flex justify-center items-center">
          <div>
            <label htmlFor="merchantSelect" className="p-0">Select Merchant:</label>
            <Select
              className={`basic-single w-[500px]`}
              classNamePrefix="select"
              id="merchantSelect"
              isLoading={merchantloading}
              isSearchable={true}
              value={merchantId ? { value: merchantId, label: merchantdata.find(item => item._id === merchantId).firstName + " " + merchantdata.find(item => item._id === merchantId).lastName } : null}
              name="color"
              options={merchantdata.map((item) => ({
                value: item._id,
                label: item.firstName + " " + item.lastName + " (" + item?.email + ")"
              }))}
              onChange={(e) => {
                setMerchantId(e.value);
              }}
              isDisabled={loading}
              placeholder="Select merchant ..."
            />
          </div>

        </div>
        <div className="flex justify-center items-center">
          <select
            className="form-select mt-4"
            value={isTrashed ? "deleted" : "active"}
            onChange={(e) => {
              const value = e.target.value;
              setIsTrashed(value === "deleted");
            }}
            disabled={loading}
          >
            <option value="active">customers</option>
            <option value="deleted">deleted customers</option>
          </select>
        </div>

        <div className="navbar">
          <div className="navbar-options d-flex items-center">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search customers"
              value={searchQuery}
              onChange={(e) => {
                if (e.target.value.trim().length > 0) {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                } else {
                  setSearchQuery("");
                  setCurrentPage(1);
                }
              }}
            />
            <button className="search-img rounded-end-4 border-0 flex justify-center items-center" >
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        {loading ? (
          <table
            className="table-borderless w-100 text-center bg-light"
            style={{ fontSize: "12px" }}
          >
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3">Customer ID</th>
                <th className="p-3">NHS Number</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Address</th>
                {/* <th className="p-3">Postcode</th> */}
                <th className="p-3">Email</th>

                {/* <th className="p-3">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="text-center p-3">
                  <div className="d-flex justify-content-center">
                    <div className="mx-auto">
                      <Loader />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : error ? (
          <div className="text-center text-danger p-3">
            {error}
            <button
              className="btn btn-link"
              onClick={() => {
                setError(null);
                fetchCustomers();
              }}
            >
              Retry
            </button>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <table
            className="table-borderless w-100 text-center bg-light"
            style={{ fontSize: "12px" }}
          >
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3">Customer ID</th>
                <th className="p-3">NHS Number</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Address</th>
                {/* <th className="p-3">Postcode</th> */}
                <th className="p-3">Email</th>
                {/* <th className="p-3">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="text-center p-3">
                  <div className="d-flex justify-content-center">
                    {merchantId ? <div className="mx-auto">No Data Found</div> : <div className="mx-auto">Need merchant selected for get data</div>}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <>
            <table
              className="table-borderless w-100 text-center bg-light"
              style={{ fontSize: "12px" }}
            >
              <thead className="text-light" style={{ background: "#253A71" }}>
                <tr>
                  <th className="p-3">Customer ID</th>
                  <th className="p-3">NHS Number</th>
                  <th className="p-3">First Name</th>
                  <th className="p-3">Last Name</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Mobile Number</th>
                  {/* <th className="p-3">Postcode</th> */}
                  <th className="p-3">Email</th>
                  {/* <th className="p-3">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-100 border-1 border-gray-200" onClick={(e) => {
                    const selection = window.getSelection();
                    if (!selection.toString() && !e.target.closest('button') && !e.target.closest('input')) {
                      handleShowInfo(customer)
                    }
                  }}>
                    <td className="p-3">{customer.showCustomerNumber}</td>
                    <td className="p-3">{customer.NHS_Number}</td>
                    <td className="p-3">{customer.firstName}</td>
                    <td className="p-3">{customer.lastName}</td>
                    <td className="p-3">{`${customer.address} ${customer.city} ${customer.country.trim().replace(customer.postCode, "")}`.replace("-", "").trim() + "(" + customer.postCode + ")"}</td>
                    <td className="p-3">{customer.mobileNumber}</td>
                    <td className="p-3">{customer.email || "-"}</td>
                    {/* <td className="table-head2">
                        <div className="d-flex align-items-center justify-content-center">
                          <Tooltip text="Edit Customer">

                            <button
                              className="edit-btn ms-1"
                              onClick={() => handleEditClick(customer)}
                            >
                              <img src={edit} alt="Edit" className="mx-auto" />
                            </button>
                          </Tooltip>

                          <Tooltip text="Delete Customer">
                            <button
                              className="delete-btn me-1"
                              onClick={() => {
                                setShowDelete(true)
                                hadleDeleteCustomer(customer._id)
                              }}
                            >
                              <img
                                src={deleteimg}
                                alt="Delete"
                                className="mx-auto"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip text="Show Customer" transform="translateX(-100%)">

                            <button
                              className="show-btn m-2"
                              onClick={() => handleShowInfo(customer)}
                            >
                              <img src={show} alt="Show" className="mx-auto" />
                            </button>
                          </Tooltip>
                        </div>
                      </td> */}
                  </tr>
                )
                )}
              </tbody>
            </table>

            <div className={`justify-content-end align-items-end ${filteredCustomers.length == 0 ? "d-none" : "d-flex"}`}>
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handleClick}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>

              <select
                className="form-select w-20 ms-3"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
            </div>
          </>
        )}
      </div>

    </>
  );
};

export default Customers;
