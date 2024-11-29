import React, { useState } from "react";
import { Link } from "react-router-dom";

import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import DisableUser from "../../../../dashboard/src/Components/DisableUser/DisableUser";
import DeleteUser from "../../../../dashboard/src/Components/DeleteUser/DeleteUser"; // Ensure this import is correct

const RegularCharge = () => {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showEnableModel, setShowEnableModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // To track which item the modal is related to

  const closeDeleteModel = () => setShowDeleteModel(false);
  const closeEnableModel = () => setShowEnableModel(false);

  // Example data array
  const data = [
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },
    { id: 1, title: "service fees", country: "Australia", city: "Bargara", charge: "300%", created: "26 ape 2024 | 11:31 AM" },

    // Add more objects here to represent other rows
  ];

  const handleEnableClick = (item) => {
    setSelectedItem(item);
    setShowEnableModel(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModel(true);
  };

  return (
    <>
      <div className="dashboard-user ">
        <div className="add-delete-btn d-flex justify-content-between ">
          <button className="delete">Delete</button>
          <Link to="/edit-user">
            <button className="add-extra" style={{  width: '209px',
  background:'#d65246',
  color: 'white',
  borderRadius: '5px',
  height:'41px',
  border: 'none'}}>
              <img src={add} alt="Add" />
              Add Extra Charges
            </button>
          </Link>
        </div>

        <div className="table-responsive mt-5">
          <table className="table-borderless w-100 text-center bg-light">
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="bg-blue-950">ID</th>
                <th className="p-3">Title</th>
                <th>Country Name</th>
                <th>City Name</th>
                <th>Charge</th>
                <th>Created</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="user-table1 p-2">{item.id}</td>
                  <td className="user-table1">{item.title}</td>
                  <td className="user-table1">{item.country}</td>
                  <td className="user-table1">{item.city}</td>
                  <td className="user-table1">{item.charge}</td>
                  <td className="user-table1">{item.created}</td>
                  <td className="user-table1">
                    <button
                      className="enable-btn"
                      onClick={() => handleEnableClick(item)}
                    >
                      Enable
                    </button>
                    {showEnableModel && selectedItem === item && (
                      <DisableUser closeModel={closeEnableModel} />
                    )}
                  </td>
                  <td className="user-table1">
                    <Link to="/edit-user">
                      <button className="edit-btn">
                        <img src={edit} alt="Edit" />
                      </button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteClick(item)}
                    >
                      <img src={deleteimg} alt="Delete" />
                    </button>
                    {showDeleteModel && selectedItem === item && (
                      <DeleteUser closeModel={closeDeleteModel} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RegularCharge;
