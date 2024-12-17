import API from "./Api";

export const getadmindata = async () => {
  try {
    const response = await API.get(`/mobile/auth/admindata/`);
    // console.log("Response:", response);

    if (response.status === 200) {
      return { status: true, data: response.data };
    } else {
      // console.log("API error", response?.data?.message || "Unknown error");
      return {
        status: false,
        message: response?.data?.message || "Unknown error",
      };
    }
  } catch (error) {
    console.error(
      "Error occurred in getadmindata:",
      error.response ? error.response.data : error.message
    );
    return {
      status: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

export const postSupportTicket = async (data) => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");
    const response = await API.post(
      `/mobile/auth/postSupportTicket/${merchnatId}`,
      data
    );
    // console.log("Response:", response);

    // Check for successful status code
    if (response.status === 201) {
      return { status: true, data: response.data };
    } else {
      // console.log("API error", response?.data?.message || "Unknown error");
      return {
        status: false,
        message: response?.data?.message || "Unknown error",
      };
    }
  } catch (error) {
    console.error(
      "Error occurred in postSupportTicket:",
      error.response ? error.response.data : error.message
    );
    return {
      status: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

export const getSupportTicket = async () => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");
    const response = await API.get(
      `/mobile/auth/getSupportTicket/${merchnatId}`
    );
    // console.log("Response:", response);
    if (response.status === 200) {
      return { status: true, data: response.data };
    } else {
      // console.log("API error", response?.data?.message || "Unknown error");
      return {
        status: false,
        message: response?.data?.message || "Unknown error",
      };
    }
  } catch (error) {
    console.error(
      "Error occurred in postSupportTicket:",
      error.response ? error.response.data : error.message
    );
    return {
      status: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

export const DeleteSupportTicket = async (ticketId) => {
  try {
    // console.log(ticketId);
    // Ensure 'merchnatId' is available in localStorage
    const merchnatId = localStorage.getItem("merchnatId");
    if (!merchnatId) {
      return {
        status: false,
        message: "Merchant ID is missing from localStorage.",
      };
    }
    // console.log(merchnatId);

    // API call to delete the support ticket
    const response = await API.delete(
      `/mobile/auth/deleteSupportTicket/${ticketId}`
    );
    // console.log("Response:", response);

    // Check if the request was successful
    if (response.status === 200) {
      return { status: true, data: response.data };
    } else {
      // Log and return error if status code is not 200
      // console.log("API error:", response?.data?.message || "Unknown error");
      return {
        status: false,
        message: response?.data?.message || "Unknown error",
      };
    }
  } catch (error) {
    // Improved error handling: Ensure we handle both network errors and API errors
    console.error(
      "Error occurred in DeleteSupportTicket:",
      error.response ? error.response.data : error.message
    );
    return {
      status: false,
      message: error.response
        ? error.response.data
        : error.message || "An unknown error occurred",
    };
  }
};

export const SupportTicketUpdate = async (ticketId, userId, data) => {
  try {
    // console.log(ticketId, userId, data);
    // console.log(userId);

    const response = await API.patch(
      `/mobile/auth/SupportTicketUpdate?id=${ticketId}&userId=${userId}`,
      data
    );
    // Ensure the response has a successful status code (e.g., 200)
    // console.log(response);

    if (response.status === 200) {
      // console.log("Response:", response);
      return response;
    } else {
      return {
        status: false,
        message: "Unexpected response status: " + response.status,
      };
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error("Error occurred in SupportTicketUpdate:", errorMessage);
    return { status: false, message: errorMessage };
  }
};
