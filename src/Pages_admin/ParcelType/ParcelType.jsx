import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import DeleteModal from "../../Components_admin/DeleteModal";
import Pagination from "../../Components_admin/Pagination/Pagination";
import { deleteParcelType, getAllParcelTypes } from "../../Components_admin/Api/ParcelType";
import UpdateParcelTypeModal from "./UpdateParcelTypeModal";

const ParcelType = () => {
  const [parcelTypes, setParcelTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  // Fetch parcel types
  const fetchParcelTypes = async () => {
    const response = await getAllParcelTypes(currentPage, itemsPerPage);
    if (response.status) {
      setParcelTypes(response.data[0].data);
      setTotalPages(Math.ceil(response.data[0].totalDataCount / itemsPerPage));
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    await deleteParcelType(selectedParcel.parcelTypeId);
    setShowDeleteModal(false);
    fetchParcelTypes(); // Refresh after deletion
  };

  useEffect(() => {
    fetchParcelTypes();
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <>
      <div className="dashboard-user">
        <div className="add-delete-btn mb-4">
          <Link to="/add-parcel-type">
            <button type="button" className="btn border-0 text-white" style={{ background: "#D65246" }}>
              <img src={add} alt="Add" /> Add Parcel Type
            </button>
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table-borderless w-100 text-center bg-light rounded-2">
            <thead className="text-light rounded-2" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Label</th>
                
                <th className="p-4">Created</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcelTypes.map((parcel) => (
                <tr key={parcel.id}>
                  <td className="p-3">{parcel.parcelTypeId}</td>
                  <td className="p-3">{parcel.label}</td>
                  
                  <td className="p-3">{parcel.createdDate}</td>
                  <td className="p-3">
                    <button className="enable-btn" onClick={() => {
                      setShowDeleteModal(true)
                      setSelectedParcel(parcel)
                    }}>
                      {parcel.status}
                    </button>

                  </td>
                  <td className="p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="edit-btn me-2"
                        onClick={() => {
                          setSelectedParcel(parcel);
                          setShowUpdateModal(true);
                        }}
                      >
                        <img src={edit} alt="Edit" />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          setSelectedParcel(parcel);
                          setShowDeleteModal(true);
                        }}
                      >
                        <img src={deleteimg} alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handlePageClick} />

        {/* Modal for Editing Parcel Type */}
        {showUpdateModal && (
          <UpdateParcelTypeModal
            parcelData={selectedParcel}
            handleClose={() => setShowUpdateModal(false)}
            onUpdate={fetchParcelTypes}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <DeleteModal
            onDelete={handleDelete}
            type="Parcel Type"
            onHide={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default ParcelType;
