import API from "./Api";
import { toast } from "react-toastify";
export const getMerchantParcelType = async () => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");

    const response = await API.get(
      `/mobile/parcelType/${merchnatId}`
    );
    console.log("respone", response);

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


export const editMerchantParcelType = async (parcelTypeId ,data) => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");

    const response = await API.patch(
      `/mobile/parcelType/${parcelTypeId}`,
      data
    );
    console.log("response", response);

    if (response.status === 200) {
        toast.success('Parcel type updated successfully');
      return { status: true, data: response.data.data };
    } else {
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

export const deleteMerchantParcelType = async (parcelTypeId) => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");

    const response = await API.delete(
      `/mobile/parcelType/${parcelTypeId}`,
    );
    console.log("response", response);

    if (response.status === 200) {
        toast.success('Parcel type deleted successfully');
      return { status: true, data: response.data.data };
    } else {
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

export const addMerchantParcelType = async (data) => {
  try {
    const merchnatId = localStorage.getItem("merchnatId");
    const response = await API.post('/mobile/parcelType/create', {...data, merchant: merchnatId})
    console.log("response", response);
    if(response.status === 200){
      toast.success('Parcel type added successfully');
    return { status: true, data: response.data.data };
  }else{
    toast.error(response.response.data.message || response.message);
    return { status: false, message: response.response.data.message || response.message };
  }
} catch (error) {
  console.error("Error Add delivery boy:", error);
  return { status: false, message: error.message };
}
}


