import API from "./Api";
import { toast } from "react-toastify";
export const PostEmail = async (data) => {
  try {
    const response = await API.post(`/auth/Email`, data);
    // console.log("Response:", response);
    if (response.status === 200) {
      toast.success(response.data.message);
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
