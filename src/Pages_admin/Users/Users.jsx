// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import searchIcon from "../../assets/search.png";
// import add from "../../assets/add.png";
// import edit from "../../assets/edit.png";
// import deleteimg from "../../assets/deleteimg.png";
// import show from "../../assets/show.png";
// import ViewUser from "../../Components/ViewUser/ViewUser";
// import DisableUser from "../../Components/DisableUser/DisableUser";
// import DeleteUser from "../../Components/DeleteUser/DeleteUser";
// import Pagination from "../../Components/Pagination/Pagination";
// import { getAllUsers } from "../../Components/Api/User"; // Fetch function

// const Users = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;
//   const [users, setUsers] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
//   const [themeMode, setThemeMode] = useState("light");

//   useEffect(() => {
//     // Update body class based on themeMode
//     if (themeMode === "dark") {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }, [themeMode]);

//   const toggleThemeMode = () => {
//     setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//   };

//   // Fetch users from API
//   const fetchUsers = async () => {
//     const response = await getAllUsers(currentPage, usersPerPage);
//     if (response.status) {
//       setUsers(response.data); // Set user data from API
//       // setTotalPages(Math.ceil(response.data[0].totalDataCount / usersPerPage));
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage]);

//   // Filter users based on search query
//   const filteredUsers = users.filter((user) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       user.userName.toLowerCase().includes(query) ||
//       user.email.toLowerCase().includes(query)
//     );
//   });

//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   // Handle pagination click
//   const handleClick = (event) => {
//     setCurrentPage(Number(event.target.id));
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setIsDisableModalOpen(true);
//   };

//   const handleShowInfo = (user) => {
//     setSelectedUser(user);
//     setIsInfoModalOpen(true);
//   };

//   const handleDeleteUser = () => {
//     setIsDeleteModalOpen(false);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1); // Reset pagination to the first page when search changes
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-end align-items-center">
//         <button onClick={toggleThemeMode} className="btn btn-dark">
//           Toggle {themeMode === "light" ? "Dark" : "Light"} Mode
//         </button>
//       </div>
//       <div className="d-flex justify-content-between align-items-center nav-bar pb-3">
//         <div className="navbar">
//           <div className="navbar-options d-flex">
//             <input
//               type="search"
//               className="search-btn rounded-start-4 p-3"
//               placeholder="Search users"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <button className="search-img rounded-end-4 border-0">
//               <img src={searchIcon} className="search" alt="search icon" />
//             </button>
//           </div>
//         </div>
//         <div>
//           <Link to="/add-user">
//             <button className="btn text-white" style={{ background: "#D65246" }}>
//               <img src={add} className="pe-2" alt="Add" />
//               Add User
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table-borderless w-100 text-center bg-light" style={{ fontSize: "12px" }}>
//           <thead className="text-light" style={{ background: "#253A71" }}>
//             <tr>
//               <th className="p-3">User ID</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Contact</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Country</th>
//               <th className="p-3">City</th>
//               <th className="p-3">Register Date</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.length === 0 ? (
//               <tr>
//                 <td colSpan="9" className="text-center p-3">
//                   No data found
//                 </td>
//               </tr>
//             ) : (
//               currentUsers.map((user, index) => (
//                 <tr key={index}>
//                   <td className="p-3">{user._id}</td>
//                   <td className="p-3">{user.userName}</td>
//                   <td className="p-3">{user.contactNumber}</td>
//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3">{user.countryCode}</td>
//                   <td className="p-3">{user.city || "N/A"}</td>
//                   <td className="p-3">{new Date(user.registerDate).toLocaleString()}</td>
//                   <td className="table-head2">
//                     <div className="d-flex align-items-center justify-content-center">
//                       {/* <button className="edit-btn m-2" onClick={() => handleEditUser(user)}>
//                         <img src={edit} alt="Edit" />
//                       </button>
//                       <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
//                         <img src={deleteimg} alt="Delete" />
//                       </button> */}
//                       <button className="show-btn m-2" onClick={() => handleShowInfo(user)}>
//                         <img src={show} alt="Show" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
//     </>
//   );
// };

