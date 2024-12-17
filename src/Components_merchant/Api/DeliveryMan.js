import { toast } from "react-toastify";
import API from "./Api";

export const getDeliveryMan = async (page, pageLimit, search) => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");

    const response = await API.get(
      `deliveryBoy/auth/getDeliveryBoysForMerchant/${merchnatId}`
    );
    // console.log("respone", response);

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
export const getDeliveryManLocationByOrder = async (
  id,
  page = 1,
  pageLimit = 10000000000
) => {
  try {
    const response = await API.get(
      `/mobile/auth/getDeliveryManLocations/${id}?pageCount=${page}&pageLimit=${pageLimit}`
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
    const response = await API.post(`/deliveryBoy/auth/signUp`, data);
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

export const updateDeliveryBoy = async (id, data) => {
  try {
    const response = await API.patch(
      `/mobile/auth/updateDeliveryManProfile/${id}`,
      data
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
    console.error("Error Add delivery boy:", error);
    return { status: false, message: error.message };
  }
};
export const moveToTrashDeliveryMan = async (id) => {
  try {
    const response = await API.patch(
      `/mobile/auth/moveToTrashDeliveryMan/${id}`
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
    console.error("Error Add delivery boy:", error);
    return { status: false, message: error.message };
  }
};
export const deleteDeliveryMan = async (id) => {
  try {
    const response = await API.delete(`/mobile/auth/deleteDeliveryMan/${id}`);
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

export const getAllDeliveryMans = async () => {
  try {
    const response = await API.get(`/mobile/auth/getAllDeliveryMans`);
    // console.log("response", response);
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
