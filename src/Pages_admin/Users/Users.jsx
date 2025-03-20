import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_admin/search.png";
import add from "../../assets_admin/add.png";
import show from "../../assets_admin/show.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import ViewUser from "../../Components_admin/ViewUser/ViewUser";
import { deleteUser, getAllUsers } from "../../Components_admin/Api/User"; // Fetch function
import UserInfoModal from "./UserInfoPopup";
import Loader from "../../Components_admin/Loader/Loader";
import EditUser from "../EditUser/EditUser";
import DeleteModal from "../../Components_admin/DeleteModal";
import StatusUpdateModal from "./StatusUpdateModal.jsx"; // Import the new modal
import { Pagination, Stack } from "@mui/material";

const Users = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [users, setUsers] = useState([]);
  // const [totalPages, setTotalPages] = useState(1);
  // const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [statusUpdateUser, setStatusUpdateUser] = useState(null);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [loading, setLoading] = useState(false);
  // const [filterUsers, setFilterUsers] = useState([]);


  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [filterUsers, setFilterUsers] = useState([]); // Filtered users for display
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all users from API once
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      if (response.status) {
        setAllUsers(response.data.map((item, index) => ({ ...item, id: index + 1 })));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Filter and slice users based on search and pagination
  useEffect(() => {
    // Filter based on search query
    const filtered = allUsers.filter((user) =>
      [user.firstName, user.lastName, user.email, user?.id]
        .some((field) => field.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Slice for current page and items per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilterUsers(filtered.slice(startIndex, endIndex));

    // Update total pages based on filtered results
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [allUsers, searchQuery, currentPage, itemsPerPage]);

  const handleShowInfo = (user) => {
    setSelectedUser(user);
    setIsInfoModalOpen(true);
  };

  // ✅ Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleEditClick = (deliveryMan) => {
    setSelectedUser(deliveryMan);
    setShowEditModal(true);
  };

  const handleDeleteClick = (customer) => {
    setSelectedUser(customer);
    setShowDeleteModal(true);
  };
  // ✅ Confirm delete
  const confirmDelete = async () => {
    if (selectedUser) {
      const response = await deleteUser(selectedUser._id);
      if (response.status) {
        setAllUsers(allUsers.filter((user) => user._id !== selectedUser._id));
        setShowDeleteModal(false);
      }
    }
  };

  const closeDeleteModal = () => setShowDeleteModal(false);
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const toggleStatus = (merchantId, currentStatus, reason) => {
    if (!merchantId) return;
    setStatusUpdateUser({
      userid: merchantId,
      currentStatus: currentStatus || 'PENDING',
      reason: reason || ''
    });
    setShowStatusUpdateModal(true);
  };

  const updateUserStatus = async (userId, status, reason = '') => {
    try {
      const response = await updateStatus(userId, {
        status: status,
        reason: reason
      });

      if (response.status) {
        // Update local state only after successful API call
        setUsers(prevUsers => prevUsers.map(user =>
          user._id === userId ? { ...user, isApproved: status, reason: reason } : user
        ));

        setFilterUsers(prevUsers => prevUsers.map(user =>
          user._id === userId ? { ...user, isApproved: status, reason: reason } : user
        ));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  // ✅ Handle pagination change
  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };
  // ✅ Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  return (
    <div className="">
      <div className="d-flex justify-content-end align-items-center nav-bar pb-3">
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
              <th className="p-3">Status</th>
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
            ) : filterUsers.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center p-3">
                  <div className="d-flex justify-content-center">
                    <div className="mx-auto">No Data Found</div>
                  </div>
                </td>
              </tr>
            ) : (
              filterUsers.map((user, index) => (
                <tr key={index}>
                  <td className="p-3 text-primary">{user.id || "-"}</td>
                  <td className="p-3">{user?.firstName || "-"}</td>
                  <td className="p-3">{user?.lastName || "-"}</td>
                  <td className="p-3">{user?.contactNumber || "-"}</td>
                  <td className="p-3">{user?.email || "-"}</td>
                  <td className="p-3">{user?.countryCode || "-"}</td>
                  <td className="p-3">{user?.address?.city || "N/A"}</td>
                  <td className="p-3">{user.registerDate || "-"}</td>
                  <td className="p-3">
                    <button className={`btn ${user?.isApproved === "APPROVED" ? "bg-success" : user?.isApproved === "REJECTED" ? "bg-danger" : user?.isApproved === "PENDING" ? "bg-warning" : "bg-secondary"}`} style={{ padding: "5px", fontSize: "12px", border: "none", textAlign: "center", color: "white" }} onClick={() => toggleStatus(user._id, user.isApproved, user?.reason)}>
                      {user?.isApproved === "APPROVED" ? "Approved" : user?.isApproved === "REJECTED" ? "Rejected" : user?.isApproved === "PENDING" ? "Pending" : "Unknown"}
                    </button>
                  </td>
                  {/* <td className={"p-3"}>
                    <button
                      className={`enable-btn mx-2 ${user?.createdByAdmin ? "bg-success" : "bg-secondary"}`}
                    >
                      {user?.createdByAdmin ? "Yes" : "No"}
                    </button>
                  </td> */}
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

      <div className="d-flex justify-content-end align-items-center mt-3 mb-3">
        <div className="d-flex align-items-center">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
          <select
            className="form-select ms-3 w-20"
            value={itemsPerPage}
            onChange={(e) => { setCurrentPage(1); setItemsPerPage(Number(e.target.value)) }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

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
