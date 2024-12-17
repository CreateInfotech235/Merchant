import API from "./Api";
import { toast } from "react-toastify";

export const getAdminProfile = async () => {
  try {
    const response = await API.get(`/auth/getAdminProfile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessTokenForAdmin")}`,
      },
    });
    if (response.status === 200) {
      // console.log("Get Admin Profile response", response);

      return { status: true, data: response.data.data };
    } else {
      return { status: false, message: response.message };
    }
  } catch (error) {
    // console.log(error);
    return { status: false, message: error.message };
  }
};

export const updateAdminProfile = async (data) => {
  //   console.log("Update Admin Profile data", data);
  try {
    const response = await API.post(`/auth/profileUpdate`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessTokenForAdmin")}`,
      },
    });
    // console.log("Update Admin Profile response", response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return { status: true, data: response.data.data };
    } else {
      toast.error(response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    // console.log(error);
    return { status: false, message: error.message };
  }
};
