import React, { useState } from "react";
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import { Link } from "react-router-dom";



const ParcelType = () => {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const parcelTypesPerPage = 10; // Rename to parcelTypesPerPage

  // Sample data array
  const parcelTypes = [
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    {
      id: 1,
      label: "documents",
      value: "documents",
      created: "23 mar 2022 | 11:31 AM"
    },
    
    // Add more objects as needed
  ];

  const indexOfLastParcelType = currentPage * parcelTypesPerPage;
  const indexOfFirstParcelType = indexOfLastParcelType - parcelTypesPerPage;
  const currentParcelTypes = parcelTypes.slice(
    indexOfFirstParcelType,
    indexOfLastParcelType
  );

  const totalPages = Math.ceil(parcelTypes.length / parcelTypesPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? "active" : null}
      >
        {number}
      </li>
    ));
  };

  return (
    <>
     <div className=" w-100">
     <div className=" d-flex justify-content-between py-3">
          <button className="delete">Delete</button>
          <Link to="/add-parcel-type "  style={{ textDecoration: "none", color: "white" }}>
          <button type="button" className="btn  border-0 text-light " style={{background:"#D65246"}}>
        
            <img src={add} alt="Add" />
              Add Parcel Types
            </button>
          </Link>
        </div>

        <div className="table-responsive">
          <table class="table-borderless w-100 text-center bg-light">
            <thead class="text-light" style={{background:"#253A71"}}>
              <tr>
                <th class="p-4 ">id</th>
                <th class="p-4 ">label</th>
                <th class="p-4 ">value</th>
                <th class="p-4 ">created</th>
                <th class="p-4 ">action</th>
              </tr>
            </thead>
            <tbody>
              {currentParcelTypes.map((parcel) => (
                <tr key={parcel.id}>
                  <td class="p-3">{parcel.id}</td>
                  <td class="p-3">{parcel.label}</td>
                  <td class="p-3">{parcel.value}</td>
                  <td class="p-3">{parcel.created}</td>
                  <td class="p-3">
                    <Link to="/update-parcel-type">
                      <button className="edit-btn ms-1">
                        <img src={edit} alt="Edit" />
                      </button>
                    </Link>
                    <button
                      className="delete-btn ms-1"
                      onClick={() => setShowDeleteModel(true)}
                    >
                      <img src={deleteimg} alt="Delete" />
                    </button>
                    {showDeleteModel && <DeleteUser closeModel={closeDeleteModel} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination-container d-flex justify-content-end">
        <ul className="pagination " >{renderPageNumbers()}</ul>
      </div>
    </>
  );
};

export default ParcelType;
