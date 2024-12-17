import API from "./NonAdminApi";
import { toast } from "react-toastify";
export const getAllCustomers = async (page, pageLimit) => {
  try {
    const response = await API.get(`/customer/auth/getCustomers`);
    console.log("res", response);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      // console.log('API error', response.message)
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { status: false, message: error.message };
  }
};

export const addCustomer = async (data) => {
  try {
    const response = await API.post(`/admin/customer/addCustomer`, data);
    // console.log('response', response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      // console.log('API error', response.response.data.message)
      toast.error(response.response.data.message || response.message);
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error Add  Customer:", error);
    return { status: false, message: error.message };
  }
};
