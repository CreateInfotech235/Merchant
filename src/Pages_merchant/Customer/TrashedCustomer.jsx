import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_mercchant/search.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import { getAllCustomers } from "../../Components_merchant/Api/Customer";
import ConformDeleteModel from "../ConformDeleteModel/ConformDeleteModel";
import Loader from "../../Components_admin/Loader/Loader";
import { Pagination, Stack } from "@mui/material";
import Tooltip from "../Tooltip/Tooltip";
import { FaUndo } from "react-icons/fa";

const TrashedCustomer = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [undo, setUndo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await getAllCustomers();
      if (response.status && response.data.length > 0) {
        const trashedData = response.data.filter(data => data.trashed === true);
        setAllCustomers(trashedData);
        const initialData = trashedData.slice(0, itemsPerPage);
        setCustomers(initialData);
        setFilteredCustomers(initialData);
        setTotalPages(Math.ceil(trashedData.length / itemsPerPage));
      } else {
        setAllCustomers([]);
        setCustomers([]);
        setFilteredCustomers([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCustomers = allCustomers.slice(startIndex, endIndex);
    setCustomers(paginatedCustomers);

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
    const query = searchQuery.toLowerCase();
    const data = allCustomers.filter((customer) => {
      return (
        customer.customerId?.toLowerCase().includes(query) ||
        customer.firstName?.toLowerCase().includes(query) ||
        customer.lastName?.toLowerCase().includes(query) ||
        customer.email?.toLowerCase().includes(query) ||
        customer.NHS_Number?.toLowerCase().includes(query) ||
        customer.address?.toLowerCase().includes(query) ||
        customer.postCode?.toLowerCase().includes(query) ||
        customer.showCustomerNumber?.toString().includes(query)
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

  const handleClick = (event, page) => {
    setCurrentPage(page);
  };

  const hadleDeleteOrder = (id,undo,showDelete) => {
    setCustomerId(id);
    setUndo(undo);
    setShowDelete(showDelete);
    setShowModel(true);
  };

  const handleCloseModal = () => {
    setShowModel(false);
    setCustomerId(null);
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button className="search-img rounded-end-4 border-0 flex justify-center items-center" onClick={() => fetchCustomers()}>
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        {error ? (
          <div className="text-center text-danger p-3">{error}</div>
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
                  <th className="p-3">Postcode</th>
                  <th className="p-3">Email</th>
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
                  filteredCustomers.map((customer, index) => (
                    <tr key={index}>
                      <td className="p-3">{customer.showCustomerNumber}</td>
                      <td className="p-3">{customer.NHS_Number}</td>
                      <td className="p-3">{customer.firstName}</td>
                      <td className="p-3">{customer.lastName}</td>
                      <td className="p-3">{customer.address}</td>
                      <td className="p-3">{customer.postCode}</td>
                      <td className="p-3">{customer.email}</td>
                      <td className="table-head2">
                        <div className="d-flex align-items-center justify-content-center">
                          <Tooltip text="Undo Customer">
                            <button
                              className="delete-btn me-1"
                              onClick={() =>{ 
                                hadleDeleteOrder(customer._id,true,false)
                              }}
                            >
                              <FaUndo
                                alt="undo"
                                className="mx-auto"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip text="Delete Customer" transform="translateX(-80%)">
                            <button
                              className="delete-btn me-1"
                              onClick={() =>{ 
                                hadleDeleteOrder(customer._id,false,true)
                              }}
                            >
                              <img src={deleteimg} alt="Delete" className="mx-auto" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
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
        {showModel  && (
        <ConformDeleteModel
          text="Customer"
          Id={customerId}
          onDelete={async () => {
            setUndo(false)
            setShowDelete(false)
            setShowModel(false)
            await fetchCustomers()
          }}
          onHide={() => {
            setUndo(false)
            setShowDelete(false)
            setShowModel(false)
          }}
          undo={undo}
          showDelete={showDelete}
        />
      )}
    </>
  );
};

export default TrashedCustomer;
