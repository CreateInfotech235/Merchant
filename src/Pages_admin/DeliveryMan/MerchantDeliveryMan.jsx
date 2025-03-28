import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import locationimg from "../../assets_admin/delivery-bike.png";
import searchIcon from "../../assets_admin/search.png";
import Pagination from "../../Components_admin/Pagination/Pagination";
import DeliveryManInfoModal from "./DeliveryManInfoModal";
import DeleteModal from "../../Components_admin/DeleteModal";
import {
  deleteDeliveryBoy,
  getAllDeliveryManOfMerchant,
} from "../../Components_admin/Api/DeliveryMan";
import "./DeliveryMan.css";
import Loader from "../../Components_admin/Loader/Loader";
import EditDeliveryManModal from "../EditDeliveryManModal/EditDeliveryManModal";
import MapModal from "./MapModal";
import Select from 'react-select';
import { getAllUsers } from "../../Components_admin/Api/User";
import { toast } from "react-toastify";



const MerchantDeliveryMan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deliverymen, setDeliverymen] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [filteredDeliverymen, setFilteredDeliverymen] = useState([]);
  const [merchantId, setMerchantId] = useState(null);
  const [merchantloading, setMerchantloading] = useState(false);
  const [merchantdata, setMerchantdata] = useState([]);
  const [showSelectMerchantModal, setShowSelectMerchantModal] = useState(true);





  const fetchDeliveryMen = async (id) => {
    setLoading(true);
    try {
      const res = await getAllDeliveryManOfMerchant(id ? id : merchantId);
      console.log(res, "res");

      if (res.status) {
        setDeliverymen(res.data.data);
        setTotalPages(Math.ceil(res.data.totalDataCount / itemsPerPage));
        setTotalDataCount(res.data.totalDataCount);
      }
    } catch (error) {
      console.error("Error fetching delivery men:", error);
    } finally {
      setLoading(false);
    }
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


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleClick = (event, page) => {
    if (page) {
      setCurrentPage(page);
    } else {
      setCurrentPage(Number(event.target.id));
    }
  };

  const handleEditClick = (deliveryMan) => {
    setSelectedDeliveryMan(deliveryMan);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedDeliveryMan(null);
  };

  const handleViewClick = (deliveryMan) => {
    setSelectedDeliveryMan(deliveryMan);
    setShowInfoModal(true);
  };

  const handleSearch = () => {
    const data = deliverymen.filter((deliveryman) => {
      const query = searchTerm.toLowerCase();
      return (
        (deliveryman.firstName &&
          deliveryman.firstName.toLowerCase().includes(query)) ||
        (deliveryman.lastName &&
          deliveryman.lastName.toLowerCase().includes(query)) ||
        (deliveryman.email && deliveryman.email.toLowerCase().includes(query)) ||
        (deliveryman.contactNumber &&
          deliveryman.contactNumber.toString().includes(query)) ||
        (deliveryman.country &&
          deliveryman.country.toLowerCase().includes(query)) ||
        (deliveryman.city && deliveryman.city.toLowerCase().includes(query))
      );
    });
    const totalDataCount = data.length;
    setFilteredDeliverymen(data);
    setTotalDataCount(totalDataCount);
  };

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(totalDataCount / itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalDataCount / itemsPerPage));
  }, [totalDataCount]);

  useEffect(() => {
    handleSearch();
  }, [deliverymen]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    handleSearch();
  }, [deliverymen]);

  useEffect(() => {
    if (!merchantId) {
      setShowSelectMerchantModal(true);
    }
  }, []);

  useEffect(() => {
    fetchDeliveryMen();
  }, [merchantId]);

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedDeliveryMan(null);
  };

  const handleDeleteClick = (deliveryMan) => {
    setSelectedDeliveryMan(deliveryMan);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedDeliveryMan) {
      const response = await deleteDeliveryBoy(selectedDeliveryMan._id);
      if (response.status) {
        fetchDeliveryMen();
      }
      closeDeleteModal();
    }
  };
  const statusColors = {
    ENABLE: "purple",
    DISABLE: "red",
  };

  const handleLocationClick = (coordinates) => {
    console.log("Coordinates:", coordinates);
    if (
      coordinates &&
      coordinates[0] !== undefined &&
      coordinates[1] !== undefined
    ) {
      setLocation(coordinates);
      setShowMapModal(true);
    } else {
      alert("No coordinates found");
    }
  };

  const getColorClass = (status) =>
    `enable-btn ${statusColors[status]?.toLowerCase() || "default"}`;

  const handleMerchantSelect = (selectedOption) => {
    setMerchantId(selectedOption.value);
    setShowSelectMerchantModal(false);
    fetchDeliveryMen();
  };

  return (
    <>
      {showSelectMerchantModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSelectMerchantModal(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select Merchant</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer px-2"
                onClick={() => setShowSelectMerchantModal(false)}
              >
                ×
              </button>
            </div>
            <Select
              className="basic-single w-full"
              classNamePrefix="select"
              isLoading={loading}
              isSearchable={true}
              defaultValue={merchantdata.length > 0 ? {
                value: merchantdata[0]._id,
                label: merchantdata[0].firstName + " " + merchantdata[0].lastName
              } : null}
              options={merchantdata.map((item) => ({
                value: item._id,
                label: item.firstName + " " + item.lastName + " (" + item?.email + ")"
              }))}
              onChange={(e) => {
                setMerchantId(e.value);
                setShowSelectMerchantModal(false);
                fetchDeliveryMen(e.value);
              }}
              isDisabled={loading}
              placeholder="Select merchant ..."
            />
            {/* <div className="mt-4 flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (merchantId) {
                    setShowSelectMerchantModal(false);
                    fetchDeliveryMen();
                  } else {
                    toast.error("Please select a merchant first!", {
                      position: "top-center",
                      autoClose: 3000,
                    });
                  }
                }}
              >
                Continue
              </button>
            </div> */}
          </div>
        </div>
      )}

      <div className="w-100">
        <div className="d-flex justify-between items-center py-3 ">
          <div>
            <label htmlFor="merchantSelect" className="p-0">Select Merchant:</label>
            <Select
              className={`basic-single w-[500px]`}
              classNamePrefix="select"
              id="merchantSelect"
              isLoading={loading}
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
          <div className="navbar">
            <div className="navbar-options d-flex">
              <input
                type="search"
                className="search-btn rounded-start-4 p-3"
                placeholder="Search Delivery boy"
                value={searchTerm}
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
                <th className="p-3 text-light">DeliveryMan Id</th>
                <th className="p-3 text-light">Merchant Name</th>
                <th className="p-3 text-light">First Name</th>
                <th className="p-3 text-light">Last Name</th>
                <th className="p-3 text-light">Contact number</th>
                <th className="p-3 text-light">Email id</th>
                <th className="p-3 text-light">Address</th>
                <th className="p-3 text-light">Post Code</th>
                <th className="p-3 text-light">Status</th>
                <th className="p-3 text-light">Charge / Charge Method</th>
                <th className="p-3 text-light">Verify</th>
                <th className="p-3 text-light">Action</th>
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
              ) : filteredDeliverymen.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      {
                        merchantId === null || merchantId === "" || loading ? <div className="mx-auto">Please select merchant</div> : <div className="mx-auto">No Data Found</div>
                      }

                    </div>
                  </td>
                </tr>
              ) : (
                filteredDeliverymen.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((deliveryman) => (
                  <tr key={deliveryman._id}>

                    <td className="p-3 text-primary">
                      {deliveryman?.showDeliveryManNumber ?? "-"}
                    </td>
                    <td className="p-3">{deliveryman?.merchantName ?? "-"}</td>
                    <td className="p-3">{deliveryman?.firstName ?? "-"}</td>
                    <td className="p-3">{deliveryman?.lastName ?? "-"}</td>
                    <td className="p-3">
                      {deliveryman.countryCode} {deliveryman.contactNumber}
                    </td>
                    <td className="p-3">{deliveryman.email}</td>
                    <td className="p-3">{deliveryman.address}</td>
                    <td className="p-3">{deliveryman.postCode}</td>
                    <td className="p-3">
                      <button className={getColorClass(deliveryman.status)}>
                        {deliveryman.status === "ENABLE" ? "ONLINE" : "OFFLINE"}
                      </button>
                    </td>
                    <td className="p-3">{`${deliveryman?.charge} / ${deliveryman?.chargeMethod}`}</td>
                    <td className="user-table1">
                      <button
                        className={`enable-btn ${deliveryman.isVerified ? "green" : "red"
                          }`}
                      >
                        {deliveryman.isVerified ? "ACTIVE" : "INACTIVE"}
                      </button>
                      {/* <input type="checkb ox" checked={deliveryman.isVerified} /> */}
                    </td>
                    <td className="user-table1">
                      <div className="d-flex justify-content-center align-items-center">
                        <button
                          className="edit-btn"
                          // onClick={() => handleLocationClick([
                          //   deliveryman.location?.coordinates[0],
                          //   deliveryman.location?.coordinates[1],
                          // ])}

                          onClick={() => handleLocationClick(deliveryman._id)}
                        >
                          <img
                            src={locationimg}
                            alt="Location"
                            className="mx-auto "
                          />
                        </button>
                        <button
                          className="edit-btn ms-1"
                          onClick={() => handleEditClick(deliveryman)}
                        >
                          <img src={edit} alt="Edit" className="mx-auto" />
                        </button>
                        <button
                          className="delete-btn ms-1"
                          onClick={() => handleDeleteClick(deliveryman)}
                        >
                          <img
                            src={deleteimg}
                            alt="Delete"
                            className="mx-auto"
                          />
                        </button>

                        <button
                          className="show-btn ms-1"
                          onClick={() => handleViewClick(deliveryman)}
                        >
                          <img src={show} alt="Show" className="mx-auto" />
                        </button>
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
          isshowold={false}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalDataCount={totalDataCount}
        />
      </div>

      {showInfoModal && (
        <DeliveryManInfoModal
          deliveryBoy={selectedDeliveryMan}
          onHide={closeInfoModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onDelete={confirmDelete}
          onHide={closeDeleteModal}
          text="Delivery Man"
        />
      )}

      {showEditModal && (
        <EditDeliveryManModal
          deliveryBoy={selectedDeliveryMan}
          onHide={closeEditModal}
        />
      )}
      {showMapModal && (
        <MapModal location={location} onHide={() => setShowMapModal(false)} />
      )}
    </>
  );
};

export default MerchantDeliveryMan;
