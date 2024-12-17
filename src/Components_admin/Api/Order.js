import API from "./Api";
import { toast } from "react-toastify";
export const getAllOrder = async (exists, page, pageLimit) => {
  try {
    const response = await API.get(`/orders/getAllOrders?existss=${exists}`);
    // console.log(response);

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

export const getOrderLocation = async () => {
  try {
    const response = await API.get(`/orders/location`);
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

export const createOrder = async (data) => {
  try {
    const response = await API.post(`/orders/create`, data);
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
    console.error("Error fetching cities:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
