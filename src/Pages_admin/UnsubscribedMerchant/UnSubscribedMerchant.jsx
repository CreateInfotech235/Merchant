import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_admin/search.png";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import ViewUser from "../../Components_admin/ViewUser/ViewUser";
import DisableUser from "../../Components_admin/DisableUser/DisableUser";
import DeleteUser from "../../Components_admin/DeleteUser/DeleteUser";
import Pagination from "../../Components_admin/Pagination/Pagination";
import { getUnScbscriptionUsers } from "../../Components_admin/Api/User"; 
import UnsubscriptionUserPopup from './UnSubsctibedMerchnatPopup'
import Loader from "../../Components_admin/Loader/Loader";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    // Update body class based on themeMode
    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Fetch users from API
  const fetchUsers = async () => {
    const response = await getUnScbscriptionUsers(currentPage, usersPerPage);
    if (response.status) {
      setUsers(response.data[0].data); // Set user data from API
      setTotalPages(Math.ceil(response.data[0].totalDataCount / usersPerPage));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
        user?.firstName?.toLowerCase().includes(query) ||
      user?.lastName?.toLowerCase().includes(query) ||
      user?.email?.toLowerCase().includes(query) ||
      user?.countryCode?.toLowerCase().includes(query) ||
      user?.city?.toLowerCase().includes(query)
    );
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle pagination click
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsDisableModalOpen(true);
  };

  const handleShowInfo = (user) => {
    setSelectedUser(user);
    setIsInfoModalOpen(true);
  };

  const handleDeleteUser = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when search changes
  };

  return (
    <>
      <div className="d-flex justify-content-end align-items-center">
        {/* <button onClick={toggleThemeMode} className="btn btn-dark">
          Toggle {themeMode === "light" ? "Dark" : "Light"} Mode
        </button> */}
      </div>
      <div className="d-flex justify-content-between align-items-center nav-bar pb-3">
        <div className="navbar">
          <div className="navbar-options d-flex">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search users"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0">
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
        <div>
          <Link to="/add-user">
            <button className="btn text-white flex items-center" style={{ background: "#D65246" }}>
              <img src={add} className="pe-2" alt="Add" />
              Add User
            </button>
          </Link>
        </div>
      </div>  

      <div className="table-responsive">
        <table className="table-borderless w-100 text-center bg-light" style={{ fontSize: "12px" }}>
          <thead className="text-light" style={{ background: "#253A71" }}>
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Email</th>
              <th className="p-3">Country</th>
              <th className="p-3">City</th>
              <th className="p-3">Register Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-3">
                <div className="d-flex justify-content-center">
                      <div className="mx-auto">
                      <Loader />
                      No Data Found
                      </div>
                     </div>
                </td>
              </tr>
            ) : (
              currentUsers.map((user, index) => (
                <tr key={index}>
                  <td className="p-3">{user.userId}</td>
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.contactNumber}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.countryCode}</td>
                  <td className="p-3">{user.city || "N/A"}</td>
                  <td className="p-3">{new Date(user.registerDate).toLocaleString()}</td>
                  <td className="p-3">
                    <button className="enable-btn">{user.status === "ENABLE" ? "Disable" : "Enable"}</button>
                  </td>
                  <td className="table-head2">
                    <div className="d-flex align-items-center justify-content-center">
                      {/* <button className="edit-btn m-2" onClick={() => handleEditUser(user)}>
                        <img src={edit} alt="Edit" />
                      </button>
                      <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
                        <img src={deleteimg} alt="Delete" />
                      </button> */}
                      <button className="show-btn m-2" onClick={() => handleShowInfo(user)}>
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
      {isInfoModalOpen && (
  <UnsubscriptionUserPopup 
    user={selectedUser} 
    onHide={() => setIsInfoModalOpen(false)} 
  />
)}
      <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
    </>
  );
};

export default Users;