import API from "./Api";
import { toast } from "react-toastify";

export const createOrder = async (data) => {
  try {
    const response = await API.post(`/mobile/order/create`, data);
    console.log("response", response);

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






export const orderUpdateMulti = async (id, data,Order) => {
  console.log("data", data);
  try {

    const newData = {
      ...data,
    }

  
    const response = await API.patch(
      `/mobile/order/orderUpdateMulti/${id}`,
      newData
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
export const getMultiOrders = async ({userId, getallcancelledorders, page = 1, startDate, endDate, filterStatus, limit, searchQuery}) => {
  try {
    const queryParams = {
      ...userId && { user: userId },
      ...getallcancelledorders && { getallcancelledorders: getallcancelledorders },
      ...page && { page: page },
      ...limit && { limit: Number(limit) },
      ...searchQuery && { searchQuery: searchQuery.trim()},
      ...startDate && { startDate: startDate },
      ...endDate && { endDate: endDate },
      ...filterStatus && { filterStatus: filterStatus },
      // ...limit && { limit: limit }
    }
    console.log("queryParams", queryParams);
    const response = await API.get(
      `/mobile/order/getAllOrdersFromMerchantMulti/${userId}`,
      {
        params: queryParams
      }
    );
    console.log("responseSADsD", response);

    if (response.status === 200) {
      return { 
        status: true, 
        data: response?.data?.data?.data, 
        total: response?.data?.data?.total 
      };
    } else {
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


export const calculateDistancee = async (pickuplocation, deliverylocation) => {

  try {

    const apiKey = "AIzaSyBnWMbLVCkqKy2cHFAXnZqF2Ay-6T44Jzw";
    const origin = `${pickuplocation.latitude},${pickuplocation.longitude}`;
    const destination = `${deliverylocation.latitude},${deliverylocation.longitude}`;
    const response = await API.post(`/mobile/auth/distance?origin=${origin}&destination=${destination}&apiKey=${apiKey}`);
    console.log(response);




    if (response.status === 200) {
      if (response.data.status !== "ZERO_RESULTS") {
        console.log("response.data", response.data);
        return response.data;
      } else {
        console.log("response.data", response.data);
        return { status: false, message: "Delivery address not found.", distance: { value: 0, text: "0 km" }, duration: { value: 0, text: "0 min" } };
      }
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};


export const createOrderMulti = async (data) => {
  try {
    console.log("data of create order multi", data);
    const response = await API.post(`/mobile/order/createMulti`, data);
    console.log("response", response);
    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};



export const moveToTrashOrderMulti = async (OrderID,settrashed,trashed=undefined)  => {
  try {
    const response = await API.patch(
      `/mobile/order/moveToTrashFormMerchantMulti/${OrderID}`,
      {
        trashed: trashed===undefined ? settrashed : trashed
      }
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

export const moveToTrashSubOrderMulti = async (OrderID, subOrderId) => {
  try {
    const response = await API.patch(
      `/mobile/order/moveToTrashSubOrderMulti/${OrderID}?subOrderId=${subOrderId}`
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


export const moveToTrashMultiOrderarray = async (array) => {
  try {
    console.log("array", array);
    const response = await API.patch(
      `/mobile/order/moveToTrashMultiOrder`,
      {
        orderIds: array
      }
    );
    console.log("response", response);
    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    }
  }
  catch (error) {
    console.error("Error fetching orders:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
}


export const deleteOrderFormMerchantMulti = async (OrderID, subOrderId) => {
  try {
    console.log("OrderID", OrderID);
    console.log("subOrderId", subOrderId);
    const response = await API.delete(
      `/mobile/order/deleteOrderFormMerchantMulti/${OrderID}?subOrderId=${subOrderId}`
      // {
      //   params: {
      //     user: userId,
      //   },
      // }
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
    console.error("Error fetching orders:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};


export const reassignOrder = async (merchantId, orderId) => {
  console.log("merchantId", merchantId);
  console.log("orderId", orderId);
  try {
    const response = await API.patch(`/mobile/order/reassignOrder?merchantId=${merchantId}&orderId=${orderId}`);
    console.log("response", response);
    if (response.status === 200) {
      toast.success("Order reassigned successfully");
      return { status: true, data: response.data };
    } else {
      toast.error(response.data?.message || "Failed to reassign order");
      return { 
        status: false, 
        message: response.data?.message || "Failed to reassign order" 
      };
    }
  } catch (error) {
    console.error("Error reassigning order:", error);
    toast.error(error.message || "Error reassigning order");
    return { 
      status: false, 
      message: error.message || "Error reassigning order" 
    };
  }
};



