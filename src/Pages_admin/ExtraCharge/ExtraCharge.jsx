import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Assuming you're using Bootstrap for modals
import deleteimg from "../../assets_admin/deleteimg.png"; // Delete image
import edit from "../../assets_admin/edit.png"; // Edit image
import add from "../../assets_admin/add.png"; // Add image
import DeleteModal from "../../Components_admin/DeleteModal";
import { deleteExtraCharge, getAllExtraCharges } from "../../Components_admin/Api/ExtraCharge";
import Pagination from "../../Components_admin/Pagination/Pagination";
import { Link } from "react-router-dom";
import UpdateExtraChargeModal from "./UpdateExtraChargeModal";

const ExtraCharge = () => {
  const [charges, setCharges] = useState([]); // Charges list stateconst [showDeleteModal, setShowDeleteModal] = useState(false); // Modal state for delete confirmation
  const [selectedCharge, setSelectedCharge] = useState(null); // Selected charge for editing or deleting
  const itemPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUpdateModel, setShowUpdateModel] = useState(false);


  const fetchCharges = async () => {
    const response = await getAllExtraCharges(currentPage, itemPerPage, searchQuery);
    console.log('response', response)
    if (response.status) {
      setCharges(response.data[0].data);
      setTotalPages(Math.ceil(response.data[0].totalDataCount / itemPerPage));
    }
  };

  const handleDelete = async () => {
    const res = await deleteExtraCharge(selectedCharge.extraChargeId)
    setShowDeleteModal(false)
    fetchCharges()
  }

  useEffect(() => {
    fetchCharges();
  }, [currentPage, searchQuery]);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <>
      <div className="dashboard-user">
        <div className="add-delete-btn mb-4">
          <Link to="/add-extra-charges">
            <button type="button" className="btn border-0 text-white" style={{ background: "#D65246" }}>
              <img src={add} alt="Add" />
              Add Extra Charge
            </button>
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table-borderless w-100 text-center bg-light rounded-2">
            <thead className="text-light rounded-2" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Title</th>
                <th className="p-4">Charge Type</th>
                <th className="p-4">Charge</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {charges.map((charge) => (
                <tr key={charge.id}>
                  <td className="p-3">{charge.extraChargeId}</td>
                  <td className="p-3">{charge.title}</td>
                  <td className="p-3">{charge.chargeType}</td>
                  <td className="p-3">{charge.charge}</td>
                  <td className="p-3">
                    <button className="enable-btn" onClick={() => {
                      setShowDeleteModal(true)
                      setSelectedCharge(charge)
                    }}>
                      {charge.status}
                    </button>

                  </td>
                  <td className="p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <button className="edit-btn me-2" onClick={() => {
                        setSelectedCharge(charge)
                        setShowUpdateModel(true)
                        
                      }}>
                        <img src={edit} alt="Edit" />
                      </button>
                      <button className="delete-btn" onClick={() => {
                        setShowDeleteModal(true)
                        setSelectedCharge(charge)
                      }}>
                        <img src={deleteimg} alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Modal for Edit Extra Charges */}
      {showUpdateModel && <UpdateExtraChargeModal onUpdate={fetchCharges}
          handleClose={() => setShowUpdateModel(false)}
          chargeData={selectedCharge} />}
      {/* Delete Confirmation Modal */}
      {
        showDeleteModal && <DeleteModal onDelete={handleDelete} type='Extra Charge' onHide={() => setShowDeleteModal(false)} />
      }
      <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />

    </>
  );
};

export default ExtraCharge;
