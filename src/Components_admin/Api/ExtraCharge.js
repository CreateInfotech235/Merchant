import API from "./Api";
import { toast } from "react-toastify";

export const getAllExtraCharges = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/extraCharge?pageCount=${page}&pageLimit=${pageLimit}`
    );
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

export const createExtraCharge = async (data) => {
  try {
    const response = await API.post(`/extraCharge/create`, data);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.message };
    } else {
      // console.log('API error', response.response.data.message)
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

export const updateExtraCharge = async (id, data) => {
  try {
    const response = await API.patch(`/extraCharge/${id}`, data);
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
    console.error("Error fetching cities:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const deleteExtraCharge = async (id) => {
  try {
    const response = await API.delete(`/extraCharge/${id}`);
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
    // console.error('Error fetching cities:', error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
