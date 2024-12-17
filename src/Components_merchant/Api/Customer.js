import API from "./Api";
import { toast } from "react-toastify";
export const getAllCustomers = async () => {
  try {
    const merchantId = await localStorage.getItem("merchnatId");
    // Create a new object with the original data and merchantId
    const tampdata = { merchantId };
    const response = await API.get(`/customer/auth/getCustomers`, {
      params: tampdata,
    });
    // console.log("res", response);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { status: false, message: error.message };
  }
};

export const addCustomer = async (data) => {
  try {
    // Get merchantId from localStorage
    const merchantId = localStorage.getItem("merchnatId");
    // console.log(merchantId);
    // Create a new object with the original data and merchantId
    const tampdata = { ...data, merchantId };
    // Log the tampdata to confirm it's correctly constructed
    // console.log("tampdata", tampdata);
    // Send the tampdata to the API
    const response = await API.post(`/customer/auth/signUp`, tampdata);
    // Log the response for debugging
    // console.log("response", response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.response.data.message);
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
export const updateCustomer = async (id, data) => {
  try {
    const merchantId = localStorage.getItem("merchnatId");

    // Create a new object with the original data and merchantId
    const tampdata = { ...data, merchantId };
    // Log the tampdata to confirm it's correctly constructed

    const response = await API.patch(
      `/customer/auth/customerUpdate/${id}`,
      tampdata
    );
    // console.log("response", response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.response.data.message);
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

export const moveToTrashCustomer = async (id) => {
  try {
    const response = await API.patch(
      `/customer/auth/moveToTrashCustomer/${id}`
      // {
      //   params: {
      //     user: userId,
      //   },
      // }
    );
    // console.log("response", response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.response.data.message);
      toast.error(response.response.data.message || response.message);
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
export const deleteCustomer = async (id) => {
  try {
    const response = await API.delete(
      `/customer/auth/deleteCustomer/${id}`
      // {
      //   params: {
      //     user: userId,
      //   },
      // }
    );
    // console.log("response", response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.response.data.message);
      toast.error(response.response.data.message || response.message);
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
