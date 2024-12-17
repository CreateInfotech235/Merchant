import API from "./Api";
import { toast } from "react-toastify";

export const getAllSubscription = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/subscriptions?pageCount=${page}&pageLimit=${pageLimit}`
    );

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

export const getAllPendingSubscription = async (page, pageLimit) => {
  try {
    const response = await API.get(
      `/subscriptions/pending?pageCount=${page}&pageLimit=${pageLimit}`
    );

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

export const manageSubscription = async (data) => {
  try {
    const response = await API.post("/subscriptions/manage", data);
    // console.log(response);

    if (response.status === 200) {
      toast.success("Subscription updated successfully");
      return { status: true, message: "Subscription updated successfully" };
    } else {
      // console.log("API error", response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { status: false, message: error.message };
  }
};
export const exportFreeSubscription = async () => {
  try {
    const response = await API.get("/subscriptions/getexportFreeSubscription");
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error exporting free subscription:", error);
  }
};
