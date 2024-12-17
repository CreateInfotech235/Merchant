import API from "./Api";
import { toast } from "react-toastify";

export const getAllNotifications = async () => {
  try {
    const response = await API.get(`/auth/getAllNotifications`);
    // console.log("response", response);

    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    // console.error("Error fetching notifications:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const userId = localStorage.getItem("merchnatId");
    const response = await API.patch(
      `/auth/markNotificationAsRead/${notificationId}`
    );
    // console.log("response", response);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    // console.error("Error marking notification as read:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
export const markAllNotificationsAsRead = async () => {
  try {
    const userId = localStorage.getItem("merchnatId");
    const response = await API.patch(`/auth/markAllNotificationsAsRead`);

    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    // console.error("Error marking all notifications as read:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const userId = localStorage.getItem("merchnatId");
    const response = await API.delete(
      `/auth/deleteNotification/${notificationId}`
    );
    // console.log("response", response);

    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    // console.error("Error deleting notification:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const getUnreadNotificationCount = async () => {
  try {
    const userId = localStorage.getItem("merchnatId");
    const response = await API.get(`/auth/getUnreadNotificationCount`);

    if (response.status === 200) {
      return { status: true, data: response.data.data.count };
    } else {
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    // console.error("Error getting unread notification count:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
