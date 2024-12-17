import API from "./Api";
import { toast } from "react-toastify";

export const createInvoiceSettings = async (data) => {
  try {
    const merchantId = localStorage.getItem("merchnatId");
    const requestData = { ...data, merchantId: merchantId };

    const response = await API.post("/mobile/invoice/create", requestData);
    // console.log("response1", response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      toast.error(response.response?.data?.message || response.message);
      return {
        status: false,
        message: response.response?.data?.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error creating invoice settings:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const updateInvoiceSettings = async (data) => {
  try {
    const merchantId = localStorage.getItem("merchnatId");
    const requestData = { ...data, merchantId: merchantId };

    const response = await API.put(
      `/mobile/invoice/update/${merchantId}`,
      requestData
    );
    // console.log("response1", response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      toast.error(response.response?.data?.message || response.message);
      return {
        status: false,
        message: response.response?.data?.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error updating invoice settings:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const getInvoiceSettings = async () => {
  try {
    const merchantId = localStorage.getItem("merchnatId");
    const response = await API.get(`/mobile/invoice/${merchantId}`);

    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      toast.error(response.response?.data?.message || response.message);
      return {
        status: false,
        message: response.response?.data?.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error getting invoice settings:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
