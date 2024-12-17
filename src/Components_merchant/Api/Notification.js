import API from "./Api";
import { toast } from "react-toastify";

export const getAllNotifications = async () => {
  try {
    const userId = localStorage.getItem("merchnatId");
    // console.log("userId", userId);
    const response = await API.get(
      `/mobile/auth/getAllNotifications/${userId}`
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
    console.error("Error fetching notifications:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const userId = localStorage.getItem("merchnatId");
    const response = await API.patch(
      `/mobile/auth/markNotificationAsRead/${userId}/${notificationId}`
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
    console.error("Error marking notification as read:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
export const markAllNotificationsAsRead = async () => {
  try {
    const userId = localStorage.getItem("merchnatId");
    const response = await API.patch(
      `/mobile/auth/markAllNotificationsAsRead/${userId}`
    );

    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const userId = localStorage.getItem("merchnatId");
    const response = await API.delete(
      `/mobile/auth/deleteNotification/${userId}/${notificationId}`
    );

    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};

export const getUnreadNotificationCount = async () => {
  try {
    const userId = localStorage.getItem("merchnatId");
    const response = await API.get(
      `/mobile/auth/getUnreadNotificationCount/${userId}`
    );

    if (response.status === 200) {
      return { status: true, data: response.data.data.count };
    } else {
      return {
        status: false,
        message: response.response.data.message || response.message,
      };
    }
  } catch (error) {
    console.error("Error getting unread notification count:", error);
    toast.error(error.message);
    return { status: false, message: error.message };
  }
};