// export default Users;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_admin/search.png";
import add from "../../assets_admin/add.png";
import show from "../../assets_admin/show.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import ViewUser from "../../Components_admin/ViewUser/ViewUser";
import Pagination from "../../Components_admin/Pagination/Pagination";
import { deleteUser, getAllUsers } from "../../Components_admin/Api/User"; // Fetch function
import UserInfoModal from "./UserInfoPopup";
import Loader from "../../Components_admin/Loader/Loader";
import EditUser from "../EditUser/EditUser";
import DeleteModal from "../../Components_admin/DeleteModal";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers(null, currentPage, usersPerPage);
      if (response.status) {
        setUsers(response.data); // Set user data from API
        setTotalPages(Math.ceil(response.total / usersPerPage)); // Ensure you handle total pages
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(query) ||
      user.lastName?.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const handleShowInfo = (user) => {
    setSelectedUser(user);
    setIsInfoModalOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when search changes
  };

  const handleAdminMerchant = async () => {
    // console.log("Admin Order");
    setLoading(true);
    try {
      const response = await getAllUsers(true, currentPage, usersPerPage);
      if (response.status) {
        setUsers(response.data);
        // setFilteredOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMerchantUser = async () => {
    // console.log("Merchant Order");
    setLoading(true);
    try {
      const response = await getAllUsers(false, currentPage, usersPerPage);
      if (response.status) {
        setUsers(response.data);
        // setFilteredOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEditClick = (deliveryMan) => {
    setSelectedUser(deliveryMan);
    setShowEditModal(true);
  };

  const handleDeleteClick = (customer) => {
    setSelectedUser(customer);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    if (selectedUser) {
      const response = await deleteUser(selectedUser._id);
      if (response.status) {
        fetchUsers();
        closeDeleteModal();
      }
    }
  };
  const closeDeleteModal = () => setShowDeleteModal(false);
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="">
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
            <button
              className="btn text-white flex items-center"
              style={{ background: "#D65246" }}
            >
              <img src={add} className="pe-2" alt="Add" />
              Add User
            </button>
          </Link>
        </div>
      </div>
      <div className="d-flex gap-3 py-3">
        <button
          className="btn btn-primary"
          onClick={() => handleAdminMerchant()}
        >
          Admin Merchant
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleMerchantUser()}
        >
          Merchant
        </button>
      </div>

      <div className="table-responsive">
        <table
          className="table-borderless w-100 text-center bg-light"
          style={{ fontSize: "12px" }}
        >
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
              <th className="p-3">Created By Admin</th>
              <th className="p-3">Actions</th>
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
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center p-3">
                  <div className="d-flex justify-content-center">
                    <div className="mx-auto">No Data Found</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td className="p-3 text-primary">{index + 1 || "-"}</td>
                  <td className="p-3">{user?.firstName || "-"}</td>
                  <td className="p-3">{user?.lastName || "-"}</td>
                  <td className="p-3">{user?.contactNumber || "-"}</td>
                  <td className="p-3">{user?.email || "-"}</td>
                  <td className="p-3">{user?.countryCode || "-"}</td>
                  <td className="p-3">{user?.address?.city || "N/A"}</td>
                  <td className="p-3">{user.registerDate}</td>
                  <td className={"p-3"}>
                    <button
                      className={`enable-btn mx-2 ${
                        user?.createdByAdmin ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {user?.createdByAdmin ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="table-head2">
                    <button
                      className="show-btn m-2"
                      onClick={() => handleShowInfo(user)}
                    >
                      <img src={show} alt="Show" className="mx-auto" />
                    </button>
                    <button
                      className="edit-btn ms-1"
                      onClick={() => handleEditClick(user)}
                    >
                      <img src={edit} alt="Edit" className="mx-auto" />
                    </button>
                    <button
                      className="delete-btn ms-1 me-1"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <img src={deleteimg} alt="Delete" className="mx-auto" />
                    </button>
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
        handleClick={(e) => setCurrentPage(Number(e.target.id))}
      />

      {isInfoModalOpen && (
        <UserInfoModal
          user={selectedUser}
          onHide={() => setIsInfoModalOpen(false)} // Close modal function
        />
      )}
      {showEditModal && (
        <EditUser user={selectedUser} onHide={closeEditModal} />
      )}
      {showDeleteModal && (
        <DeleteModal
          onDelete={confirmDelete}
          onHide={closeDeleteModal}
          text="User"
        />
      )}
    </div>
  );
};

export default Users;
