import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import adhar from '../../assets_admin/adhar.png';
import Pagination from "../../Components_admin/Pagination/Pagination";
import { getDeliveryManDocument, updateDocumentStatus } from "../../Components_admin/Api/DeliveryMan";

const Document = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModel, setShowModel] = useState(false);
  const [document, setDocument] = useState([]); // State for API data
  const [totalPages, setTotalPages] = useState(1); // For pagination


  const fetchDocument = async () => {
    const res = await getDeliveryManDocument(currentPage, itemsPerPage);
    if (res.status) {
      setDocument(res.data.data);
      setTotalPages(Math.ceil(res.data.totalDataCount / itemsPerPage));
    }
  }

  useEffect(() => {
    fetchDocument();
  }, [currentPage]);

  const closeModel = () => setShowModel(false);

  const DocumentImage = (url) => {
    return (
      <img
        src={`${url}`}
        onError={(e) => {
          e.target.src = adhar;
        }}
        alt="document"
      />
    );
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const updateStatus = async (e, data) => {
    // console.log('data', data);

    const payload = {
      deliveryManId: data.deliveryManId,
      documentId: data.documents.documentId,
      status: e.target.value
    }
    const res = await updateDocumentStatus(payload)
    // console.log('func res', respnse)
  }

  return (
    <>
      <div className="w-100">
        <div className="d-flex justify-content-between py-3">
          <button className="delete">Delete</button>
          <Link to="/add-deliveryman">
            <button type="button" className="btn text-light" style={{ background: "#D65246" }}>
              <img src={add} alt="Add" />
              Add Delivery Man
            </button>
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table-borderless w-100 text-center bg-light" style={{ fontSize: "10px" }}>
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Name</th>
                <th className="p-3">Document Name</th>
                <th className="p-3">Document</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {document.map((deliveryman) => (
                <tr key={deliveryman.id}>
                  <td >
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{deliveryman.deliveryManName}</td>
                  <td className="p-3">{deliveryman?.documents?.documentName || "-"}</td>
                  <td className="p-3">{DocumentImage(deliveryman?.documents?.document)}</td>
                  <td className="p-3">{deliveryman?.documents?.createdAt}</td>
                  <td className="p-3  text-center  d-flex align-items-center justify-content-center">
                    {<select class="form-select  fw-bold" defaultValue={deliveryman.documents.status} style={{ fontSize: "12px", width: "130px" }} onChange={(e) => updateStatus(e, deliveryman)}>
                      <option value="REJECT">rejected</option>
                      <option value="APPROVED">approved</option>
                      {deliveryman.documents.status == 'PENDING' && <option value="PENDING">pending</option>}
                    </select>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
      </div>


    </>
  );
};

export default Document;
