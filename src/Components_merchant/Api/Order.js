import API from "./Api";
import { toast } from "react-toastify";

export const createOrder = async (data) => {
  try {
    const response = await API.post(`/mobile/order/create`, data);
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

export const updateOrder = async (orderId, data) => {
  try {
    const response = await API.patch(
      `/mobile/order/updateOrder/${orderId}`,
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
    console.error("Error fetching cities:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const getOrders = async (userId, pageCount, pageLimit) => {
  try {
    const response = await API.get(
      `/mobile/order/getAllOrdersFromMerchant/${userId}`,
      {
        params: {
          user: userId,
          pageCount: pageCount,
          pageLimit: pageLimit,
        },
      }
    );
    // console.log("response", response);

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
export const getRecentOrders = async (userId, pageCount, pageLimit) => {
  try {
    const response = await API.get(
      `/mobile/order/getAllRecentOrdersFromMerchant/${userId}`,
      {
        params: {
          user: userId,
          pageCount: pageCount,
          pageLimit: pageLimit,
        },
      }
    );
    // console.log("response", response);

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

export const moveToTrashOrder = async (OrderID) => {
  try {
    const response = await API.patch(
      `/mobile/order/moveToTrashFormMerchant/${OrderID}`
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
export const deleteIOrder = async (OrderID) => {
  try {
    const response = await API.delete(
      `/mobile/order/deleteOrderFormMerchant/${OrderID}`
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
