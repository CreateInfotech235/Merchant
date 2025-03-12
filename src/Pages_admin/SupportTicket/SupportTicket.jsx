import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_mercchant/search.png";
import edit from "../../assets_admin/edit.png"; 
import deleteimg from "../../assets_admin/deleteimg.png";
import show from "../../assets_admin/show.png";
import { getSupportTicket } from "../../Components_admin/Api/SupportTicket";
import DeleteUser from "../../Components_admin/DeleteUser/DeleteUser";
import { Pagination, Stack } from "@mui/material";

const SupportTicket = () => {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [supportTicket, setSupportTicket] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [themeMode, setThemeMode] = useState("light");

  const closeDeleteModel = () => setShowDeleteModel(false);

  useEffect(() => {
    const fetchSupportTicket = async () => {
      const response = await getSupportTicket();
      if (response.status) {
        setSupportTicket(response.data.data.map((ticket,index) => ({
          ...ticket,
          no: index + 1
        })));
        const initialTickets = response.data.data.slice(0, itemsPerPage);
        setFilteredTickets(initialTickets);
        setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
      } else {
        setSupportTicket([]);
        setFilteredTickets([]);
      }
    };
    fetchSupportTicket();
  }, []);

  const filterTickets = (query) => {
    let data = supportTicket;

    if (query) {
      const searchLower = query.toLowerCase().trim();
      const searchArr = searchLower.split(" ");
      data = data.filter((ticket) =>
        searchArr.every(
          (word) =>
            ticket?.userid?.firstName?.toLowerCase().includes(word) ||
            ticket?.userid?.lastName?.toLowerCase().includes(word) ||
            ticket?.userid?.email?.toLowerCase().includes(word) ||
            ticket?.subject?.toLowerCase().includes(word) ||
            ticket?.problem?.toLowerCase().includes(word)
        )
      );
    }

    const totalFilteredPages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(totalFilteredPages);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredTickets(data.slice(startIndex, endIndex));
  };

  useEffect(() => {
    filterTickets(searchQuery);
  }, [searchQuery, currentPage, itemsPerPage, supportTicket]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className={`navbar ${themeMode === "dark" ? "dark-mode" : ""}`}>
        <div className="navbar-options d-flex my-2 col-12 items-center">
          <input
            type="search"
            className="search-btn border-1 border-slate-500 rounded-start-4 p-3"
            placeholder="Search Tickets"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-img rounded-end-4 border-0 flex justify-center items-center">
            <img
              src={searchIcon}
              className="search w-[35px]"
              alt="search icon"
            />
          </button>
        </div>
      </div>

      <div className="w-100">
        <div className="table-responsive">
          <table className="table-borderless w-100 text-center bg-light">
            <thead className="text-light" style={{ background: "#253A71" }}>
              <tr>
                <th className="p-4"></th>
                <th className="p-4">NO</th>
                <th className="p-4">Merchant Name</th>
                <th className="p-4">Merchant Email</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Problem</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, i) => (
                <tr key={i}>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{ticket?.no}</td>
                  <td className="p-3">{`${ticket?.userid?.firstName ?? "-"} ${
                    ticket?.userid?.lastName ?? "-"
                  }`}</td>
                  <td className="p-3">{ticket?.userid?.email ?? "-"}</td>
                  <td className="p-3">{ticket?.subject ?? "-"}</td>
                  <td className="p-3">{ticket?.problem ?? "-"}</td>
                  <td className="p-3">
                    <button
                      className={`enable-btn ${
                        ticket.problemSolved === true ? "green" : "red"
                      }`}
                    >
                      {ticket.problemSolved === true ? "SOLVED" : "UNSOLVED"}
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="d-flex align-items-center justify-content-lg-center">
                      <Link to="/edit-user">
                        <button className="edit-btn">
                          <img src={edit} alt="Edit" className="mx-auto" />
                        </button>
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() => setShowDeleteModel(true)}
                      >
                        <img src={deleteimg} alt="Delete" className="mx-auto" />
                      </button>
                      {showDeleteModel && (
                        <DeleteUser closeModel={closeDeleteModel} />
                      )}
                      <Link to="/view-tickets" state={{ ticketId: ticket._id }}>
                        <button
                          onClick={() => setSelectedTicketId(ticket._id)}
                          className="show-btn"
                        >
                          <img src={show} alt="Show" className="mx-auto" />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end align-items-center mt-3">
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
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SupportTicket;
