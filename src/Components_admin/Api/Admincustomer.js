import API from "./Api";
import { toast } from "react-toastify";
export const getAllCustomers = async (createdBy = null) => {
  try {
    console.log("dfdf");
    console.log(createdBy);
    
    
    const response = await API.get(`/customer/getAllCustomer?existss=${createdBy}`);
    // console.log("🚀 ~ getAllCustomers ~ response:", response);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return { status: false, message: response.data.message };
    }
  } catch (error) {
    // console.log("🚀 ~ getAllCustomers ~ error:", error);
    return error;
  }
};


export const updateCustomer = async (id, data) => {
  try {
    // Create a new object with the original data and merchantId
    const tampdata = { ...data };
    // Log the tampdata to confirm it's correctly constructed

    const response = await API.patch(
      `/customer/customerUpdate/${id}`,
      tampdata
    );
    console.log("response", response);

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

export const deleteCustomer = async (id) => {
  try {
    const response = await API.delete(`/customer/deleteCustomer/${id}`);
    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      toast.error(response.data.message);
      return { status: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error Delete Customer:", error);
    return { status: false, message: error.message };
  }
};