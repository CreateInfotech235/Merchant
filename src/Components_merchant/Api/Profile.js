import API from "./Api";
import { toast } from "react-toastify";
export const getMerchantProfile = async () => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");

    const response = await API.get(
      `/mobile/auth/getProfileOfMerchant/${merchnatId}`
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

export const updateMerchantProfile = async (data) => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");

    const response = await API.post(
      `/mobile/auth/updateProfileOfMerchant/${merchnatId}`,
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
