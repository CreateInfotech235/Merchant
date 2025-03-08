import { useNavigate } from "react-router-dom";
import API from "./Api";
import { toast } from "react-toastify";

export const freeSubscription = async (data) => {
  try {
    console.log("data",data);
    
    // const response = await API.post(`/mobile/auth/activatePlan`, data);
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

export const SubscriptionInfo = async (data) => {
  try {
    const response = await API.get(
      `/mobile/subscription/getApproveSubscription/${data}`
    );
    console.log(response,"response1234");
    
    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data, show: true };
    } else {
      // console.log("API error", response.response.data.message);


      toast.error(response.response.data.message || response.message);
      return {
        status: false,
        message: response.response.data.message || response.message,
        show: false,
      };
    }


  } catch (error) {
    console.error("Error fetching cities:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const SubscriptionData = async (data) => {
  try {
    const response = await API.get(
      `/mobile/auth/getApproveSubscription/${data}`

    );
    console.log(response,"response1234");
    

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data, show: true };
    } else {
      // console.log("API error", response.response.data.message);


      toast.error(response.response.data.message || response.message);
      return {
        status: false,
        message: response.response.data.message || response.message,
        show: false,
      };
    }


  } catch (error) {
    console.error("Error fetching cities:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const getAllSubscription = async (page, pageLimit) => {
  try {
    const response = await API.get(`/mobile/auth/subscriptions`);
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

export const stripPayment = async (amount, planId , duration , merchantId ,expiryDate) => {
  try {
    const data = {
      amount : amount,
      planId : planId , 
      duration : duration,
      expiryDate :expiryDate,
      merchantId : merchantId
    }
    console.log(data);
    
    const response = await API.post(`/mobile/subscription/create-payment-intent`, data);
    console.log("data",data,"response", response);

    if (response.status === 200) {
      return { status: true, data: response.data };
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


export const switchSubscriptionPlan = async (planId, merchantId) => {
  try {
    const response = await API.post('/mobile/subscription/switch-subscription-plan', {
      planId,
      merchantId
    });

    if (response.status === 200) {
      return { status: true, data: response.data };
    } else {
      return { status: false, message: response.message };
    } 
  } catch (error) {
    console.error("Error fetching cities:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
