import API from "./Api";
import { toast } from "react-toastify";

export const getAllUsers = async (existss,page, pageLimit) => {
  try {
    const response = await API.get(`/users/getAllUsersFromAdmin?existss=${existss}`);
    console.log('res',response.status)
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      console.log('API error', response.message)
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { status: false, message: error.message };
  }
};

export const updateProfileOfMerchant = async (id, data) => {
  try {
    const response = await API.post(`/users/updateProfileOfMerchant/${id}`, data);
    console.log('res',response)
    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      toast.error(response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { status: false, message: error.message };
  }
};

export const getScbscriptionUsers = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/users?isSubscribed=true&pageCount=${page}&pageLimit=${pageLimit}`
    );
    // console.log('res',response)
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

export const getUnScbscriptionUsers = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/users?isSubscribed=false&pageCount=${page}&pageLimit=${pageLimit}`
    );
    // console.log('ress',response)
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

export const getPendingWithdraw = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/users/withdraw-history?transactionStatus=PENDING&pageCount=${page}&pageLimit=${pageLimit}`
    );
    // console.log('res',response)
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

export const getApprovedWithdraw = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/users/withdraw-history?transactionStatus=APPROVED&pageCount=${page}&pageLimit=${pageLimit}`
    );
    // console.log('res',response)
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

export const getRejectWithdraw = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/users/withdraw-history?transactionStatus=REJECT&pageCount=${page}&pageLimit=${pageLimit}`
    );
    // console.log('res',response)
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

export const addUser = async (data) => {
  try {
    const response = await API.post(`/users/addUser`, data);
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

export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/users/deleteMerchant/${id}`);
    console.log('response',response)
    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      toast.error(response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return { status: false, message: error.message };
  }
};



export const updateStatus = async (id,data) => {
  try {
    const response = await API.post(`/users/updateStatus/${id}`,data);
    console.log('response',response)
    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      toast.error(response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error updating status:", error);
    return { status: false, message: error.message };
  }
}



export const getMultiOrders = async (userId, getallcancelledorders) => {
  try {
    const response = await API.get(
      `/orders/getAllOrdersFromMerchantMulti/${userId}`,
      {
        params: {
          user: userId,
          getallcancelledorders: getallcancelledorders,
        },
      }
    );
    console.log('response',response)

    if (response.status === 200) {
      //   toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      //   console.log("API error", response.response.data.message);
      //   toast.error(response.response.data.message || response.message);
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