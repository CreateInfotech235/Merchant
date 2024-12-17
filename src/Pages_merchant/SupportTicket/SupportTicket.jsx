import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  postSupportTicket,
  getadmindata,
  getSupportTicket,
  DeleteSupportTicket,
  SupportTicketUpdate,
} from "../../Components_merchant/Api/SupportTicket";
import { Link } from "react-router-dom";
import show from "../../assets_admin/show.png";



const SupportTicket = () => {
  const [userData, setUserData] = useState({ name: "", userid: "" });
  const [showpopup, setshowpopup] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listofproblem, setlistofproblem] = useState([]);
  const [isUpdate, setIsUpdate] = useState("");
  const [currentTicket, setCurrentTicket] = useState(null);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
  

  const merchnatId = localStorage.getItem("merchnatId");
  // console.log(merchnatId);
  const getadmindatafromapi = async () => {
    setLoading(true);
    try {
      const response = await getadmindata();
      setAdmins(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    }
    setLoading(false);
  };

  const getSupportTicketapi = async () => {
    try {
      const response = await getSupportTicket();
      setlistofproblem(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch support tickets:", error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData({
        name: parsedUserData.name || "",
        userid: parsedUserData._id || "",
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getadmindatafromapi();
      await getSupportTicketapi();
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
    problem: Yup.string().required("Problem description is required"),
    adminId: Yup.string().required("Admin is required"),
  });

  const formik = useFormik({
    initialValues: {
      userid: userData.userid,
      subject: "",
      problem: "",
      adminId: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isUpdate) {
          await SupportTicketUpdate(isUpdate, merchnatId, values);
        } else {
          await postSupportTicket(values);
        }
        // console.log("Ticket submitted", values);
        getSupportTicketapi();
        setshowpopup(false);
        setIsUpdate("");
      } catch (error) {
        console.error("Failed to submit support ticket:", error);
      }
    },
  });

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleDelete = async (ticketId) => {
    setlistofproblem((prevList) =>
      prevList.filter((ticket) => ticket._id !== ticketId)
    );

    try {
      await DeleteSupportTicket(ticketId);
      getSupportTicketapi();
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      getSupportTicketapi();
    }
  };

  const handleUpdate = async (ticket) => {
    setIsUpdate(ticket._id);
    formik.setValues({
      name: userData.name,
      userid: userData.userid,
      subject: ticket.subject,
      problem: ticket.problem,
      adminId: ticket.adminId?._id || "",
    });
    setshowpopup(true);
  };

  return (
    <div className="w-full p-[20px] bg-white text-black rounded flex items-stretch flex-col">
      <button
        type="button"
        className="self-end py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => setshowpopup(!showpopup)}
      >
        Raise issue
      </button>

      {showpopup && (
        <div>
          <div className="text-lg font-semibold mb-4">Support Ticket Form</div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="adminId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Assign to Admin
                </label>
                <select
                  id="adminId"
                  name="adminId"
                  value={formik.values.adminId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select an Admin
                  </option>
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
                {formik.touched.adminId && formik.errors.adminId && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.adminId}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter the subject of your issue"
                  disabled={loading}
                />
                {formik.touched.subject && formik.errors.subject && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.subject}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="problem"
                className="block text-sm font-medium text-gray-700"
              >
                Problem Description
              </label>
              <textarea
                id="problem"
                name="problem"
                value={formik.values.problem}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                disabled={loading}
              ></textarea>
              {formik.touched.problem && formik.errors.problem && (
                <div className="text-red-500 text-xs">
                  {formik.errors.problem}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              Submit Ticket
            </button>
          </form>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">List of Support Tickets</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Problem</th>
              <th className="px-4 py-2 border">Admin Assigned</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Delete</th>
              <th className="px-4 py-2 border">Update</th>
              <th className="px-4 py-2 border">View</th>
            </tr>
          </thead>
          <tbody>
            {listofproblem.map((ticket, index) => (
              <tr key={ticket._id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  {formatDate(ticket.createdAt)}
                </td>
                <td className="px-4 py-2 border">{ticket.subject}</td>
                <td className="px-4 py-2 border">{ticket.problem}</td>
                <td className="px-4 py-2 border">
                  {ticket.adminId ? ticket.adminId.name : "No admin assigned"}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center">
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: ticket.problemSolved ? "green" : "red",
                      }}
                    ></div>
                    <div className="ml-[10px]">
                      {ticket.problemSolved ? "Solved" : "Unresolved"}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleUpdate(ticket)}
                    className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
                <td className="px-4 py-2 border">
                  <Link to="/view-tickets-merchant" state={{ ticketId: ticket._id }}>
                    <button
                      onClick={() => setSelectedTicketId(ticket._id)}
                      className="show-btn "
                    >
                      <img src={show} alt="Show" className="mx-auto" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportTicket;
