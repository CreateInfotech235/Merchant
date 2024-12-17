import { toast } from "react-toastify";
import API from "./Api";

export const getAllDeliveryMan = async (page, pageLimit, search) => {
  try {
    const response = await API.get(
      `deliveryMan?pageCount=${page}&pageLimit=${pageLimit}&isVerified=true&createdByAdmin=true`
    );
    // console.log("response", response.data.data.data);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching delivery man:", error);
    return { status: false, message: error.message };
  }
};
export const getAllDeliveryMans = async (page, pageLimit, search) => {
  try {
    const response = await API.get(`deliveryMan/getAllDeliveryMans`);
    // console.log("response", response);
    if (response.status) {
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching delivery man:", error);
    return { status: false, message: error.message };
  }
};
export const getAllDeliveryManOfMerchant = async (page, pageLimit, search) => {
  try {
    const response = await API.get(
      `deliveryMan?pageCount=${page}&pageLimit=${pageLimit}&isVerified=true&createdByMerchant=true`
    );
    // console.log("response", response);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching delivery man:", error);
    return { status: false, message: error.message };
  }
};

export const getPendingDeliveryMan = async (page, pageLimit, search) => {
  try {
    const response = await API.get(
      `deliveryMan?pageCount=${page}&pageLimit=${pageLimit}&isVerified=false`
    );
    // console.log("response", response);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      // console.log("API error", response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching pending delivery man:", error);
    return { status: false, message: error.message };
  }
};

export const getDeliveryManDocument = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/deliveryman/documents?pageCount=${page}&pageLimit=${pageLimit}`
    );
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

export const getDeliveryManLocation = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/deliveryman/locations?pageCount=${page}&pageLimit=${pageLimit}`
    );
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

export const updateDocumentStatus = async (data) => {
  try {
    const response = await API.patch(
      `/deliveryman/updateVerificationStatus`,
      data
    );
    // console.log("response", response);

    if (response.status === 200) {
      toast.success(response.response.data.message);
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
    return { status: false, message: error.message };
  }
};

export const addDeliveryBoy = async (data) => {
  try {
    const response = await API.post(`/deliveryMan/addDeliveryMan`, data);
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
    console.error("Error Add delivery boy:", error);
    return { status: false, message: error.message };
  }
};

export const deleteDeliveryBoy = async (id) => {
  try {
    const response = await API.delete(`/deliveryMan/deleteDeliveryMan/${id}`);
    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
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
