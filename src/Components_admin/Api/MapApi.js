import API from "./Api";
import { toast } from "react-toastify";

export const postMapApi = async (mapKey) => {
  try {
    console.log(mapKey);

    const response = await API.post(`/auth/mapapi`, {mapKey :mapKey });
    console.log(response);
    if (response.status === 200) {
        toast.success(response.data.message);
        return { status: true, data: response.data.data };
      } else {
        // console.log('API error', response.message)
        return { status: false, message: response.message };
      }
  } catch (error) {
    console.error("Error fetching forgot password:", error);
    return { status: false, message: error.message };
  }
};
export const updateMapApi = async (id ,mapKey ,status) => {
  try {
    console.log(id ,mapKey ,status);

    const response = await API.patch(`/auth/mapapi/${id}`, {mapKey :mapKey , status : status });
    console.log(response);
    if (response.status === 200) {
        toast.success(response.data.message);
        return { status: true, data: response.data.data };
      } else {
        // console.log('API error', response.message)
        return { status: false, message: response.message };
      }
  } catch (error) {
    console.error("Error fetching forgot password:", error);
    return { status: false, message: error.message };
  }
};
export const getMapApi = async () => {
  try {
    const response = await API.get(`/auth/mapapi`);
    console.log(response);
    if (response.status === 200) {
        return { status: true, data: response.data };
      } else {
        // console.log('API error', response.message)
        return { status: false, message: response.message };
      }
  } catch (error) {
    console.error("Error fetching forgot password:", error);
    return { status: false, message: error.message };
  }
};
